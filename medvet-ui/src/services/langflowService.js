const LANGFLOW_BASE_URL = process.env.REACT_APP_LANGFLOW_URL || 'http://localhost:7860';
const FLOW_ID = process.env.REACT_APP_LANGFLOW_FLOW_ID || 'f7df69e1-2eaf-4b76-b3f9-729fe696f6ed';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '120000', 10);
const LANGFLOW_API_KEY = process.env.REACT_APP_LANGFLOW_API_KEY || 'sk-uJ8FAUHTh7UvmiZKd644Mp6KQyZ9k14YOy_C-iaifVk';

class LangFlowService {
  constructor() {
    this.baseURL = LANGFLOW_BASE_URL;
    this.flowId = FLOW_ID;
    this.apiKey = LANGFLOW_API_KEY;
  }

  async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`;
    }
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
        mode: 'cors',
        signal: AbortSignal.timeout(API_TIMEOUT)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(`HTTP error! Status: ${response.status}`);
        error.response = { status: response.status, data: errorData };
        throw error;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Request Error:', error);
      // Enhance error object for handleError method
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        error.request = true; // Mark as connection error
      }
      throw error;
    }
  }

  async initiateSession(inputValue, stream = false, tweaks = {}) {
    const endpoint = `/api/v1/run/${this.flowId}?stream=${stream}`;
    return this.post(endpoint, { input_value: inputValue, tweaks: tweaks });
  }

  /**
   * Convert image file to base64 string
   */
  async imageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Send diagnosis request to LangFlow
   */
  async diagnose(data) {
    const { 
      symptoms, 
      species, 
      age, 
      severity, 
      onset, 
      medicalHistory, 
      image,
      mode 
    } = data;

    try {
      // Prepare the input message
      const inputMessage = `Patient Information:
Species: ${species}
Age: ${age}
Severity: ${severity}/10
Onset: ${onset}
Medical History: ${medicalHistory || 'None provided'}

Symptoms:
${symptoms}`;

      // Prepare tweaks for ChatInput component
      const tweaks = {
        "ChatInput-memce": {
          sender: "User",
          sender_name: "User",
          session_id: "",
          should_store_message: true
        }
      };

      // Add files if image provided
      if (image && (mode === 'image' || mode === 'both')) {
        const base64Image = await this.imageToBase64(image);
        tweaks["ChatInput-memce"].files = [{
          data: base64Image,
          type: image.type,
          name: image.name
        }];
      }

      console.log('Sending to LangFlow:', { inputMessage, tweaks });

      const response = await this.initiateSession(inputMessage, false, tweaks);

      console.log('LangFlow Response:', response);

      // Parse and return the response
      return this.parseResponse(response);

    } catch (error) {
      console.error('LangFlow API Error:', error);
      throw new Error(this.handleError(error));
    }
  }

  /**
   * Parse LangFlow response to extract report
   */
  parseResponse(responseData) {
    try {
      // LangFlow returns outputs in different formats
      // Navigate through the response structure
      const outputs = responseData?.outputs?.[0]?.outputs?.[0];
      
      if (!outputs) {
        throw new Error('Invalid response structure from LangFlow');
      }

      // Extract the final report message
      const reportMessage = outputs.results?.message?.data?.text || 
                           outputs.results?.message?.text ||
                           outputs.messages?.[0]?.text ||
                           outputs.text ||
                           'No report generated';

      // Try to extract urgency JSON if available
      let urgencyData = null;
      
      // Look for urgency data in the response
      if (responseData.outputs) {
        const urgencyOutput = responseData.outputs.find(
          out => out.outputs?.find(o => o.results?.urgency)
        );
        if (urgencyOutput) {
          urgencyData = urgencyOutput.outputs.find(o => o.results?.urgency)?.results?.urgency;
        }
      }

      // Default urgency if not found
      if (!urgencyData) {
        urgencyData = {
          triage_level: 'YELLOW',
          recommended_timeframe: 'within 24-48 hours',
          urgency_score: 50
        };
      }

      return {
        report: reportMessage,
        urgency_json: urgencyData,
        raw_response: responseData
      };

    } catch (error) {
      console.error('Error parsing LangFlow response:', error);
      throw new Error('Failed to parse medical analysis results');
    }
  }

  /**
   * Handle API errors with detailed messages
   */
  handleError(error) {
    if (error.name === 'AbortError') {
      return 'Request timeout. The analysis is taking too long. Please try again.';
    }
    
    if (error.response) {
      // Server responded with error
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.detail;
      
      switch (status) {
        case 400:
          return `Invalid request: ${message || 'Please check your input data'}`;
        case 403:
          return `Authentication required: LangFlow needs an API key or auth bypass.\n\nTo fix:\n1. Start LangFlow with: langflow run --port 7860 --env-file .env.langflow\n2. Add to .env.langflow: LANGFLOW_SKIP_AUTH_AUTO_LOGIN=true\n\nOr set REACT_APP_LANGFLOW_API_KEY in your React .env file.`;
        case 404:
          return 'LangFlow service not found. Is the server running on port 7860?';
        case 500:
          return `Server error: ${message || 'LangFlow encountered an internal error'}`;
        default:
          return `Error ${status}: ${message || 'Unknown error occurred'}`;
      }
    }
    
    if (!error.response && error.message) {
      // Request made but no response
      return 'Cannot connect to LangFlow. Please ensure:\n1. LangFlow is running (port 7860)\n2. The flow is loaded\n3. No firewall is blocking the connection';
    }
    
    return error.message || 'An unexpected error occurred';
  }

  /**
   * Health check for LangFlow API
   */
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/api/v1/version`, {
        mode: 'cors',
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        return false;
      }

      await response.json();
      return true;
    } catch (error) {
      console.error('LangFlow health check failed:', error);
      return false;
    }
  }
}

export default new LangFlowService();
