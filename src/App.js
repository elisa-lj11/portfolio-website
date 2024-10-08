// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scene from './components/Scene';
import Strivr from './pages/Strivr';
import LocalHive from './pages/LocalHive';
import NodeThree from './pages/NodeThree';
import NotFound from './pages/NotFound';
import './assets/style/fonts.css';

const App = () => {
  // Determine if the app is running on GitHub Pages or locally
  const basename = process.env.NODE_ENV === 'development' ? '' : '/portfolio';

  return (
    <div className="App">
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={< Scene />} />
          <Route path="/strivr" element={< Strivr />} />
          <Route path="/local-hive" element={< LocalHive />} />
          <Route path="/node3" element={< NodeThree />} />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
