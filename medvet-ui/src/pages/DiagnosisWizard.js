import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Send, Loader, X, Image as ImageIcon, FileText, CheckCircle, Info, AlertCircle } from 'lucide-react';
import langflowService from '../services/langflowService';

const DiagnosisWizard = () => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [species, setSpecies] = useState('Human');
  const [age, setAge] = useState('');
  const [severity, setSeverity] = useState(5);
  const [onset, setOnset] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call LangFlow API
      const result = await langflowService.diagnose({
        symptoms,
        species,
        age,
        severity,
        onset,
        medicalHistory,
        image,
        mode
      });

      // Navigate to results with the actual LangFlow response
      navigate('/results', {
        state: {
          report: result.report,
          urgency_json: result.urgency_json
        }
      });
    } catch (err) {
      console.error('Diagnosis error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const modes = [
    { id: 'image', icon: ImageIcon, title: 'Image Analysis', desc: 'Upload a photo for visual diagnosis' },
    { id: 'text', icon: FileText, title: 'Symptom Description', desc: 'Describe symptoms in detail' },
    { id: 'both', icon: CheckCircle, title: 'Combined Analysis', desc: 'Upload image + describe symptoms', recommended: true }
  ];

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s !== 3 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s <= step
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {s}
                </div>
                {s !== 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      s < step ? 'bg-gradient-to-r from-cyan-500 to-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Select Mode</span>
            <span>Provide Details</span>
            <span>Review & Submit</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6"
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-800 mb-1">Error Connecting to LangFlow</h3>
                <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Mode Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Analysis Mode</h1>
                <p className="text-xl text-gray-600">How would you like to provide information?</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {modes.map((m) => (
                  <motion.div
                    key={m.id}
                    whileHover={{ scale: 1.08, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: mode === m.id ? [
                        '0 10px 30px rgba(6, 182, 212, 0.3)',
                        '0 10px 50px rgba(139, 92, 246, 0.4)',
                        '0 10px 30px rgba(6, 182, 212, 0.3)'
                      ] : 'none'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    onClick={() => {
                      setMode(m.id);
                      setStep(2);
                    }}
                    className={`relative cursor-pointer bg-gradient-to-br from-cyan-50/80 via-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 ${
                      mode === m.id ? 'border-cyan-400' : 'border-transparent'
                    }`}
                  >
                    {m.recommended && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-3 right-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                      >
                        Recommended
                      </motion.div>
                    )}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    >
                      <m.icon className="w-12 h-12 text-cyan-500 mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{m.title}</h3>
                    <p className="text-gray-600">{m.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Details Form */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gradient-to-br from-white/90 via-blue-50/90 to-purple-50/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border-2 border-cyan-200"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">Provide Details</h2>

              <div className="space-y-6">
                {/* Species Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Species</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Human', 'Animal'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSpecies(s)}
                        className={`py-3 px-4 rounded-xl font-medium transition-all ${
                          species === s
                            ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-blue-100'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g., 25 years or 3 years old"
                    className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-white/80 backdrop-blur-sm"
                  />
                </div>

                {/* Image Upload */}
                {(mode === 'image' || mode === 'both') && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
                    {!imagePreview ? (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-cyan-300 rounded-xl cursor-pointer hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 transition-all bg-white/70 backdrop-blur-sm">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Upload className="w-12 h-12 text-cyan-500 mb-2" />
                        </motion.div>
                        <span className="text-cyan-600 font-medium">Click to upload or drag & drop</span>
                        <span className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    ) : (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-xl" />
                        <button
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Symptoms */}
                {(mode === 'text' || mode === 'both') && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Describe Symptoms</label>
                      <textarea
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="Describe the symptoms in detail..."
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all resize-none bg-white"
                      />
                      <div className="text-sm text-gray-500 mt-1">{symptoms.length} / 2000 characters</div>
                    </div>

                    {/* Onset */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Symptom Onset</label>
                      <select
                        value={onset}
                        onChange={(e) => setOnset(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-white/80 backdrop-blur-sm"
                      >
                        <option value="">Select...</option>
                        <option value="sudden">Sudden (within hours)</option>
                        <option value="1-3days">1-3 days ago</option>
                        <option value="1week">About a week ago</option>
                        <option value="weeks">Several weeks</option>
                        <option value="chronic">Chronic (months/years)</option>
                      </select>
                    </div>

                    {/* Severity Slider */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Severity Level: <span className="text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text font-bold">{severity}/10</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={severity}
                        onChange={(e) => setSeverity(parseInt(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-cyan-200 to-purple-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        style={{
                          background: `linear-gradient(to right, #06B6D4 0%, #8B5CF6 ${severity * 10}%, #e2e8f0 ${severity * 10}%, #e2e8f0 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Mild</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                      </div>
                    </div>

                    {/* Medical History */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Medical History <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <textarea
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                        placeholder="Any relevant medical history, medications, allergies..."
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all resize-none bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={
                      !age ||
                      ((mode === 'image' || mode === 'both') && !image) ||
                      ((mode === 'text' || mode === 'both') && (!symptoms || !onset))
                    }
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-hover"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gradient-to-br from-white/90 via-cyan-50/90 to-blue-50/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border-2 border-cyan-200"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">Review Your Information</h2>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm font-semibold text-gray-500">Species & Age</div>
                  <div className="text-lg font-bold text-gray-800">{species}, {age}</div>
                </div>

                {imagePreview && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm font-semibold text-gray-500 mb-2">Uploaded Image</div>
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  </div>
                )}

                {symptoms && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm font-semibold text-gray-500">Symptoms</div>
                    <div className="text-gray-700">{symptoms}</div>
                  </div>
                )}

                {onset && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm font-semibold text-gray-500">Onset & Severity</div>
                    <div className="text-gray-700">{onset} • Severity: {severity}/10</div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div className="text-sm text-blue-800">
                    This AI analysis is for informational purposes only and does not replace professional medical advice.
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 glow-hover"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit for Analysis
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiagnosisWizard;
