# 🏥 MedVet AI Diagnostic System - Complete Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE (React)                       │
│                     http://localhost:3000                            │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTP POST
                                  │ /api/v1/run/{flow_id}
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     LANGFLOW API SERVER                              │
│                   http://127.0.0.1:7860                              │
│                                                                       │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │                    MED RAG FLOW                            │     │
│  │          ID: 5c5dba19-5737-4413-aa04-68d7431ac3ef         │     │
│  └───────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
        ┌──────────────────┐         ┌──────────────────┐
        │   IMAGE INPUT    │         │   TEXT INPUT     │
        │   (if provided)  │         │   (symptoms)     │
        └──────────────────┘         └──────────────────┘
                    │                           │
                    │ Base64 Image              │ Text String
                    │                           │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │    CHAT INPUT            │
                    │   Component              │
                    │   - Receives message     │
                    │   - Handles files        │
                    └──────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
        ┌──────────────────┐         ┌──────────────────┐
        │  VISION PIPELINE │         │  TEXT PIPELINE   │
        │                  │         │                  │
        │  1. Image        │         │  1. Symptom      │
        │     Preprocess   │         │     Parser       │
        │  2. Vision LLM   │         │     Prompt       │
        │     (GPT-4o)     │         │  2. OpenAI LLM   │
        │  3. Extract      │         │     (gpt-4o)     │
        │     Findings     │         │  3. Structured   │
        │                  │         │     Output       │
        └──────────────────┘         └──────────────────┘
                    │                           │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │   RAG RETRIEVAL          │
                    │                          │
                    │  1. Embedding Model      │
                    │     (text-embedding-3)   │
                    │  2. AstraDB Search       │
                    │     (Vector Store)       │
                    │  3. Parser (Stringify)   │
                    │     - Combines docs      │
                    │                          │
                    └──────────────────────────┘
                                  │
                                  │ Context Documents
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  ANALYSIS PIPELINE       │
                    │                          │
                    │  Prompt 1: Diagnosis     │
                    │  ├─ LLM: GPT-4o          │
                    │  └─ Output: Diagnosis    │
                    │                          │
                    │  Prompt 2: Medication    │
                    │  ├─ LLM: GPT-4o          │
                    │  └─ Output: Meds         │
                    │                          │
                    │  Prompt 3: Urgency       │
                    │  ├─ LLM: GPT-4o          │
                    │  └─ Output: Triage JSON  │
                    │                          │
                    └──────────────────────────┘
                                  │
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  FINAL REPORT            │
                    │  GENERATION              │
                    │                          │
                    │  Prompt: Comprehensive   │
                    │  ├─ LLM: GPT-4o          │
                    │  └─ Output: Markdown     │
                    │                          │
                    └──────────────────────────┘
                                  │
                                  │ JSON Response
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     LANGFLOW RESPONSE                                │
│                                                                       │
│  {                                                                    │
│    "outputs": [{                                                      │
│      "outputs": [{                                                    │
│        "results": {                                                   │
│          "message": {                                                 │
│            "text": "# Medical Analysis Report\n\n..."               │
│          }                                                            │
│        }                                                              │
│      }]                                                               │
│    }]                                                                 │
│  }                                                                    │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTP Response
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   LANGFLOW SERVICE (React)                           │
│                   src/services/langflowService.js                    │
│                                                                       │
│  - Parse response structure                                          │
│  - Extract report text                                               │
│  - Extract urgency JSON                                              │
│  - Error handling                                                    │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ Parsed Data
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      RESULTS PAGE                                    │
│                   src/pages/Results.js                               │
│                                                                       │
│  ┌─────────────────────────────────────────────────────┐           │
│  │  ┌─────────────┐  URGENCY BADGE                     │           │
│  │  │     RED     │  ← Immediate attention needed      │           │
│  │  │   YELLOW    │  ← Within 24-48 hours              │           │
│  │  │    GREEN    │  ← Routine care                    │           │
│  │  └─────────────┘                                     │           │
│  │                                                       │           │
│  │  # Medical Analysis Report                           │           │
│  │                                                       │           │
│  │  ## Patient Information                              │           │
│  │  - Species: Human                                    │           │
│  │  - Age: 30                                           │           │
│  │                                                       │           │
│  │  ## Symptoms Analysis                                │           │
│  │  [AI-generated symptom breakdown]                    │           │
│  │                                                       │           │
│  │  ## Assessment                                       │           │
│  │  [AI medical assessment]                             │           │
│  │                                                       │           │
│  │  ## Diagnosis                                        │           │
│  │  [AI-generated diagnosis options]                    │           │
│  │                                                       │           │
│  │  ## Medication Suggestions                           │           │
│  │  [AI-recommended medications]                        │           │
│  │                                                       │           │
│  │  ## Recommendations                                  │           │
│  │  [AI care recommendations]                           │           │
│  │                                                       │           │
│  │  ⚠️ DISCLAIMER: Not a substitute for professional   │           │
│  │     medical advice. Consult healthcare provider.     │           │
│  └─────────────────────────────────────────────────────┘           │
│                                                                       │
│  [Download Report] [New Diagnosis] [Back Home]                      │
└─────────────────────────────────────────────────────────────────────┘
```

## 🔧 Component Details

### React Frontend Components
```
src/
├── App.js                          # Main router
├── components/
│   ├── Navbar.js                   # Navigation header
│   └── ConnectionStatus.js         # LangFlow health monitor
├── pages/
│   ├── Home.js                     # Landing page
│   ├── DiagnosisWizard.js         # 3-step input form
│   ├── Results.js                  # Report display
│   └── About.js                    # Info page
└── services/
    └── langflowService.js          # API integration
```

### LangFlow Components (MED RAG.json)
```
Components in Flow:
├── ChatInput                       # Entry point
├── Python Interpreter              # Image preprocessing
├── Prompt Templates (6x)           # System prompts
│   ├── Vision System
│   ├── Vision JSON
│   ├── Symptom Parser
│   ├── Diagnosis Generator
│   ├── Medication Suggester
│   └── Final Report
├── OpenAI Models (6x)              # LLM instances
├── Embedding Model                 # For RAG
├── AstraDB                         # Vector store
├── Parser (Stringify mode)         # Document combiner
└── Output Nodes                    # Final results
```

## 📊 Data Flow Example

### Input (User submits):
```json
{
  "species": "Human",
  "age": "35",
  "symptoms": "Persistent dry cough, mild fever, fatigue",
  "severity": 6,
  "onset": "5 days ago",
  "medicalHistory": "Asthma",
  "image": null,
  "mode": "text"
}
```

### Processed by LangFlow:
```
1. ChatInput receives text
2. Symptom Parser extracts structured data
3. Embedding model vectorizes symptoms
4. AstraDB retrieves relevant medical knowledge
5. Parser combines retrieved documents
6. Diagnosis LLM analyzes with context
7. Medication LLM suggests treatments
8. Urgency LLM assigns triage level
9. Final Report LLM generates comprehensive analysis
```

### Output (React receives):
```json
{
  "report": "# Medical Analysis Report\n\n## Patient Information...",
  "urgency_json": {
    "triage_level": "YELLOW",
    "recommended_timeframe": "within 24-48 hours",
    "urgency_score": 60
  }
}
```

## 🔐 Security & Privacy

```
┌─────────────────────────────────────┐
│         Security Layers             │
├─────────────────────────────────────┤
│ 1. Local Development (Current)     │
│    - No authentication              │
│    - Localhost only                 │
│    - API keys in LangFlow config    │
│                                     │
│ 2. Production (Future)              │
│    - HTTPS only                     │
│    - Bearer token auth              │
│    - API key encryption             │
│    - Rate limiting                  │
│    - Input validation               │
│    - Audit logging                  │
└─────────────────────────────────────┘
```

## ⚡ Performance Metrics

```
Component                    Time
───────────────────────────────────
React UI Render              ~100ms
API Request (network)        ~50ms
LangFlow Orchestration       ~1s
Vision Analysis (if image)   ~5-10s
Symptom Extraction           ~3-5s
RAG Retrieval                ~2-3s
Diagnosis Generation         ~5-8s
Medication Suggestions       ~3-5s
Urgency Triage               ~2-4s
Final Report                 ~5-8s
Response Processing          ~100ms
UI Update                    ~50ms
───────────────────────────────────
TOTAL (Text Only)            ~15-30s
TOTAL (With Image)           ~25-45s
```

## 🎯 API Endpoints

```
GET  http://127.0.0.1:7860/health
     → Health check
     
POST http://127.0.0.1:7860/api/v1/run/{flow_id}
     → Execute flow
     
GET  http://127.0.0.1:7860/api/v1/flows
     → List all flows
```

## 📱 Supported Input Modes

```
┌────────────────────┬───────────────────────────┐
│ Mode               │ Features                  │
├────────────────────┼───────────────────────────┤
│ Text Only          │ - Symptom description     │
│                    │ - Patient metadata        │
│                    │ - Medical history         │
├────────────────────┼───────────────────────────┤
│ Image Only         │ - Visual analysis         │
│                    │ - Automated findings      │
│                    │ - Pattern recognition     │
├────────────────────┼───────────────────────────┤
│ Combined ★         │ - Best accuracy           │
│ (Recommended)      │ - Image + text context    │
│                    │ - Comprehensive analysis  │
└────────────────────┴───────────────────────────┘
```

## 🚀 Deployment Options

```
Option 1: Monolithic
┌──────────────────┐
│  Single Server   │
│  - LangFlow      │
│  - React Build   │
│  - Nginx         │
└──────────────────┘

Option 2: Microservices
┌─────────────┐    ┌─────────────┐
│  Frontend   │───▶│  LangFlow   │
│  (Vercel)   │    │  (AWS EC2)  │
└─────────────┘    └─────────────┘

Option 3: Serverless
┌─────────────┐    ┌──────────────┐
│  Frontend   │───▶│  LangFlow    │
│  (Netlify)  │    │  (Cloud Run) │
└─────────────┘    └──────────────┘
```

## 🎓 Technology Stack Summary

```
Frontend:
  React 18.3.1
  React Router v6
  Framer Motion 10.18.0
  Tailwind CSS 3.4.1
  Axios
  Lucide React (icons)

Backend:
  LangFlow 1.6.7
  Python 3.x
  FastAPI (internal)

AI/ML:
  OpenAI GPT-4o
  text-embedding-3-small/large
  gpt-4o-mini-vision

Vector Store:
  AstraDB (optional)

Build Tools:
  Create React App
  PostCSS
  Autoprefixer
```

---

**Complete system architecture for MedVet AI Diagnostic Platform** 🏥🤖
