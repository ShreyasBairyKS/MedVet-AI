# Medical Knowledge Base

## Purpose
Store medical and veterinary reference documents here for RAG (Retrieval Augmented Generation) to enhance diagnosis accuracy.

## What to Include

### Medical References:
- Clinical guidelines (e.g., WHO, CDC guidelines)
- Common diagnosis patterns
- Symptom-condition mappings
- Treatment protocols

### Veterinary References:
- Veterinary diagnosis guides
- Species-specific medical information
- Common pet conditions and treatments

### Image Analysis References:
- ISIC (International Skin Imaging Collaboration) summaries
- Radiology interpretation guides
- Visual diagnosis patterns

## File Formats Supported:
- PDF documents
- Text files (.txt)
- Markdown files (.md)
- CSV files (structured data)

## Usage:
These files will be:
1. Loaded by the DocumentLoader component
2. Embedded using OpenAI embeddings
3. Stored in the vector database (Chroma)
4. Retrieved during diagnosis to provide context

## Sample Files to Add:
- `common_dog_conditions.pdf`
- `human_dermatology_guide.pdf`
- `emergency_triage_guidelines.txt`
- `medication_safety_protocols.pdf`
