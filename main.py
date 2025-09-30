from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, Base, engine
import crud, schemas, auth, mistral_ai, blockchain, models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="BlueCarbon MRV Backend")

# ✅ Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",  # Vite development server
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost",
    "capacitor://localhost",
    "http://localhost:8100",
    "http://192.168.106.148:8000",  # Local network access
    "capacitor://192.168.106.148:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# ---------------- Root & Health ----------------
@app.get("/")
def root():
    return {"message": "🌱 BlueCarbon MRV API is running"}

@app.get("/status")
def health_check():
    return {"status": "ok"}

# ---------------- Authentication ----------------
@app.post("/signup", response_model=schemas.UserOut)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        print(f"[DEBUG] Received signup request: {user}")
        if not user.username:
            raise HTTPException(status_code=400, detail="Username is required")
        if not user.password:
            raise HTTPException(status_code=400, detail="Password is required")
        db_user = crud.create_user(db, user)
        return db_user
    except HTTPException as e:
        print(f"[ERROR] Signup failed with status {e.status_code}: {e.detail}")
        raise
    except Exception as e:
        print(f"[ERROR] Unexpected signup error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during signup")
            
@app.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    try:
        print(f"[DEBUG] Login attempt for username: {user.username}")
        result = auth.login_user(db, user)
        print(f"[DEBUG] Login successful for user: {user.username}")
        return result
    except HTTPException as e:
        print(f"[ERROR] Login failed with status {e.status_code}: {e.detail}")
        raise
    except Exception as e:
        print(f"[ERROR] Unexpected login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during login")
        result = crud.create_user(db, user)
        print(f"User created: {result}") # Debug log
        return result
    except Exception as e:
        print(f"Signup error: {str(e)}") # Debug log
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    # Accepts only username and password, matching frontend
    return auth.login_user(db, user)

@app.get("/profile")
def get_profile(current_user: dict = Depends(auth.get_current_user)):
    print(f"[DEBUG] Returning profile for user: {current_user['username']}")
    return current_user

@app.get("/users/me", response_model=schemas.UserOut)
def read_users_me(current_user: schemas.UserOut = Depends(auth.get_current_user)):
    return current_user

# ---------------- Projects ----------------
@app.get("/projects", response_model=list[schemas.ProjectOut])
async def list_user_projects(db: Session = Depends(get_db),
                     current_user: dict = Depends(auth.get_current_user)):
    try:
        user_id = current_user.get('id')
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in token")
            
        print(f"[DEBUG] Fetching projects for user ID: {user_id}")
        projects = crud.get_user_projects(db, user_id)
        if projects is None:
            return []
        return projects
    except Exception as e:
        print(f"[ERROR] Failed to get projects: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get projects: {str(e)}")

@app.post("/projects/create", response_model=schemas.ProjectOut)
def create_project(project: schemas.ProjectCreate,
                   db: Session = Depends(get_db),
                   current_user: schemas.UserOut = Depends(auth.get_current_user)):
    return crud.create_project(db, project, current_user.id)

@app.post("/projects/{project_id}/upload")
def upload_project_file(project_id: int,
                        file: UploadFile = File(...),
                        db: Session = Depends(get_db),
                        current_user: schemas.UserOut = Depends(auth.get_current_user)):
    return crud.save_project_file(db, project_id, file, current_user.id)

@app.get("/projects/{project_id}/report")
def generate_project_report(project_id: int,
                            db: Session = Depends(get_db),
                            current_user: schemas.UserOut = Depends(auth.get_current_user)):
    project = crud.get_project(db, project_id, current_user.id)
    ai_report = mistral_ai.analyze_data(project.data or "No data uploaded")
    return {"project": project.name, "report": ai_report}

@app.get("/projects/{project_id}/status")
def project_status(project_id: int,
                   db: Session = Depends(get_db),
                   current_user: schemas.UserOut = Depends(auth.get_current_user)):
    return crud.get_project_status(db, project_id, current_user.id)

# ---------------- Admin ----------------
@app.post("/admin/login", response_model=schemas.Token)
def admin_login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    return auth.login_admin(db, user)

@app.get("/admin/projects")
def list_all_projects(db: Session = Depends(get_db),
                      current_user: schemas.UserOut = Depends(auth.get_current_admin)):
    return crud.get_all_projects(db)

@app.get("/admin/project/{project_id}")
def project_detail(project_id: int,
                   db: Session = Depends(get_db),
                   current_user: schemas.UserOut = Depends(auth.get_current_admin)):
    return crud.get_project_detail(db, project_id)

@app.post("/admin/verify/{project_id}")
def verify_project(project_id: int,
                   status: schemas.ProjectVerify,
                   db: Session = Depends(get_db),
                   current_user: schemas.UserOut = Depends(auth.get_current_admin)):
    project = crud.verify_project(db, project_id, status.status)
    if status.status == "Verified":
        blockchain.write_to_blockchain(project_id, project.name, project.owner_id)
    return {"message": f"Project {status.status}"}

@app.get("/admin/registry")
def blockchain_registry():
    return blockchain.get_registry()
