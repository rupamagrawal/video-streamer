import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Watch from "./pages/watch/Watch";
import Upload from "./pages/upload/Upload";
import Navbar from "./components/navbar/navbar";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register";
import Channel from "./pages/Channel/Channel";
import EditVideo from "./pages/EditVideo/EditVideo";
import Search from "./pages/Search/Search";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/channel/:username" element={<Channel />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-video/:videoId"
          element={
            <ProtectedRoute>
              <EditVideo />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
