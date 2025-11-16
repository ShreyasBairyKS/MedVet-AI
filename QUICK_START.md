# 🚀 Quick Start Guide - MedVet AI System

## ⚡ 5-Minute Setup

### 1️⃣ Start LangFlow (Terminal 1)
```powershell
langflow run --port 7860
```
✅ Wait for: "Running on http://127.0.0.1:7860"

### 2️⃣ Load Flow
1. Open: http://127.0.0.1:7860
2. Click: **Import** button
3. Select: `MED RAG.json`
4. Enter OpenAI API key in any OpenAI component

### 3️⃣ Start React App (Terminal 2)
```powershell
cd medvet-ui
npm start
```
✅ Opens automatically: http://localhost:3000

### 4️⃣ Verify
- Green badge top-right = ✅ Connected
- Click "Start Diagnosis"
- Submit test case
- See AI report!

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `MED RAG.json` | LangFlow AI workflow |
| `medvet-ui/src/services/langflowService.js` | API integration |
| `medvet-ui/src/pages/DiagnosisWizard.js` | Input form |
| `medvet-ui/src/pages/Results.js` | Report display |
| `LANGFLOW_SETUP.md` | Detailed setup guide |
| `LAUNCH_CHECKLIST.md` | Testing checklist |

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Red badge | `langflow run --port 7860` |
| 404 Error | Load `MED RAG.json` in LangFlow |
| API Error | Add OpenAI key in LangFlow |
| Timeout | Wait longer, complex analysis |

---

## 🎯 Test Cases

### Quick Test
```
Mode: Text
Species: Human
Age: 30
Symptoms: "Headache, fatigue"
Severity: 4
```

### Emergency Test
```
Mode: Text
Species: Human
Age: 65
Symptoms: "Chest pain, shortness of breath"
Severity: 9
```

---

## 📊 What You Built

✅ AI-powered medical diagnosis UI
✅ LangFlow backend integration
✅ Multi-modal input (text + images)
✅ RAG knowledge retrieval
✅ Urgency triage system
✅ Real-time connection monitoring
✅ Beautiful gradient animations
✅ 4-page responsive website

---

## 🔗 URLs

- LangFlow: http://127.0.0.1:7860
- React App: http://localhost:3000
- Health Check: http://127.0.0.1:7860/health

---

## 📚 Documentation

1. **LANGFLOW_SETUP.md** - Complete setup instructions
2. **INTEGRATION_SUMMARY.md** - Technical implementation details
3. **LAUNCH_CHECKLIST.md** - Testing checklist
4. **SYSTEM_ARCHITECTURE.md** - Architecture diagrams
5. **README.md** - Project overview

---

## 🎉 You're Ready!

**Start diagnosing with AI! 🏥🤖**

Questions? Check the docs or review code comments.
