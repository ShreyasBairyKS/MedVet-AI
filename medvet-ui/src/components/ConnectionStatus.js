import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader, AlertCircle, RefreshCw } from 'lucide-react';
import langflowService from '../services/langflowService';

const ConnectionStatus = () => {
  const [status, setStatus] = useState('checking'); // checking, connected, disconnected
  const [checking, setChecking] = useState(false);

  const checkConnection = async () => {
    setChecking(true);
    setStatus('checking');
    
    try {
      const isHealthy = await langflowService.healthCheck();
      setStatus(isHealthy ? 'connected' : 'disconnected');
    } catch (error) {
      setStatus('disconnected');
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    checking: {
      icon: Loader,
      color: 'text-gray-500',
      bg: 'bg-gray-100',
      border: 'border-gray-300',
      text: 'Checking...',
      spin: true
    },
    connected: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-50',
      border: 'border-green-300',
      text: 'LangFlow Connected',
      spin: false
    },
    disconnected: {
      icon: XCircle,
      color: 'text-red-500',
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'LangFlow Offline',
      spin: false
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-20 right-4 z-50 ${config.bg} ${config.border} border-2 rounded-lg px-4 py-2 shadow-lg`}
    >
      <div className="flex items-center space-x-2">
        <motion.div
          animate={config.spin ? { rotate: 360 } : {}}
          transition={config.spin ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
        >
          <Icon className={`w-5 h-5 ${config.color}`} />
        </motion.div>
        <span className={`text-sm font-medium ${config.color}`}>
          {config.text}
        </span>
        {status === 'disconnected' && (
          <button
            onClick={checkConnection}
            disabled={checking}
            className="ml-2 p-1 hover:bg-red-100 rounded transition-colors"
            title="Retry connection"
          >
            <RefreshCw className={`w-4 h-4 text-red-500 ${checking ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>
      
      {status === 'disconnected' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 pt-2 border-t border-red-200"
        >
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-red-700">
              <p className="font-medium mb-1">Cannot reach LangFlow</p>
              <p>1. Is LangFlow running?</p>
              <p className="font-mono text-[10px] bg-red-100 px-1 py-0.5 rounded mt-1">
                langflow run --port 7860
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ConnectionStatus;
