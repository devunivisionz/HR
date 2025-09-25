# Deployment Guide for Interview MERN App

## 🚀 Render.com Deployment

### Backend Deployment (Node.js Service)

1. **Create a new Web Service on Render:**
   - Connect your GitHub repository
   - Choose "Web Service"
   - Environment: Node
   - Plan: Free

2. **Build & Deploy Settings:**
   - **Root Directory**: `server_2`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8001
   ```

### Frontend Deployment (Static Site)

1. **Create a new Static Site on Render:**
   - Connect your GitHub repository
   - Choose "Static Site"
   - Plan: Free

2. **Build & Deploy Settings:**
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

### 🔧 Alternative: Single Service Deployment

If you want to deploy both frontend and backend together:

1. **Use the root package.json:**
   - **Build Command**: `npm run install-all && npm run build`
   - **Start Command**: `npm start`

2. **Update your frontend API configuration:**
   - Point to your deployed backend URL
   - Update CORS settings in backend

### 📝 Important Notes

- Make sure your MongoDB Atlas cluster allows connections from Render's IP ranges
- Update CORS origins in your backend to include your frontend URL
- Set up proper environment variables for production
- Test the deployment locally first

### 🐛 Troubleshooting

- **Package.json not found**: Make sure you're using the correct root directory
- **Build fails**: Check that all dependencies are in package.json
- **CORS errors**: Update CORS settings in backend
- **Database connection**: Verify MongoDB URI and network access
