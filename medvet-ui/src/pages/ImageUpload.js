import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, ZoomIn, AlertCircle, CheckCircle } from 'lucide-react';
import '../styles/ImageUpload.css';

function ImageUpload({ onImageUpload, inputMode }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageQuality, setImageQuality] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        checkImageQuality(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: false
  });

  const checkImageQuality = (file) => {
    const img = new Image();
    img.onload = () => {
      const quality = {
        size: file.size,
        width: img.width,
        height: img.height,
        isGoodLighting: img.width > 800 && img.height > 600,
        isGoodResolution: img.width >= 640
      };
      setImageQuality(quality);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleRemove = () => {
    setUploadedFile(null);
    setPreview(null);
    setImageQuality(null);
  };

  const handleContinue = () => {
    if (uploadedFile) {
      onImageUpload(uploadedFile);
    }
  };

  return (
    <div className="image-upload-page">
      <div className="upload-container">
        <motion.div
          className="upload-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Upload Medical Image</h1>
          <p>Upload a clear photo of the symptom or affected area</p>
        </motion.div>

        {!preview ? (
          <motion.div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'active' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
          >
            <input {...getInputProps()} />
            <Upload size={64} className="upload-icon" />
            <h3>Drag & Drop Image Here</h3>
            <p>or click to browse files</p>
            <div className="supported-formats">
              <span>Supports: JPG, PNG, HEIC</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="preview-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="preview-header">
              <h3>Image Preview</h3>
              <button className="btn-icon" onClick={handleRemove}>
                <X size={20} />
              </button>
            </div>

            <div className="preview-image-container">
              <img src={preview} alt="Upload preview" className="preview-image" />
              <button className="zoom-btn">
                <ZoomIn size={20} />
              </button>
            </div>

            {imageQuality && (
              <div className="quality-checks">
                <h4>Image Quality Check</h4>
                <div className="check-list">
                  <div className={`check-item ${imageQuality.isGoodResolution ? 'good' : 'warning'}`}>
                    {imageQuality.isGoodResolution ? (
                      <CheckCircle size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                    <span>Resolution: {imageQuality.width} x {imageQuality.height}</span>
                  </div>
                  <div className="check-item good">
                    <CheckCircle size={18} />
                    <span>Format: Accepted</span>
                  </div>
                  <div className="check-item good">
                    <CheckCircle size={18} />
                    <span>File size: {(imageQuality.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
              </div>
            )}

            <div className="upload-tips">
              <h4>💡 Tips for best results:</h4>
              <ul>
                <li>Ensure good lighting on the affected area</li>
                <li>Get close to the symptom area</li>
                <li>Avoid blurry images</li>
                <li>Remove any identifying information for privacy</li>
              </ul>
            </div>

            <button className="btn-continue" onClick={handleContinue}>
              Continue
              {inputMode === 'both' && ' to Symptom Description'}
            </button>
          </motion.div>
        )}

        <div className="privacy-notice">
          <AlertCircle size={18} />
          <p>Your images are processed securely and not stored permanently</p>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;