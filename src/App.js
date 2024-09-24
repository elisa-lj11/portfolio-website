// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scene from './components/Scene';
import Strivr from './pages/Strivr';
import NodeTwo from './pages/NodeTwo';
import NodeThree from './pages/NodeThree';
import NotFound from './pages/NotFound';
import './assets/style/fonts.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Scene />} />
          <Route path="/strivr" element={< Strivr />} />
          <Route path="/node2" element={< NodeTwo />} />
          <Route path="/node3" element={< NodeThree />} />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
