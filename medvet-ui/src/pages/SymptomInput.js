import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Dog, Cat, Send, Loader } from 'lucide-react';
import '../styles/SymptomInput.css';

function SymptomInput({ onSubmit, hasImage }) {
  const [formData, setFormData] = useState({
    species: 'human',
    age: '',
    symptoms: '',
    onset: 'acute',
    severity: 5,
    duration: '',
    history: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSubmit(formData);
    }, 500);
  };

  const species = [
    { id: 'human', label: 'Human', icon: <User size={24} /> },
    { id: 'dog', label: 'Dog', icon: <Dog size={24} /> },
    { id: 'cat', label: 'Cat', icon: <Cat size={24} /> }
  ];

  return (
    <div className="symptom-input-page">
      <div className="symptom-container">
        <motion.div
          className="symptom-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Describe Symptoms</h1>
          <p>Provide detailed information for accurate analysis</p>
          {hasImage && (
            <div className="has-image-badge">
              ✓ Image uploaded
            </div>
          )}
        </motion.div>

        <form onSubmit={handleSubmit} className="symptom-form">
          {/* Species Selection */}
          <div className="form-section">
            <label className="section-label">Species *</label>
            <div className="species-selector">
              {species.map((s) => (
                <motion.button
                  key={s.id}
                  type="button"
                  className={`species-btn ${formData.species === s.id ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, species: s.id }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Age Input */}
          <div className="form-section">
            <label htmlFor="age" className="section-label">Age (years) *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="form-input"
              required
              min="0"
              max="150"
            />
          </div>

          {/* Symptom Description */}
          <div className="form-section">
            <label htmlFor="symptoms" className="section-label">
              Symptom Description *
            </label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Example: Limping on left front leg for 3 days. Mild swelling near joint, still eating normally, no fever."
              className="form-textarea"
              rows="6"
              required
            />
            <div className="char-count">
              {formData.symptoms.length} / 1000 characters
            </div>
          </div>

          {/* Onset Selection */}
          <div className="form-section">
            <label htmlFor="onset" className="section-label">Onset</label>
            <select
              id="onset"
              name="onset"
              value={formData.onset}
              onChange={handleChange}
              className="form-select"
            >
              <option value="acute">Acute (sudden, within 24 hours)</option>
              <option value="subacute">Subacute (days to weeks)</option>
              <option value="chronic">Chronic (weeks to months)</option>
            </select>
          </div>

          {/* Duration */}
          <div className="form-section">
            <label htmlFor="duration" className="section-label">Duration (days)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="How many days?"
              className="form-input"
              min="0"
            />
          </div>

          {/* Severity Slider */}
          <div className="form-section">
            <label htmlFor="severity" className="section-label">
              Pain/Severity Level: <strong>{formData.severity}/10</strong>
            </label>
            <input
              type="range"
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              min="1"
              max="10"
              className="severity-slider"
            />
            <div className="severity-labels">
              <span>Mild (1-3)</span>
              <span>Moderate (4-6)</span>
              <span>Severe (7-10)</span>
            </div>
          </div>

          {/* Medical History */}
          <div className="form-section">
            <label htmlFor="history" className="section-label">
              Relevant Medical History (Optional)
            </label>
            <textarea
              id="history"
              name="history"
              value={formData.history}
              onChange={handleChange}
              placeholder="Any relevant past conditions, medications, allergies, or treatments..."
              className="form-textarea"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="submit-button"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <Loader className="spinner" size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <Send size={20} />
                Analyze Symptoms
              </>
            )}
          </motion.button>
        </form>

        <div className="ai-suggestions-box">
          <h4>💡 AI Suggestions</h4>
          <p>For better results, please include:</p>
          <ul>
            <li>Specific location of symptoms</li>
            <li>Changes in behavior or appetite</li>
            <li>Any visible swelling, redness, or discharge</li>
            <li>Previous similar incidents</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SymptomInput;