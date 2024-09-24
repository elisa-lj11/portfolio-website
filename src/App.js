// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InfoPage from './components/InfoPage';
import Scene from './components/Scene';
import './assets/style/fonts.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Scene />} />
          {/* Dynamic route for InfoPage with a parameter */}
          <Route path="/:nodeId" element={<InfoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
