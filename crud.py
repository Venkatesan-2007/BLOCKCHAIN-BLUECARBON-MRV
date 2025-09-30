from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException
import shutil

# -------- Users --------
def create_user(db: Session, user: schemas.UserCreate):
    # Check if user already exists (by username)
    existing_user = get_user_by_username(db, user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    db_user = models.User(
        username=user.username,
        email=user.email,
        phone=user.phone,
        password=user.password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

# -------- Projects --------
def get_user_projects(db: Session, user_id: int):
    try:
        print(f"[DEBUG] Querying projects for user_id: {user_id}")
        projects = db.query(models.Project).filter(models.Project.owner_id == user_id).all()
        print(f"[DEBUG] Found {len(projects)} projects")
        return projects
    except Exception as e:
        print(f"[ERROR] Database error in get_user_projects: {str(e)}")
        return []

def create_project(db: Session, project: schemas.ProjectCreate, user_id: int):
    db_project = models.Project(
        name=project.name,
        location=project.location,
        hectares=project.hectares,
        species=project.species,
        coordinates=project.coordinates,
        status=project.status,
        owner_id=user_id
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def save_project_file(db: Session, project_id: int, file, user_id: int):
    project = db.query(models.Project).filter(models.Project.id == project_id, models.Project.owner_id == user_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    contents = file.file.read().decode("utf-8")
    project.data = contents
    db.commit()
    return {"message": "File uploaded and data saved"}

def get_project(db: Session, project_id: int, user_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id, models.Project.owner_id == user_id).first()

def get_project_status(db: Session, project_id: int, user_id: int):
    project = get_project(db, project_id, user_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"project": project.name, "status": project.status}

def get_all_projects(db: Session):
    return db.query(models.Project).all()

def get_project_detail(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first()

def verify_project(db: Session, project_id: int, status: str):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    project.status = status
    db.commit()
    db.refresh(project)
    return project
