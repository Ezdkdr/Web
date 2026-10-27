# Cybersecurity Awareness Training (SPA)

A React-based Single Page Application for cybersecurity awareness training, designed for small businesses in Canada.
Up-to-date
## Features
- **Interactive Training Modules**: 8 sections covering phishing, passwords, Canadian privacy laws, and more.
- **Knowledge Checks**: Real-time feedback quizzes with toggleable answers.
- **Progress Tracking**: Persists progress locally so users can resume later.
- **Final Assessment**: Graded quiz with pass/fail logic (80% threshold).
- **Completion Certificate**: specific printable certificate upon passing.
- **Incident Reporting**: Mock simulation of reporting a security incident.
- **Responsive Design**: Works on Desktop, Tablet, and Mobile.
- **Accessibility**: Semantic HTML and keyboard navigation.

## Tech Stack
- Frontend: React + TypeScript (Vite)
- Styling: Tailwind CSS
- State: React Context + LocalStorage
- Backend: Node.js (proxied via Express for local dev, Vercel-ready)

## Project Structure
- `src/components`: UI components (Layout, Training sections)
- `src/data`: Static content definitions
- `src/store`: Context provider for progress state
- `api/`: Serverless function handlers

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   Start both the frontend (Vite) and backend (API) servers concurrently:
   ```bash
   npm run dev
   ```
   - App: [http://localhost:5173](http://localhost:5173)
   - API: [http://localhost:3000](http://localhost:3000)

3. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment
This project is configured for serverless deployment (e.g., Vercel).
- The `api/` folder contains serverless function handlers.
- The `dist/` folder contains the built frontend assets.

## License
MIT
