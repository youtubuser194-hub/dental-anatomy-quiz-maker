# 🦷 DentoQuest — Dental Anatomy & INBDE Board Suite

> **Final Project Submission** — *Ship Your AI App*  
> **Author:** Syeda  
> **Institution:** Dow University of Health Sciences, Karachi  
> **Course:** Batch 2 (3:30 PM - 5:00 PM)  
> **Date:** July 2026  

---

## 🔗 Live Application & GitHub Repository

* **🚀 Deployed Live App:** [https://ais-pre-3vc3ps2x72j3gmirulz7wo-188103614025.asia-east1.run.app](https://ais-pre-3vc3ps2x72j3gmirulz7wo-188103614025.asia-east1.run.app)
* **💻 GitHub Repository:** `https://github.com/syeda/dentoquest` *(Replace with your public GitHub link)*

---

## 📌 Executive Summary & Problem Statement

### **What is DentoQuest?**
**DentoQuest** is a complete, full-stack, AI-powered study platform designed specifically for dental students preparing for clinical practice and board examinations (INBDE / NBDHE). It integrates interactive 2D anatomical cross-sections, a Universal & FDI tooth numbering atlas, spaced-repetition flashcards, a manual assessment creator, and a custom **Gemini AI Assessment Engine**.

### **The Real Problem Solved**
Dental students at institutions like **Dow University of Health Sciences** face immense cognitive overload when learning dental anatomy, tooth morphology, histology, and clinical board cases:
1. **Multi-Notation Confusion:** Memorizing 32 permanent teeth across **Universal (#1-32)**, **FDI World Notation (#11-48)**, and **Palmer Notation**, alongside primary dentition (A-T).
2. **Complex Micro-Anatomy & Canal Variations:** Understanding 3D internal canal anatomy (e.g., MB2 canals in maxillary first molars, C-shaped canals in mandibular molars) from static textbook images.
3. **Board Vignette Practice Shortage:** Standard question banks are rigid and lack instant, personalized AI tutoring when a student picks an incorrect option during study sessions.

**DentoQuest solves this by providing interactive visual plates, instantaneous multi-system tooth mapping, and an on-demand AI tutor powered by Google Gemini.**

---

## 🌟 Key Features

| Feature Module | Description |
| :--- | :--- |
| **Interactive Micro-Anatomy Atlas** | 2D vector cross-section (Reference Plate 1.1) detailing Enamel, Dentin, Pulp Chamber & Root Canals, Cementum, Periodontal Ligament (PDL), and Alveolar Bone with histological breakdown. |
| **Spotter Identification Mode** | Speed-test game mode where students are challenged to spot specific anatomical tissues under timed pressure with score tracking and streaks. |
| **Universal & FDI Arch Atlas** | Interactive 32-tooth Maxillary and Mandibular arch layout with instant toggling between **Universal**, **FDI**, and **Palmer** systems, displaying cusp count, root count, canal variations, and board pearls. |
| **Gemini AI Quiz Generator** | On-demand generation of board-style multiple-choice questions and clinical vignettes tailored to specific dental topics (e.g., *Cusp of Carabelli*, *Dentinoenamel Junction*, *Maxillary 1st Molar MB2*). |
| **AI Clinical Rationale Tutor** | Deep-dive AI explanations for missed questions detailing key anatomical principles, option-by-option rationale, board mnemonics, and endodontic/restorative clinical tips. |
| **Spaced Repetition Flashcards** | 3D card flipping with Web Speech API audio pronunciation, mastery counters (*Mastered* vs *Needs Review*), and instant explanation reveals. |
| **Manual Assessment Builder** | Custom quiz deck creation studio with JSON export/import functionality to share study decks with classmates. |
| **Timed Board Exam Mode** | Real exam simulation with countdown timers, question navigation matrix, instant scoring, and detailed result review. |

---

## 🤖 The AI Feature & Prompt Architecture

DentoQuest features two dedicated server-side AI endpoints powered by **Google Gemini 2.5 Flash** using the official `@google/genai` TypeScript SDK.

### **1. AI Quiz Deck Generator (`/api/generate-quiz`)**
Generates structured, high-yield board review questions tailored to a specific dental topic, target difficulty level, and question count.

```typescript
// System Instruction
const SYSTEM_INSTRUCTION = `You are an expert Professor of Dental Anatomy, Histology, and Board Exam Prep (INBDE/NBDHE). Provide rigorous, accurate, high-yield questions with clean JSON formatting.`;

// Dynamic Prompt Assembly
const prompt = `Generate a high-yield dental anatomy quiz with exactly ${count} questions.
Topic: "${topic}"
Target Level / Difficulty: "${difficulty}"
Format Style: "${questionType}"

Make sure questions test core dental concepts such as:
- Tooth morphology (cusps, grooves, roots, pulp chambers, ridges, embrasures)
- Tooth numbering systems (Universal Numbering System #1-32, FDI World Dental Federation notation #11-48, Primary letters A-T)
- Tooth histology and embryology (Enamel, Dentin, Pulp, Cementum, Dentinoenamel Junction, Periodontal Ligament, Alveolar Bone)
- Clinical dental scenarios (caries depth, pulpitis, eruption ages, occlusal relationships)

Each question MUST include:
1. Clear, precise question text.
2. 4 plausible multiple choice options (A, B, C, D).
3. The exact 0-based index of the correct answer (0, 1, 2, or 3).
4. Detailed high-yield anatomical explanation explaining why the correct option is right and why others are wrong.
5. Anatomical focus term (e.g. "Cusp of Carabelli", "Mandibular First Molar", "Periodontal Ligament", "Universal Tooth #14").
6. A quick clinical mnemonic or practical tip.`;
```

### **2. AI Clinical Tutor & Rationale Breakdown (`/api/ai-explain`)**
Provides personalized feedback when a student answers a question incorrectly or seeks deeper clinical context.

```typescript
// System Instruction
const TUTOR_SYSTEM_INSTRUCTION = `You are an encouraging, world-class Dental Anatomy & Board Review AI Tutor. Format response in concise Markdown with bullet points and bold highlights.`;

// Prompt Structure
const prompt = `A dental student is practicing a quiz question on "${topic}".
Question: "${question}"
Student Answer: "${userAnswer}"
Correct Answer: "${correctAnswer}"
Anatomical Focus: "${anatomicalFocus}"

Provide an engaging, highly educational breakdown for a dental student:
1. Key Anatomical Principles: Explain the fundamental anatomy involved.
2. Why "${correctAnswer}" is correct.
3. Analysis of the mistake if the student answered differently.
4. High-Yield Board Exam Mnemonic or Visual Memory Trick.
5. Clinical Relevance in Dental Practice (e.g., cavity prep, root canal location, occlusion).`;
```

---

## 🛠️ Tech Stack & Services Used

* **Frontend Framework:** React 18 + TypeScript + Vite
* **Design System:** Custom Editorial Typography (`Playfair Display` + `Plus Jakarta Sans`) & Tailwind CSS
* **Animations:** Framer Motion (`motion/react`)
* **Icons:** Lucide React (`lucide-react`)
* **Backend Server:** Node.js + Express.js (Full-stack architecture with Vite SSR Middleware)
* **AI Engine:** Google Gemini 2.5 Flash (`gemini-3.6-flash` model via `@google/genai` SDK)
* **Audio Engine:** Web Speech API (`SpeechSynthesis`) for anatomical term pronunciation
* **Data Serialization:** JSON export/import for custom quiz decks

---

## 📸 Screenshots of DentoQuest in Action

### **1. Micro-Anatomy Interactive Atlas & Spotter Mode**
![Anatomical Tooth Diagram](https://raw.githubusercontent.com/syeda/dentoquest/main/assets/screenshot-anatomy.png)
*Interactive cross-section of maxillary incisor crown & root apparatus showing enamel, dentin, pulp, cementum, PDL, and alveolar bone with Spotter speed test overlay.*

### **2. Universal & FDI Dental Arch Numbering Atlas**
![Dental Arch Chart](https://raw.githubusercontent.com/syeda/dentoquest/main/assets/screenshot-arch.png)
*Full 32-tooth maxillary and mandibular arch grid with instant notation toggling (#1-32 Universal, #11-48 FDI, Palmer) and tooth inspector panel.*

### **3. Gemini AI Quiz Generator & Rationale Engine**
![AI Quiz Generator](https://raw.githubusercontent.com/syeda/dentoquest/main/assets/screenshot-ai.png)
*Gemini AI quiz generator modal creating tailored board-style clinical vignettes with detailed anatomical rationales and mnemonics.*

---

## ⚙️ How to Run the Project Locally

### **Prerequisites**
* Node.js v18.0.0 or higher
* npm v9.0.0 or higher
* A Google Gemini API Key ([Get a key from Google AI Studio](https://aistudio.google.com/))

### **1. Clone the Repository**
```bash
git clone https://github.com/syeda/dentoquest.git
cd dentoquest
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the root directory (based on `.env.example`):
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### **4. Run Development Server**
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### **5. Build for Production**
```bash
npm run build
npm start
```

---

## 🎓 Academic Acknowledgments

Developed by **Syeda** for the **Dow University of Health Sciences (DUHS)** AI Web Applications Course (Batch 2). Special thanks to course instructors and peers for feedback during development.

*Built with passion for dental education and AI technology.*
