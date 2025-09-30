from pydantic import BaseModel
from typing import Optional

# -------- User --------
from enum import Enum

class UserRole(str, Enum):
    NGO = "NGO"
    COMMUNITY = "Community"
    PANCHAYAT = "Panchayat"

class UserCreate(BaseModel):
    email: str | None = None
    username: str  # This can be email or phone
    phone: str | None = None
    password: str
    role: UserRole

class UserLogin(BaseModel):
    username: str  # This will be email or phone
    password: str
    email: str | None = None  # Optional email field for compatibility

class UserOut(BaseModel):
    id: int
    username: str
    role: str
    class Config:
        orm_mode = True

# -------- Token --------
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    username: str

# -------- Project --------
class ProjectCreate(BaseModel):
    name: str
    location: str | None = None
    hectares: float
    species: str
    coordinates: str | None = None
    status: str = "Submitted"

class ProjectOut(BaseModel):
    id: int
    name: str
    location: str | None = None
    hectares: float
    species: str
    coordinates: str | None = None
    status: str
    owner_id: int
    class Config:
        orm_mode = True

class ProjectVerify(BaseModel):
    status: str  # Verified / Rejected
