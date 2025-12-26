# 🎬 VideoStream - Full Stack Video Streaming Platform

A modern, full-stack video streaming application built with **React**, **Node.js/Express**, and **MongoDB**. Features JWT authentication, video management, user interactions (likes, comments, subscriptions), and advanced search functionality.

> **Focus**: Production-ready backend architecture with scalable API design, database optimization, and real-world deployment patterns.

---

## 🌐 Live Deployment

* **Frontend (Vercel):** [https://video-streamer-two.vercel.app/](https://video-streamer-two.vercel.app/)
* **Backend API (Render):** [https://video-streamer-ouo3.onrender.com](https://video-streamer-ouo3.onrender.com)

---

## ✨ Key Features

### 🔐 **Authentication & Authorization**

* **JWT-based Auth**: Secure access and refresh token logic.
* **Secure Storage**: Tokens stored in `httpOnly` cookies to prevent XSS.
* **Axios Interceptors**: Automatic token refresh on 401 errors for a seamless UX.
* **Bcrypt Hashing**: Industry-standard password encryption.

### 📹 **Video Management**

* **Cloudinary Integration**: High-performance video and thumbnail hosting via CDN.
* **Content Control**: Publish/unpublish toggles and owner-only deletion.
* **Metadata Management**: Edit titles, descriptions, and thumbnails after upload.

### 💬 **User Interactions**

* **Engagement**: Like/unlike system for both videos and comments.
* **Community**: Full CRUD functionality for video comments.
* **Subscriptions**: Channel-based follow model with real-time stats tracking.

### 🔍 **Search & Discovery**

* **Global Search**: Case-insensitive title search with pagination.
* **Performance**: Optimized **MongoDB Aggregation Pipelines** to fetch owner details and engagement counts in a single database hit.

---

## 🛠️ Tech Stack

### Frontend

* **React 19** - UI framework
* **React Router 7** - Client-side routing
* **Axios** - HTTP client with custom interceptors
* **Tailwind CSS** - Styling
* **Context API** - Global Auth & API state management

### Backend

* **Node.js + Express.js** - REST API server
* **MongoDB + Mongoose** - Database & ODM
* **JWT** - Token-based authentication
* **Multer** - File upload middleware
* **Cloudinary** - Cloud media storage

---

## 🏗️ Architecture & Flow

The platform follows a classic **MERN stack** architecture with a decoupled frontend and backend, utilizing cloud services for media and data storage.

### **The Request Flow**

1. **Frontend**: Captures user input and dispatches requests using an **Axios instance** configured with `withCredentials: true`.
2. **Middleware Layer**:
* **Auth Middleware**: Verifies JWTs from cookies.
* **Multer**: Temporarily stores uploads locally before cloud transit.


3. **Controllers**: Executes business logic (e.g., handling likes, calculating subscription status).
4. **Data Persistence**:
* **MongoDB Atlas**: Stores structured data (User profiles, Metadata).
* **Cloudinary**: Acts as the Media Engine for video transcoding and delivery.



### **🔄 JWT Authentication Flow**

1. **Login**: User receives an **Access Token** (short-lived) and a **Refresh Token** (long-lived, `httpOnly`).
2. **Expiry**: If the Access Token expires, the backend returns a `401 Unauthorized`.
3. **Refresh**: The Axios interceptor catches the 401, calls the `/refresh-token` endpoint, gets a new Access Token, and retries the original request seamlessly.

---

## 📊 Database Schema

The platform uses a relational modeling approach within MongoDB, utilizing **Mongoose Virtuals** and **Aggregation Pipelines** to handle complex relationships between collections.

### **Core Collections**

| Collection | Key Fields | Relationships |
| --- | --- | --- |
| **Users** | `username`, `email`, `password`, `avatar` | Owner of Videos, Comments, and Likes |
| **Videos** | `videoFile`, `thumbnail`, `title`, `views` | Linked to `User` (Owner) |
| **Comments** | `content` | Linked to `Video` and `User` (Owner) |
| **Likes** | `likedBy` | Polymorphic: Links to `Video` OR `Comment` |
| **Subscriptions** | `subscriber`, `channel` | Links `User` to `User` (Channel) |

---

## 📋 API Endpoints

### Authentication

* `POST /api/v1/users/register` - Create account
* `POST /api/v1/users/login` - User login
* `POST /api/v1/users/logout` - User logout
* `POST /api/v1/users/refresh-token` - Refresh access token

### Videos

* `GET /api/v1/video` - Get all videos (Search/Pagination)
* `GET /api/v1/video/:id` - Get specific video details
* `POST /api/v1/video` - Upload video (Protected)
* `PATCH /api/v1/video/:id` - Update metadata (Owner only)
* `DELETE /api/v1/video/:id` - Delete video (Owner only)

### Interactions

* `POST /api/v1/likes/toggle/v/:videoId` - Toggle video like
* `POST /api/v1/subscription/c/:channelId` - Subscribe/Unsubscribe

---

## 📦 Project Structure

```text
video-streamer/
├── Backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API endpoints
│   │   ├── middlewares/      # Auth, file upload, error handling
│   │   ├── utils/            # Helpers, error classes
│   │   └── app.js            # Express setup
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/            # Page components
    │   ├── components/       # Reusable components
    │   ├── context/          # Auth context + axios
    │   ├── utils/            # Validation, helpers
    │   └── App.jsx           # Routes
    └── package.json

```

---

## 🚀 Local Development Setup

### 1. Clone & Install

```bash
git clone https://github.com/rupamagrawal/video-streamer.git
cd video-streamer

```

### 2. Backend Setup

```bash
cd Backend
npm install

# Create .env file:
PORT=8000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CORS_ORIGIN=http://localhost:5173

npm run dev

```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file:
VITE_API_BASE_URL=http://localhost:8000

npm run dev

```

---

## 📧 Contact

**Rupam Agrawal**

* **GitHub**: [@rupamagrawal](https://github.com/rupamagrawal)
* **Email**: [rupamagrawal1806@gmail.com](mailto:rupamagrawal1806@gmail.com)

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
