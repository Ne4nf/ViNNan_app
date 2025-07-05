from fastapi import APIRouter, HTTPException
from datetime import datetime
from ..models.chat import ChatRequest, ChatResponse, ChatMessage
from ..services.session_manager import session_manager
from ..services.llm_chain import get_llm_chain
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Initialize LLM chain
try:
    llm_chain = get_llm_chain()
    logger.info("✅ LLM Chain initialized successfully")
except Exception as e:
    logger.error(f"❌ Failed to initialize LLM Chain: {e}")
    llm_chain = None


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Process chat message and return response
    """
    try:
        if not llm_chain:
            raise HTTPException(status_code=500, detail="LLM Chain not initialized")
        
        # Get or create session
        session_id = request.session_id or session_manager.create_session()
        previous_symptoms = session_manager.get_session_symptoms(session_id)
        
        # Add user message to session
        timestamp = datetime.now().strftime("%H:%M:%S")
        user_message = ChatMessage(
            role="user",
            content=request.message,
            timestamp=timestamp
        )
        session_manager.update_session(session_id, user_message)
        
        # Process with LLM
        result = llm_chain(
            request.message,
            previous_symptoms=previous_symptoms
        )
        
        # Extract response data
        response_text = result.get("result", "Xin lỗi, tôi không thể trả lời câu hỏi này.")
        possible_diseases = result.get("possible_diseases", [])
        symptoms = result.get("symptoms", previous_symptoms)
        ask_confirmation = result.get("ask_confirmation", False)
        
        # Add assistant message to session
        assistant_message = ChatMessage(
            role="assistant",
            content=response_text,
            timestamp=timestamp
        )
        session_manager.update_session(session_id, assistant_message, symptoms)
        
        return ChatResponse(
            response=response_text,
            possible_diseases=possible_diseases,
            symptoms=symptoms,
            timestamp=timestamp,
            ask_confirmation=ask_confirmation
        )
        
    except Exception as e:
        logger.error(f"❌ Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/session/{session_id}/messages")
async def get_session_messages(session_id: str):
    """
    Get all messages for a session
    """
    try:
        messages = session_manager.get_session_messages(session_id)
        return {"messages": messages}
    except Exception as e:
        logger.error(f"❌ Error getting session messages: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("/session/new")
async def create_new_session():
    """
    Create a new chat session
    """
    try:
        session_id = session_manager.create_session()
        return {"session_id": session_id}
    except Exception as e:
        logger.error(f"❌ Error creating new session: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "llm_chain_status": "initialized" if llm_chain else "failed",
        "timestamp": datetime.now().isoformat()
    }
