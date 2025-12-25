# 🎬 VideoStream - Full Stack Video Streaming Platform

A modern, full-stack video streaming application built with **React**, **Node.js/Express**, and **MongoDB**. Features JWT authentication, video management, user interactions (likes, comments, subscriptions), and advanced search functionality.

> **Focus**: Backend architecture with scalable API design, database optimization, and production-ready patterns

---

## ✨ Key Features

### 🔐 **Authentication & Authorization**
- JWT-based authentication with access and refresh tokens
- Secure httpOnly cookies for token storage
- Automatic token refresh on 401 errors via axios interceptors
- Password hashing with bcrypt
- Protected routes for authenticated users only

### 📹 **Video Management**
- Upload videos with thumbnail support via Cloudinary CDN
- Edit video metadata (title, description, thumbnail)
- Publish/unpublish toggle for content control
- Delete videos (owner only)
- Video duration tracking
- View count tracking

### 💬 **User Interactions**
- **Likes** - Like/unlike videos and comments with persistent state
- **Comments** - Full CRUD for video comments with like counts
- **Subscriptions** - Follow/unfollow channels with subscriber count tracking
- **User Profiles** - View channel details with all videos and subscriber count

### 🔍 **Search & Discovery**
- Real-time search by video title (case-insensitive)
- Search results with pagination
- MongoDB aggregation pipeline for efficient queries
- Owner details and like counts on search results

### ✅ **Input Validation & UX**
- Client-side form validation with real-time error clearing
- Field-specific error messages for better UX
- Loading states with animated spinners
- Form submission feedback

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Axios** - HTTP client with custom interceptors
- **Tailwind CSS** - Styling
- **Context API** - State management (Auth + axiosInstance)

### Backend
- **Node.js + Express.js** - REST API server
- **MongoDB + Mongoose** - NoSQL database with schema validation
- **JWT (jsonwebtoken)** - Token-based authentication
- **Multer** - File upload middleware
- **Cloudinary** - Cloud media storage (images & videos)
- **bcryptjs** - Password hashing

### Tools & Services
- **Cloudinary** - Image/video hosting
- **MongoDB Atlas** - Cloud database
- **Postman** - API testing

---

## 📋 API Endpoints

### Authentication
- `POST /api/v1/users/register` - Create new user account
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout
- `POST /api/v1/users/refresh-token` - Refresh access token

### Videos
- `GET /api/v1/video` - Get all videos (with search, pagination, filtering)
- `GET /api/v1/video/:id` - Get video details with owner info and like count
- `POST /api/v1/video` - Upload new video (protected)
- `PATCH /api/v1/video/:id` - Update video metadata (protected, owner only)
- `DELETE /api/v1/video/:id` - Delete video (protected, owner only)
- `PATCH /api/v1/video/toggle/publish/:id` - Toggle publish status (protected)

### Comments
- `GET /api/v1/comment/:videoId` - Get all comments for a video
- `POST /api/v1/comment/:videoId` - Add comment (protected)
- `PATCH /api/v1/comment/:commentId` - Update comment (protected)
- `DELETE /api/v1/comment/:commentId` - Delete comment (protected)

### Likes
- `POST /api/v1/likes/toggle/v/:videoId` - Like/unlike video (protected)
- `POST /api/v1/likes/toggle/c/:commentId` - Like/unlike comment (protected)
- `GET /api/v1/likes/videos` - Get liked videos (protected)

### Subscriptions
- `POST /api/v1/subscription/c/:channelId` - Subscribe/unsubscribe (protected)
- `GET /api/v1/subscription/u/:channelId` - Get channel subscribers (protected)

### User Profiles
- `GET /api/v1/users/c/:username` - Get user channel with videos and stats

---

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ 
- MongoDB (local or Atlas)
- Cloudinary account (for media upload)

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/rupamagrawal/video-streamer.git
cd video-streamer
```

#### 2. Backend Setup
```bash
cd Backend
npm install

# Create .env file
cat > .env << EOF
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CORS_ORIGIN=http://localhost:5173
EOF

# Start backend
npm run dev
```

#### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env.local file (if using env variables)
# By default, frontend connects to http://localhost:8000

# Start frontend dev server
npm run dev
```

**Access the app**: http://localhost:5173

---

## 🎯 How to Use

### 1. **Register & Login**
- Sign up with email, username, full name, and avatar
- Login with username/email and password
- Tokens stored in httpOnly cookies automatically

### 2. **Upload Videos**
- Click "Upload" in navbar (logged-in users only)
- Fill title (3-100 chars), description (10+ chars)
- Select video file and thumbnail
- Validation errors appear in real-time
- Progress feedback with "Uploading..." state

### 3. **Discover Videos**
- Browse home page with video grid
- Use search bar to find videos by title
- Click any video to watch

### 4. **Interact**
- **Like** - Click heart icon on videos/comments
- **Comment** - Add comments below videos
- **Subscribe** - Follow channels to see their content
- **View Profile** - Click username to see channel with all videos

### 5. **Manage Your Content**
- Go to your channel profile
- Edit videos (title, description, thumbnail)
- Unpublish videos temporarily
- Delete videos permanently

---

## 📊 Database Schema

### Users
```javascript
{
  _id, fullName, email, username, avatar, coverImage,
  password (hashed), createdAt, updatedAt
}
```

### Videos
```javascript
{
  _id, title, description, videoFile (Cloudinary URL),
  thumbnail (Cloudinary URL), duration, views, isPublished,
  owner (ref: User), createdAt, updatedAt
}
```

### Comments
```javascript
{
  _id, content, video (ref: Video), owner (ref: User),
  createdAt, updatedAt
}
```

### Likes
```javascript
{
  _id, likedBy (ref: User), video (ref: Video) OR comment (ref: Comment),
  createdAt
}
```

### Subscriptions
```javascript
{
  _id, subscriber (ref: User), channel (ref: User),
  createdAt
}
```

---

## 🏗️ Architecture Highlights

### Frontend Architecture
- **Context API** for centralized auth state and shared axios instance
- **Custom axios interceptors** for automatic JWT refresh
- **Protected routes** using ProtectedRoute component
- **Component composition** with reusable like/subscribe buttons
- **Form validation utility** used across all forms

### Backend Architecture
- **Express middleware** for authentication, file uploads, error handling
- **MongoDB aggregation pipelines** for complex queries (likes, subscribers, video details)
- **Separation of concerns** - controllers, routes, models, utils
- **Cloudinary integration** for scalable media storage
- **Error handling** with custom ApiError and ApiResponse utilities

### Key Design Patterns
- **Prop-driven component initialization** - LikeButton accepts initialIsLiked/initialLikeCount
- **Shared API instance** - All components use same axiosInstance with interceptors
- **Aggregation pipelines** - Backend returns all needed data to avoid N+1 queries
- **HTTP-only cookies** - Secure token storage, CSRF protection

---

## 🧪 Testing

### Manual Testing Checklist
- ✅ Register with validation → auto-login
- ✅ Login/logout flow
- ✅ Upload video → appears on home page
- ✅ Like video → count updates → persists on refresh
- ✅ Like comment → count updates
- ✅ Add comment → appears in list
- ✅ Subscribe → count updates → button state changes
- ✅ Search videos → results display correctly
- ✅ Edit video → metadata updates
- ✅ Delete video → removed from list
- ✅ View channel → shows user's videos and stats

### API Testing with Postman
1. Import endpoints from `Backend/` folder
2. Test with authentication headers (tokens in cookies)
3. Verify pagination and search filters

---

## 🚀 Deployment Guide

### Option 1: Deploy with Vercel + Railway (Recommended)

#### Frontend (Vercel)
```bash
# Push code to GitHub
git push origin main

# Connect GitHub repo to Vercel
# Vercel auto-deploys on push
# Set env variable: VITE_API_BASE_URL=your-railway-backend-url
```

#### Backend (Railway)
```bash
# Create Railway project
# Connect GitHub repo
# Set environment variables in Railway dashboard
# Railway auto-deploys on push
```

### Option 2: Deploy with Render + Vercel
Similar process - connect GitHub, Railway auto-deploys with env vars

---

## 📝 Key Implementation Details

### JWT Token Refresh Flow
1. Access token (1 day expiry) sent with every request
2. Refresh token (10 days expiry) stored in httpOnly cookie
3. When 401 error: axios interceptor calls `/refresh-token`
4. New access token returned and request retried automatically
5. User unaware of token refresh - seamless experience

### Search Implementation
1. Frontend sends query to `/video?query=searchTerm`
2. Backend uses MongoDB regex on title field
3. Aggregation pipeline includes owner details + like counts
4. Results paginated with skip/limit
5. Frontend displays grid of matching videos

### Like Persistence
1. User clicks like button
2. Backend toggles like in database
3. Backend returns updated like count
4. Frontend updates component state immediately
5. On page refresh: component initialized from backend data (no state loss)

---

## 📚 Learning Outcomes

This project demonstrates:
- **Full-stack development** - Frontend to backend to database
- **Authentication** - JWT, tokens, refresh logic, security
- **Database design** - Relational queries, aggregation pipelines, indexing
- **API design** - RESTful endpoints, error handling, pagination
- **File uploads** - Multer, Cloudinary integration, media handling
- **Real-time UX** - Loading states, error feedback, validation
- **State management** - Context API, custom hooks, persistence
- **Production patterns** - Error handling, security, scalability

---

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT tokens in httpOnly cookies (CSRF safe)
- ✅ CORS properly configured
- ✅ Protected routes require authentication
- ✅ Owner-only operations (edit/delete own content)
- ✅ Input validation on client and server
- ✅ No sensitive data in response bodies

---

## 📦 Project Structure

```
video-streamer/
├── Backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middlewares/      # Auth, file upload, error handling
│   │   ├── utils/           # Helpers, error classes
│   │   └── app.js           # Express setup
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/           # Page components
    │   ├── components/      # Reusable components
    │   ├── context/         # Auth context + axios
    │   ├── utils/           # Validation, helpers
    │   └── App.jsx          # Routes
    └── package.json
```

---

## 🐛 Known Limitations & Future Improvements

- Comments don't support replies/threading yet
- Video quality/bitrate not selectable
- No notification system for new comments/likes
- Could add video categories/tags
- Could add user follow/feed features

---

## 💡 Tips for Hiring Managers

**Why this project stands out:**
1. **Real-world patterns** - Auth, file uploads, aggregations, search
2. **Scalable design** - Cloudinary for media, MongoDB for flexible data
3. **Production-ready** - Error handling, validation, loading states
4. **Clean code** - Separation of concerns, reusable components
5. **Modern stack** - React 19, Node.js, MongoDB, JWT

**To try it yourself**: [Deploy Link] (coming soon)

---

## 📧 Contact

Feel free to reach out if you have questions about the implementation!

- GitHub: [@rupamagrawal](https://github.com/rupamagrawal)
- Email: rupam.agrawal@example.com

---

## 📄 License

MIT License - Feel free to use this project for learning
