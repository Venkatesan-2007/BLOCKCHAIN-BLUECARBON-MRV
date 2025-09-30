from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import crud, models, schemas
from database import get_db

SECRET_KEY = "supersecretkey"  # replace with env var
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def login_user(db: Session, user: schemas.UserLogin):
    try:
        print(f"[DEBUG] Login attempt for username: {user.username}")
        print(f"[DEBUG] Provided password: {user.password}")
        if not user.username or not user.password:
            print("[ERROR] Username or password missing in request body")
            raise HTTPException(status_code=400, detail="Username and password are required")

        db_user = crud.get_user_by_username(db, user.username)
        print(f"[DEBUG] Found user in database: {db_user is not None}")
        if db_user:
            print(f"[DEBUG] Database user password: {db_user.password}")
            print(f"[DEBUG] Database user role: {db_user.role}")
        else:
            print("[ERROR] No user found with that username")

        if not db_user:
            print("[ERROR] Invalid username")
            raise HTTPException(status_code=401, detail="Invalid username or password")

        if db_user.password != user.password:
            print("[ERROR] Password mismatch")
            raise HTTPException(status_code=401, detail="Invalid username or password")

        access_token = create_access_token(
            data={
                "sub": db_user.username,
                "role": db_user.role,
                "user_id": db_user.id
            },
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        print(f"[DEBUG] Generated access token for user: {db_user.username}")
        response_data = {
            "access_token": access_token,
            "token_type": "bearer",
            "role": db_user.role,
            "username": db_user.username
        }
        print(f"[DEBUG] Login response data: {response_data}")
        return response_data
        
    except HTTPException as e:
        print(f"[ERROR] HTTP Exception during login: {str(e)}")
        raise
    except Exception as e:
        print(f"[ERROR] Unexpected error during login: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error during login: {str(e)}")
        print(f"[ERROR] Unexpected error during login: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed due to server error")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        print(f"[DEBUG] Validating token: {token[:10]}...")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            print("[ERROR] Token missing username in payload")
            raise HTTPException(status_code=401, detail="Invalid token: missing username")
            
        print(f"[DEBUG] Looking up user: {username}")
        user = crud.get_user_by_username(db, username)
        
        if user is None:
            print(f"[ERROR] User not found: {username}")
            raise HTTPException(status_code=401, detail="User not found")
            
        print(f"[DEBUG] User found: {user.username} (role: {user.role})")
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "role": user.role
        }
        
    except JWTError as e:
        print(f"[ERROR] JWT validation error: {str(e)}")
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
    except Exception as e:
        print(f"[ERROR] Unexpected error in get_current_user: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during authentication")

def login_admin(db: Session, user: schemas.UserLogin):
    db_user = crud.get_user_by_username(db, user.username)
    if not db_user or db_user.password != user.password or db_user.role != "admin":
        raise HTTPException(status_code=400, detail="Admin login failed")
    access_token = create_access_token(data={"sub": db_user.username, "role": db_user.role})
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_admin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return current_user
