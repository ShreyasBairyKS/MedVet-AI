import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ConnectionStatus from './components/ConnectionStatus';
import Home from './pages/Home';
import DiagnosisWizard from './pages/DiagnosisWizard';
import Results from './pages/Results';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <ConnectionStatus />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnose" element={<DiagnosisWizard />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
