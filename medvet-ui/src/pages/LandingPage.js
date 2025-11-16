import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Image, FileText, Shield, Users, Stethoscope } from 'lucide-react';
import '../styles/LandingPage.css';

function LandingPage({ onStartDiagnosis }) {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <div className="hero-badge">
            <Activity className="badge-icon" />
            <span>AI-Powered Diagnostic Assistant</span>
          </div>
          
          <h1 className="hero-title">
            MedVetAssist
            <span className="title-highlight"> AI Diagnostic</span> Assistant
          </h1>
          
          <p className="hero-subtitle">
            Upload a symptom photo or describe what's happening. Get AI-driven triage, 
            insights & next steps for humans and animals.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={onStartDiagnosis}>
              <Stethoscope size={20} />
              Start Diagnosis
            </button>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Comprehensive AI Analysis</h2>
        
        <div className="features-grid">
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="feature-icon blue">
              <Image size={32} />
            </div>
            <h3>Image Diagnosis</h3>
            <p>Computer vision for rashes, injuries, and visual symptoms with confidence scoring</p>
          </motion.div>

          <motion.div 
            className="feature-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="feature-icon teal">
              <FileText size={32} />
            </div>
            <h3>Symptom Checker</h3>
            <p>Text-based clinical intake with intelligent follow-up questions</p>
          </motion.div>

          <motion.div 
            className="feature-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="feature-icon orange">
              <Shield size={32} />
            </div>
            <h3>Urgency Triage</h3>
            <p>Smart detection of when professional medical attention is needed</p>
          </motion.div>
        </div>
      </section>

      {/* Supported Species */}
      <section className="species-section">
        <h2 className="section-title">Supports Multiple Species</h2>
        
        <div className="species-grid">
          <div className="species-card">
            <div className="species-icon">👤</div>
            <h4>Human</h4>
            <p>Medical diagnosis assistance</p>
          </div>
          
          <div className="species-card">
            <div className="species-icon">🐶</div>
            <h4>Dog</h4>
            <p>Canine health analysis</p>
          </div>
          
          <div className="species-card">
            <div className="species-icon">🐱</div>
            <h4>Cat</h4>
            <p>Feline health assessment</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-disclaimer">
          <Shield size={20} />
          <p>
            <strong>Medical Disclaimer:</strong> This tool provides informational content only 
            and is not a substitute for professional medical or veterinary advice, diagnosis, or treatment.
          </p>
        </div>
        
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#about">About Us</a>
        </div>
        
        <p className="footer-copyright">
          © 2025 MedVetAssist. Powered by AI • Not a substitute for professional advice
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;