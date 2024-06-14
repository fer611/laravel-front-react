import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Analiticas from "./pages/Analiticas";
import Blog from "./pages/Blog";
import Tag from "./pages/Tags";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/dashboard/categorias" element={<Analiticas />} />
        <Route exact path="/dashboard/tags" element={<Tag />} />
        <Route exact path="/blog" element={<Blog />} />
        {/* Autenticación */}
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
