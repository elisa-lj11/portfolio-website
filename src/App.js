// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Galaxy from './components/Galaxy';
import InfoPage from './components/InfoPage';
import Scene from './components/Scene';
import Model from './components/Model';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Scene />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
