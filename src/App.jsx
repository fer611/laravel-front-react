import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Analiticas from './pages/Analiticas';
import Blog from './pages/Blog';
import Tag from './pages/Tags';
import Posts from './pages/Posts/page';
import PostsCreate from './pages/Posts/create';
function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/dashboard/categorias" element={<Analiticas />} />
      <Route exact path="/dashboard/tags" element={<Tag />} />
      <Route exact path="/blog" element={<Blog />} />
      <Route exact path="/blog/posts" element={<Posts />} />
      <Route exact path="/blog/posts/create" element={<PostsCreate />} />
      </Routes>
    </>
  );
}

export default App;
