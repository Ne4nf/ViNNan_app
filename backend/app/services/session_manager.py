from typing import Dict, List
from datetime import datetime
import uuid
from ..models.chat import ChatMessage, SessionState


class SessionManager:
    def __init__(self):
        self.sessions: Dict[str, SessionState] = {}
    
    def create_session(self) -> str:
        session_id = str(uuid.uuid4())
        self.sessions[session_id] = SessionState(
            session_id=session_id,
            messages=[],
            symptoms="",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        return session_id
    
    def get_session(self, session_id: str) -> SessionState:
        if session_id not in self.sessions:
            # Create new session if not exists
            self.sessions[session_id] = SessionState(
                session_id=session_id,
                messages=[],
                symptoms="",
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
        return self.sessions[session_id]
    
    def update_session(self, session_id: str, message: ChatMessage, symptoms: str = ""):
        session = self.get_session(session_id)
        session.messages.append(message)
        if symptoms:
            session.symptoms = symptoms
        session.updated_at = datetime.now()
        self.sessions[session_id] = session
    
    def get_session_messages(self, session_id: str) -> List[ChatMessage]:
        session = self.get_session(session_id)
        return session.messages
    
    def get_session_symptoms(self, session_id: str) -> str:
        session = self.get_session(session_id)
        return session.symptoms


# Global session manager instance
session_manager = SessionManager()
