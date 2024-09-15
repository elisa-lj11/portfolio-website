// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Galaxy from './components/Galaxy';
import InfoPage from './components/InfoPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page with the spinning galaxy */}
        <Route path="/" element={<Galaxy />} />
        
        {/* Dynamic pages for each star/node */}
        <Route path="/page/:starIndex" element={<InfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
