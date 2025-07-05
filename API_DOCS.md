# ViMedical API Documentation

## Overview
ViMedical API cung cấp các endpoint để tương tác với hệ thống trợ lý y tế thông minh.

## Base URL
```
http://localhost:8000
```

## Authentication
API hiện tại không yêu cầu authentication, nhưng cần cấu hình API keys trong file `.env`.

## API Endpoints

### 1. Health Check
Kiểm tra trạng thái hệ thống.

**GET** `/health`

**Response:**
```json
{
  "status": "healthy",
  "llm_chain_status": "initialized",
  "timestamp": "2025-01-05T10:30:00"
}
```

### 2. Chat
Gửi tin nhắn và nhận phản hồi từ AI.

**POST** `/api/v1/chat`

**Request Body:**
```json
{
  "message": "Tôi bị đau đầu và sốt",
  "session_id": "optional-session-id",
  "previous_symptoms": ""
}
```

**Response:**
```json
{
  "response": "Dựa trên các triệu chứng bạn mô tả...",
  "possible_diseases": ["Cảm cúm", "Viêm họng"],
  "symptoms": "đau đầu, sốt",
  "timestamp": "10:30:15",
  "ask_confirmation": false
}
```

### 3. Create New Session
Tạo phiên chat mới.

**POST** `/api/v1/session/new`

**Response:**
```json
{
  "session_id": "uuid-session-id"
}
```

### 4. Get Session Messages
Lấy tin nhắn của một phiên chat.

**GET** `/api/v1/session/{session_id}/messages`

**Response:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Tôi bị đau đầu",
      "timestamp": "10:30:00"
    },
    {
      "role": "assistant",
      "content": "Có thể bạn đang bị...",
      "timestamp": "10:30:15"
    }
  ]
}
```

## Error Handling

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

### Error Response Format
```json
{
  "detail": "Error message description"
}
```

## Rate Limiting
API hiện tại chưa có rate limiting, nhưng khuyến nghị không gửi quá 10 requests/second.

## Examples

### Gửi tin nhắn cơ bản
```bash
curl -X POST "http://localhost:8000/api/v1/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tôi bị ho và khó thở"
  }'
```

### Tạo phiên chat mới
```bash
curl -X POST "http://localhost:8000/api/v1/session/new"
```

### Kiểm tra sức khỏe hệ thống
```bash
curl -X GET "http://localhost:8000/health"
```

## Data Models

### ChatRequest
```json
{
  "message": "string (required)",
  "session_id": "string (optional)",
  "previous_symptoms": "string (optional)"
}
```

### ChatResponse
```json
{
  "response": "string",
  "possible_diseases": ["string"],
  "symptoms": "string",
  "timestamp": "string",
  "ask_confirmation": "boolean"
}
```

### ChatMessage
```json
{
  "role": "string (user|assistant)",
  "content": "string",
  "timestamp": "string"
}
```

## Integration Guide

### JavaScript/React
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1'
});

// Gửi tin nhắn
const response = await api.post('/chat', {
  message: 'Tôi bị đau đầu'
});
```

### Python
```python
import requests

url = 'http://localhost:8000/api/v1/chat'
data = {
    'message': 'Tôi bị đau đầu'
}

response = requests.post(url, json=data)
result = response.json()
```

## Support
Nếu gặp vấn đề, vui lòng kiểm tra:
1. Backend đang chạy tại port 8000
2. File `.env` đã được cấu hình đúng
3. API keys hợp lệ
