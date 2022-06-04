import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../css/app.css";

import Home from "./home";
import Bookmarks from "./bookmarks";

// Render the root component
const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element = { <Home /> } />
            <Route path="u/:id" element = { <Bookmarks /> } />
        </Routes>
    </BrowserRouter>
);
