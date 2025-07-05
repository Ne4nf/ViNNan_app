# ViMedical Deployment Guide

## 🚀 Hướng dẫn Deploy ViMedical

### Prerequisites (Yêu cầu)
- Python 3.8+
- Node.js 16+
- npm hoặc yarn

### 1. Quick Start (Khởi chạy nhanh)

#### Sử dụng script tự động:
```bash
# Windows
start_all.bat

# Linux/macOS
chmod +x setup.sh
./setup.sh
```

#### Hoặc khởi chạy thủ công:

**Backend:**
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
copy .env.example .env
# Chỉnh sửa .env với API keys của bạn
python run.py
```

**Frontend:**
```bash
cd frontend
npm install
copy .env.example .env
npm start
```

### 2. Environment Configuration

#### Backend (.env):
```env
OPENROUTER_API_KEY=your_openrouter_api_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
```

#### Frontend (.env):
```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

### 3. Docker Deployment

```bash
# Build và run với Docker Compose
docker-compose up -d

# Hoặc build riêng lẻ
# Backend:
cd backend
docker build -t vimedical-backend .
docker run -p 8000:8000 vimedical-backend

# Frontend:
cd frontend
docker build -t vimedical-frontend .
docker run -p 3000:3000 vimedical-frontend
```

### 4. Production Deployment

#### Backend (Production):
```bash
# Cài đặt dependencies
pip install -r requirements.txt

# Chạy với Gunicorn
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# Hoặc với Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

#### Frontend (Production):
```bash
# Build production
npm run build

# Serve static files
npm install -g serve
serve -s build -l 3000

# Hoặc sử dụng nginx
# Copy build folder to nginx html directory
```

### 5. Nginx Configuration

```nginx
# /etc/nginx/sites-available/vimedical
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6. Systemd Service (Linux)

#### Backend Service:
```ini
# /etc/systemd/system/vimedical-backend.service
[Unit]
Description=ViMedical Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/backend
Environment=PATH=/path/to/backend/venv/bin
ExecStart=/path/to/backend/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# Enable và start service
sudo systemctl daemon-reload
sudo systemctl enable vimedical-backend
sudo systemctl start vimedical-backend
```

### 7. Monitoring & Logging

#### Backend Logging:
```python
# app/main.py
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

#### Health Check:
```bash
# Test backend health
curl http://localhost:8000/health

# Test API
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'
```

### 8. Security Best Practices

1. **Environment Variables**: Không commit file .env
2. **HTTPS**: Sử dụng SSL certificate
3. **Firewall**: Chỉ mở ports cần thiết
4. **Rate Limiting**: Thêm rate limiting cho API
5. **CORS**: Cấu hình CORS phù hợp

### 9. Backup & Recovery

```bash
# Backup database/files
tar -czf vimedical-backup-$(date +%Y%m%d).tar.gz /path/to/vimedical

# Backup environment
cp .env .env.backup
```

### 10. Troubleshooting

#### Common Issues:

1. **Backend không start**:
   - Kiểm tra Python version
   - Kiểm tra dependencies
   - Kiểm tra .env file

2. **Frontend không kết nối được backend**:
   - Kiểm tra REACT_APP_API_URL
   - Kiểm tra CORS settings
   - Kiểm tra backend có chạy không

3. **Docker issues**:
   - Kiểm tra Docker daemon
   - Kiểm tra port conflicts
   - Kiểm tra Docker compose version

#### Debug Commands:
```bash
# Check processes
ps aux | grep python
ps aux | grep node

# Check ports
netstat -tlnp | grep :8000
netstat -tlnp | grep :3000

# Check logs
tail -f backend/app.log
docker-compose logs -f
```

### 11. Performance Optimization

1. **Backend**:
   - Increase worker count
   - Add caching
   - Optimize database queries

2. **Frontend**:
   - Enable gzip compression
   - Use CDN for static assets
   - Implement lazy loading

### 12. Scaling

#### Horizontal Scaling:
```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    deploy:
      replicas: 3
    ports:
      - "8000-8002:8000"
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - backend
```

#### Load Balancer (Nginx):
```nginx
upstream backend {
    server backend:8000;
    server backend:8001;
    server backend:8002;
}

server {
    location /api/ {
        proxy_pass http://backend;
    }
}
```

---

## 📞 Support

Nếu gặp vấn đề trong quá trình deploy, vui lòng:

1. Kiểm tra logs
2. Chạy test script: `python test_system.py`
3. Kiểm tra documentation
4. Tạo issue trên GitHub

**Happy Deploying! 🚀**
