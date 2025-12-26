# 🎬 VideoStream - Full Stack Video Streaming Platform

A modern, full-stack video streaming application built with **React**, **Node.js/Express**, and **MongoDB**. Features JWT authentication, video management, user interactions (likes, comments, subscriptions), and advanced search functionality.

> **Focus**: Production-ready backend architecture with scalable API design, database optimization, and cross-domain deployment patterns.

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

* **Cloudinary Integration**: High-performance video and thumbnail hosting.
* **Content Control**: Publish/unpublish toggles and owner-only deletion.
* **Analytics**: Real-time tracking of views and video duration.

### 💬 **User Interactions**

* **Engagement**: Like/unlike system for both videos and comments.
* **Community**: Full CRUD functionality for comments.
* **Subscriptions**: Channel-based subscription model with real-time subscriber counts.

### 🔍 **Search & Discovery**

* **Global Search**: Case-insensitive title search.
* **Performance**: Optimized MongoDB aggregation pipelines to fetch owner details and like counts in a single database hit.
* **Pagination**: Efficient data fetching using `skip` and `limit`.

---

## 🛠️ Tech Stack

### Frontend

* **React 19** & **React Router 7**
* **Tailwind CSS** (Styling)
* **Context API** (Global state for Auth)
* **Axios** (API communication)

### Backend

* **Node.js** & **Express.js**
* **MongoDB** & **Mongoose** (ODM)
* **Multer** (File handling)
* **Cloudinary** (Media storage)

### Infrastructure

* **Vercel**: Frontend hosting
* **Render**: Backend hosting
* **MongoDB Atlas**: Cloud database

---

## 📋 API Endpoints (v1)

| Category | Endpoint | Method | Description |
| --- | --- | --- | --- |
| **Auth** | `/users/register` | `POST` | Create new account |
| **Auth** | `/users/refresh-token` | `POST` | Renew access token |
| **Videos** | `/video` | `GET` | Get all videos (Search/Pagination) |
| **Videos** | `/video/:id` | `PATCH` | Update metadata (Owner only) |
| **Likes** | `/likes/toggle/v/:videoId` | `POST` | Toggle video like |
| **Subs** | `/subscription/c/:id` | `POST` | Toggle channel subscription |

---

## 🚀 Local Development Setup

### 1. Clone & Install

```bash
git clone https://github.com/rupamagrawal/video-streamer.git
cd video-streamer

```

### 2. Backend Configuration

```bash
cd Backend
npm install

# Create .env file and add:
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

### 3. Frontend Configuration

```bash
cd frontend
npm install

# Create .env file:
VITE_API_BASE_URL=http://localhost:8000

npm run dev

```

---

## 🏗️ Architecture Highlights

### JWT Token Refresh Flow

1. **Access Token**: Short-lived (1 day), sent in headers/cookies.
2. **Refresh Token**: Long-lived (10 days), stored in `httpOnly` cookie.
3. **Interceptor**: If a request fails with 401, the frontend automatically hits the `/refresh-token` endpoint and retries the original request.

### Database Schema

* **Aggregations**: Used to calculate "Subscribers count" and "IsSubscribed" status dynamically during profile fetches to ensure data integrity.

---
📦 Project Structure

video-streamer/

├── Backend/

│   └── src/

│       ├── controllers/

│       ├── models/

│       ├── routes/

│       ├── middlewares/

│       ├── utils/

│       └── app.js

│

└── frontend/

    └── src/

        ├── pages/

        ├── components/

        ├── context/

        ├── utils/

        └── App.jsx

 ---     

## 📚 Learning Outcomes

* **Full-stack Integration**: Managing cross-origin cookies between Vercel and Render.
* **Performance**: Reducing API latency using optimized MongoDB queries.
* **Security**: Implementing robust middleware for protected routes and file validation.

---

## 📧 Contact

**Rupam Agrawal**

* **GitHub**: [@rupamagrawal](https://github.com/rupamagrawal)
* **Email**: [rupamagrawal1806@gmail.com](mailto:rupamagrawal1806@gmail.com)

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
