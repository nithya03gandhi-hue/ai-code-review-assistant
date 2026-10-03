# AI Code Review Assistant

Paste your code and get instant, structured feedback on bugs, security issues, performance and style, with suggested fixes.

## Tech Stack
- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- AI: Groq API (openai/gpt-oss-120b)

## How it works
React UI -> POST /api/review -> Express server -> Groq LLM -> formatted review

## Getting Started
1. Clone the repo
2. Backend: cd backend, npm install, create .env with GROQ_API_KEY and PORT=5000, then npm run dev
3. Frontend: cd frontend, npm install, npm run dev
4. Open http://localhost:5173

## Roadmap
- [ ] Syntax highlighting
- [ ] Language selector
- [ ] Live deployment
