import React from 'react';
import { motion } from 'framer-motion';
import { Image, FileText, Combine } from 'lucide-react';
import '../styles/DiagnosisStart.css';

function DiagnosisStart({ onModeSelect }) {
  const modes = [
    {
      id: 'image',
      icon: <Image size={48} />,
      title: 'Upload Image',
      description: 'Analyze a photo of the symptom or condition',
      color: 'blue'
    },
    {
      id: 'text',
      icon: <FileText size={48} />,
      title: 'Describe Symptoms',
      description: 'Enter detailed text description of the condition',
      color: 'teal'
    },
    {
      id: 'both',
      icon: <Combine size={48} />,
      title: 'Image + Text',
      description: 'Combine visual and descriptive information for best results',
      color: 'purple',
      recommended: true
    }
  ];

  return (
    <div className="diagnosis-start-page">
      <div className="diagnosis-container">
        <motion.div
          className="diagnosis-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Choose Input Method</h1>
          <p>Select how you'd like to describe the symptoms or condition</p>
        </motion.div>

        <div className="mode-cards-grid">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.id}
              className={`mode-card ${mode.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onModeSelect(mode.id)}
            >
              {mode.recommended && (
                <div className="recommended-badge">Recommended</div>
              )}
              
              <div className="mode-icon">
                {mode.icon}
              </div>
              
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
              
              <button className="mode-button">
                Continue
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="diagnosis-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>
            💡 <strong>Tip:</strong> For most accurate results, use both image and text description
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default DiagnosisStart;