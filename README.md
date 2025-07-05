# ViMedical - Trợ lý Y Tế Thông minh

## Mô tả
ViMedical là một hệ thống trợ lý y tế thông minh sử dụng AI để hỗ trợ chuẩn đoán bệnh và truy xuất thông tin y tế bằng tiếng Việt.

## Cấu trúc dự án
```
Vimedical/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── main.py       # FastAPI app
│   ├── requirements.txt
│   └── run.py
├── frontend/             # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   └── styles/       # CSS styles
│   └── package.json
└── src/                  # Original Streamlit code (legacy)
```

## Yêu cầu hệ thống
- Python 3.8+
- Node.js 16+
- npm hoặc yarn

## Cài đặt và chạy

### 1. Cài đặt Backend (FastAPI)

```bash
# Di chuyển vào thư mục backend
cd backend

# Tạo virtual environment
python -m venv venv

# Kích hoạt virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Cài đặt dependencies
pip install -r requirements.txt

# Chạy server
python run.py
```

Backend sẽ chạy tại: http://localhost:8000

### 2. Cài đặt Frontend (React)

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm start
```

Frontend sẽ chạy tại: http://localhost:3000

## Cấu hình Environment Variables

Tạo file `.env` trong thư mục backend với các biến sau:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
```

## API Endpoints

### Backend APIs:
- `GET /` - Health check
- `POST /api/v1/chat` - Gửi tin nhắn chat
- `GET /api/v1/health` - Kiểm tra trạng thái hệ thống
- `POST /api/v1/session/new` - Tạo phiên chat mới
- `GET /api/v1/session/{session_id}/messages` - Lấy tin nhắn của phiên

## Tính năng chính

1. **Giao diện hiện đại**: React với Material-UI
2. **Responsive design**: Hỗ trợ mobile và desktop
3. **Dark/Light theme**: Chuyển đổi theme
4. **Sidebar navigation**: Quản lý phiên chat
5. **Real-time chat**: Trò chuyện thời gian thực
6. **Medical diagnosis**: Chuẩn đoán y tế bằng AI
7. **Vietnamese support**: Hỗ trợ đầy đủ tiếng Việt

## Công nghệ sử dụng

### Backend:
- FastAPI
- LangChain
- Qdrant Vector Database
- OpenAI/OpenRouter API
- Sentence Transformers

### Frontend:
- React 18
- Material-UI (MUI)
- Axios
- React Router
- React Markdown

## Phát triển

### Backend Development:
```bash
cd backend
python run.py
```

### Frontend Development:
```bash
cd frontend
npm start
```

## Build và Deploy

### Backend:
```bash
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend:
```bash
npm run build
```

## Troubleshooting

1. **Lỗi kết nối backend**: Kiểm tra backend có đang chạy tại port 8000
2. **Lỗi API keys**: Kiểm tra file .env có đúng keys
3. **Lỗi dependencies**: Chạy lại `pip install -r requirements.txt` và `npm install`

## Đóng góp

1. Fork dự án
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## License

MIT License
