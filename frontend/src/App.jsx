import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Watch from "./pages/watch/Watch";
import Upload from "./pages/upload/Upload";

function App() {
  return(
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/watch/:id" element={<Watch/>}/>
            <Route path="/upload" element={<Upload/>}/>

        </Routes>
    </div>
  )
}

export default App;
