# Vercel Deployment Guide cho ViMedical

## 🚀 Deploy ViMedical lên Vercel (Free)

### 1. Chuẩn bị dự án

#### Frontend:
```bash
cd frontend
npm run build
```

#### Backend: 
Đã có sẵn `vercel.json` và `backend/api/index.py`

### 2. Deploy lên Vercel

#### Cách 1: Sử dụng Vercel CLI
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login vào Vercel
vercel login

# Deploy từ thư mục root
vercel

# Follow prompts:
# - Project name: vimedical
# - Framework: Other
# - Output directory: frontend/build
```

#### Cách 2: Sử dụng GitHub + Vercel Dashboard
1. **Push code lên GitHub repo cá nhân (✅ ĐÃ HOÀN THÀNH):**

   Code đã được push thành công lên: https://github.com/Ne4nf/ViNNan_app

   **Nếu cần push lại hoặc update code:**
   ```bash
   # Kiểm tra trạng thái
   git status

   # Add file đã thay đổi
   git add .

   # Commit
   git commit -m "Update: mô tả thay đổi"

   # Push lên GitHub
   git push origin main
   ```

   > **Lưu ý:**
   > - File `.gitignore` đã được cấu hình để loại trừ file lớn (node_modules, venv, build, .env, ...)
   > - Repo hiện tại chỉ chứa code cần thiết, không có file nhạy cảm.
   > - Để cập nhật code, chỉ cần add -> commit -> push như bình thường.

2. **Connect với Vercel:**
   - Vào [vercel.com](https://vercel.com)
   - Sign up/Login với GitHub
   - Click "New Project" 
   - Import từ GitHub repository
   - Configure:
     - Framework Preset: **Other**
     - Root Directory: **.**
     - Build Command: `cd frontend && npm run build`
     - Output Directory: `frontend/build`

### 3. Cấu hình Environment Variables

Trong Vercel Dashboard > Settings > Environment Variables, thêm:

```
OPENROUTER_API_KEY=sk-or-v1-your-key-here
QDRANT_URL=https://your-qdrant-url
QDRANT_API_KEY=your-qdrant-key
REACT_APP_API_URL=https://your-app-name.vercel.app/api/v1
```

### 4. Cấu trúc file cho Vercel

```
vimedical/
├── vercel.json              # Vercel config
├── frontend/
│   ├── build/              # React build output  
│   ├── package.json
│   └── ...
├── backend/
│   ├── api/
│   │   └── index.py        # Vercel entry point
│   ├── app/
│   ├── requirements.txt
│   └── ...
```

### 5. File vercel.json đã được tạo

File này đã configure:
- Frontend serving từ `/`
- Backend API từ `/api/*`
- Environment variables
- Build settings

### 6. Alternative: Split Deploy

Nếu gặp vấn đề với full-stack deploy, có thể deploy riêng:

#### Frontend Only (Vercel):
```bash
cd frontend
vercel
```

#### Backend (Railway/Render):
Deploy backend lên Railway hoặc Render, rồi update `REACT_APP_API_URL`

### 7. Domains & URLs

Sau khi deploy:
- App URL: `https://your-app-name.vercel.app`
- API: `https://your-app-name.vercel.app/api/v1`
- Frontend: `https://your-app-name.vercel.app`

### 8. Troubleshooting

#### Lỗi thường gặp:

1. **Build failed:**
   ```bash
   # Đảm bảo build local trước
   cd frontend && npm run build
   ```

2. **API không hoạt động:**
   - Kiểm tra Environment Variables
   - Xem logs trong Vercel Dashboard

3. **CORS issues:**
   - Đã configure CORS trong FastAPI
   - Kiểm tra domain trong `allow_origins`

### 9. Free Tier Limits

Vercel Free:
- ✅ 100GB bandwidth/month
- ✅ Unlimited static deployments
- ✅ Serverless functions (limited)
- ⚠️ 10GB storage
- ⚠️ 100 serverless function executions/day

### 10. Post-Deploy Checklist

- [ ] App loads correctly
- [ ] API endpoints work
- [ ] Chat functionality works
- [ ] Dark/Light theme works
- [ ] Mobile responsive
- [ ] Custom domain (optional)

### 🎉 Your ViMedical app is now live!

URL sẽ có dạng: `https://vimedical-yourname.vercel.app`

---

## 🆓 Alternative Free Hosting Options

### Frontend:
- **Netlify**: Drag & drop build folder
- **GitHub Pages**: Static hosting
- **Surge.sh**: CLI deployment

### Backend:
- **Railway**: Free tier với PostgreSQL
- **Render**: Free tier với sleep mode
- **Heroku**: Free dynos (limited)

### Combo Free Solutions:
1. **Frontend**: Vercel + **Backend**: Railway
2. **Frontend**: Netlify + **Backend**: Render  
3. **Full-stack**: Vercel (như hướng dẫn trên)

Chọn combo phù hợp với nhu cầu và experience!

---

**Happy Deploying! 🚀**
