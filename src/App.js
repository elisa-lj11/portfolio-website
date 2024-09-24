// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scene from './components/Scene';
import NodeOne from './pages/NodeOne';
import NodeTwo from './pages/NodeTwo';
import NodeThree from './pages/NodeThree';
import './assets/style/fonts.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/node1" element={< NodeOne />} />
          <Route path="/node2" element={< NodeTwo />} />
          <Route path="/node3" element={< NodeThree />} />
          {/* Add more routes for other nodes */}
          <Route path="/" exact element={<Scene />}>
            {/* You can link to nodes here or show some default content */}
          </Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
