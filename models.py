from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base


from sqlalchemy import Column, Integer, String, ForeignKey, Text, Float, DateTime, JSON
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    phone = Column(String, unique=True, index=True, nullable=True)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # NGO / Community / Panchayat / Admin
    projects = relationship("Project", back_populates="owner")

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(Text, nullable=True)
    location = Column(String, nullable=True)
    hectares = Column(Float, nullable=True)
    species = Column(String, nullable=True)
    coordinates = Column(Text, nullable=True)  # store as stringified JSON or WKT
    status = Column(String, default="Draft")
    status_history = Column(JSON, default=list)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="projects")
    # File and report fields
    files = Column(JSON, default=list)  # list of file metadata dicts
    ai_result = Column(JSON, nullable=True)  # carbon, uncertainty, area, etc.
    report_pdf = Column(String, nullable=True)
    ipfs_cid = Column(String, nullable=True)
    onchain_hash = Column(String, nullable=True)
    verifier = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
