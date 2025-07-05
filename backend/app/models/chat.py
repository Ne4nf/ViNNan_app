from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: str


class ChatRequest(BaseModel):
    message: str
    previous_symptoms: Optional[str] = ""
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    possible_diseases: List[str] = []
    symptoms: str = ""
    timestamp: str
    ask_confirmation: bool = False


class SessionState(BaseModel):
    session_id: str
    messages: List[ChatMessage] = []
    symptoms: str = ""
    created_at: datetime
    updated_at: datetime
