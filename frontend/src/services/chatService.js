import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

class ChatService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async sendMessage(message, sessionId = null, previousSymptoms = '') {
    try {
      const response = await this.client.post('/chat', {
        message,
        session_id: sessionId,
        previous_symptoms: previousSymptoms,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async getSessionMessages(sessionId) {
    try {
      const response = await this.client.get(`/session/${sessionId}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error getting session messages:', error);
      throw error;
    }
  }

  async createNewSession() {
    try {
      const response = await this.client.post('/session/new');
      return response.data;
    } catch (error) {
      console.error('Error creating new session:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
}

export default new ChatService();
