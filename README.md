# MedVet AI 🏥🐾

An intelligent medical diagnostic assistant powered by AI that provides preliminary health assessments for both humans and animals. Built with React, LangFlow, and GPT-4o Vision.

![MedVet AI](https://img.shields.io/badge/AI-Medical%20Assistant-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![LangFlow](https://img.shields.io/badge/LangFlow-1.6.7-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

- **Multi-Modal Analysis**: Combines text symptoms and medical images (rashes, wounds, x-rays)
- **AI-Powered Diagnosis**: Uses GPT-4o Vision for comprehensive medical analysis
- **Urgency Assessment**: Color-coded triage system (RED/YELLOW/GREEN)
- **Knowledge Base**: RAG system with 1000+ medical documents via Astra DB
- **Professional UI**: Clean, clinical Mayo Clinic-inspired design
- **Downloadable Reports**: Export diagnosis reports as text files
- **Species Support**: Works for both human and animal patients

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.11+
- **LangFlow** 1.6.7
- **OpenAI API Key** (for GPT-4o)
- **Astra DB** account (for vector database)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ShreyasBairyKS/MedVet-AI.git
cd MedVet-AI
```

2. **Install frontend dependencies**
```bash
cd medvet-ui
npm install
```

3. **Configure environment variables**

Create `medvet-ui/.env`:
```env
REACT_APP_LANGFLOW_URL=http://localhost:7860
REACT_APP_LANGFLOW_FLOW_ID=your-flow-id
REACT_APP_API_TIMEOUT=120000
REACT_APP_LANGFLOW_API_KEY=your-api-key
```

Create `.env.langflow`:
```env
LANGFLOW_SKIP_AUTH_AUTO_LOGIN=true
LANGFLOW_PORT=7860
LANGFLOW_CORS_ALLOW_ORIGINS=*
```

4. **Start LangFlow backend**
```bash
python -m langflow run --host 0.0.0.0 --port 7860 --env-file .env.langflow
```

5. **Start React frontend** (in a new terminal)
```bash
cd medvet-ui
npm start
```

6. **Access the application**
- Frontend UI: http://localhost:3000
- LangFlow Dashboard: http://localhost:7860
│   └── emergency_triage_guidelines.txt
│
└── medvet-ui/                        # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js           # Animated navigation with routing
    │   ├── pages/
    │   │   ├── Home.js              # Landing page
    │   │   ├── DiagnosisWizard.js   # 3-step diagnosis flow
    │   │   ├── Results.js           # Report dashboard
    │   │   └── About.js             # Technology & architecture
    │   ├── App.js                   # React Router setup
    │   ├── index.js
    │   └── index.css                # Tailwind directives
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+ (for LangFlow)
- LangFlow 1.6.7
- OpenAI API key

### Frontend Setup

```powershell
cd medvet-ui
npm install
npm start
```

The app will open at `http://localhost:3000`

### LangFlow Setup

1. **Install LangFlow**:
```bash
pip install langflow==1.6.7
```

2. **Start LangFlow**:
```bash
langflow run
```

3. **Create Components** (in LangFlow UI at `http://localhost:7860`):

#### Step 1: Input & Image Processing
- Add **ChatInput** component (handles both text and images)
- Add **Python Interpreter** with code from `prompts/01-image-preprocess-code.py`
- Add **Prompt** with `prompts/01-vision-json-prompt.txt`
- Add **OpenAI Model** (gpt-4o-mini-vision-preview)

#### Step 2: Symptom Parsing
- Add **Prompt** with `prompts/02-symptom-parser-prompt.txt`
- Add **OpenAI Model** (gpt-4o-mini)
- Add **Output Parser** (JSON)

#### Step 3: Knowledge Base (RAG)
- Add **File** component → Select knowledge base files
- Add **Text Splitter** (Recursive Character)
- Add **OpenAI Embeddings** (text-embedding-3-small)
- Add **Chroma** vector store
- Add **Vector Store Retriever**

#### Step 4: Diagnosis Chain
- Add **Prompt** with `prompts/03-diagnosis-prompt.txt`
- Connect Retriever output to Prompt
- Add **OpenAI Model** (gpt-4o-mini)

#### Step 5: Medication & Urgency
- Add **Prompt** with `prompts/04-medication-prompt.txt` + **OpenAI Model**
- Add **Prompt** with `prompts/05-urgency-prompt.txt` + **OpenAI Model**
- Add **Output Parser** (JSON) after urgency

#### Step 6: Final Report
- Add **Prompt** with `prompts/06-final-report-prompt.txt`
- Add **OpenAI Model** (gpt-4o-mini)
- Add **Chat Output**

4. **Connect Components**:
- ChatInput → Python Interpreter → Vision Prompt → Vision LLM
- Vision LLM → Symptom Parser → Diagnosis Prompt (with RAG context)
- Diagnosis → Medication Prompt → Urgency Prompt → Final Report

5. **Get API Endpoint**:
- Click "Export" → Copy API endpoint
- Update `medvet-ui/src/pages/DiagnosisWizard.js` line with your endpoint

## 🎨 Features

### Multi-Modal Input
- **Image Upload**: Drag & drop with preview and quality checks
- **Symptom Description**: Detailed form with species, age, severity slider
- **Combined Mode**: Both image and text for comprehensive analysis

### Smart Urgency Triage
- **RED**: Immediate medical attention required
- **YELLOW**: Moderate - schedule appointment within 24-48 hours
- **GREEN**: Routine - consult within a week

### Multi-Species Support
- **Human**: Dermatology, internal medicine, emergency triage
- **Dog**: Common conditions (limping, skin, GI issues)
- **Cat**: Feline-specific medical analysis

### Beautiful UI
- **Framer Motion Animations**: Page transitions, hover effects, staggered lists
- **Tailwind CSS Gradients**: Professional medical color palette
- **Responsive Design**: Mobile-first approach
- **Interactive Components**: Progress bars, sliders, animated cards

## 🔧 Technologies

### Backend Stack
- **LangFlow 1.6.7**: Visual AI orchestration
- **OpenAI GPT-4o**: Vision and language models
- **Chroma DB**: Vector embeddings for RAG
- **Python**: Image preprocessing and LangFlow scripts

### Frontend Stack
- **React 18.3.1**: UI framework
- **React Router DOM v6**: Multi-page navigation
- **Tailwind CSS 3.4.1**: Utility-first styling
- **Framer Motion 10.18.0**: Advanced animations
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client (ready for API integration)

## 📊 Knowledge Base

The system includes 3 comprehensive medical reference documents:

1. **common_dog_conditions.txt**: Veterinary diagnostics for dogs
   - Limping and orthopedic issues
   - Skin conditions (hot spots, mange, allergies)
   - Gastrointestinal problems

2. **human_dermatology_guide.txt**: Human skin conditions
   - Moles and melanoma warning signs
   - Eczema, psoriasis, acne
   - Fungal and bacterial infections

3. **emergency_triage_guidelines.txt**: RED/YELLOW/GREEN classification
   - Human emergency indicators
   - Animal critical symptoms
   - Timeframe recommendations

## 🔐 Security & Disclaimers

⚠️ **Important Medical Disclaimer**:
- This is **NOT a medical or veterinary diagnosis**
- For educational purposes only
- Always consult qualified healthcare professionals
- In case of emergency, seek immediate medical attention

🔒 **API Security**:
- Never commit OpenAI API keys to version control
- Use environment variables for sensitive data
- Implement rate limiting in production

## 📝 Usage Flow

1. **Landing** → User learns about the platform
2. **Select Mode** → Choose image/text/both analysis
3. **Provide Details** → Upload image and/or describe symptoms
4. **Review** → Confirm information before submission
5. **AI Analysis** → LangFlow processes through multi-stage pipeline
6. **Results** → View comprehensive report with urgency triage

## 🐛 Known Issues

- Mock data currently used (line 65-95 in DiagnosisWizard.js)
- LangFlow API endpoint needs configuration
- Webpack deprecation warnings (harmless, from react-scripts 5.0.1)

## 🚀 Next Steps

1. **Deploy LangFlow** to cloud (AWS/Azure/GCP)
2. **Replace Mock Data** with real LangFlow API calls
3. **Add Authentication** (Firebase/Auth0)
4. **Implement File Storage** (S3 for images)
5. **Add Medical Records** history tracking
6. **Expand Knowledge Base** with more medical documents
7. **Mobile App** (React Native version)

## 📄 License

Educational project - Not for commercial medical use

## 👨‍💻 Author

Built with ❤️ using LangFlow 1.6.7 and React

---

**Remember**: Always consult with qualified medical professionals for actual diagnoses and treatment.
