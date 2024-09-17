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
      <Scene />
    </div>
  );
}

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Landing page with the spinning galaxy */}
//         <Route path="/" element={<Galaxy />} />
        
//         {/* Dynamic pages for each star/node */}
//         <Route path="/page/:starIndex" element={<InfoPage />} />
//       </Routes>
//     </Router>
//   );
// }

export default App;
