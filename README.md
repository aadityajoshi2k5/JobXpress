# JobXpress

JobXpress is an AI-powered interview preparation tool. Users can create an account, provide a job description and resume or self-description, and receive a personalized interview strategy with questions, model answers, skill gaps, a preparation roadmap, and a match score.

## Features

- User registration, login, logout, and session recovery with HTTP-only cookies
- Resume upload and job-description analysis
- AI-generated technical and behavioral interview questions
- Skill-gap analysis and match score
- Day-by-day preparation roadmap
- Tailored resume PDF generation
- Saved interview reports for each user

## Tech Stack

- **Frontend:** React 19, React Router, Vite, Sass, Axios
- **Backend:** Node.js, Express, MongoDB/Mongoose
- **AI:** Google Gemini through `@google/genai`
- **Document processing:** `pdf-parse` and Puppeteer

## Project Structure

```text
JobXpress/
├── Backend/
│   ├── server.js
│   └── src/
│       ├── config/          # Database connection
│       ├── controllers/     # Request handlers
│       ├── middlewares/     # Authentication and file upload
│       ├── models/          # Mongoose schemas
│       ├── routes/          # API routes
│       └── services/        # Gemini and PDF generation
├── Frontend/
│   └── src/
│       ├── features/auth/       # Authentication flow
│       └── features/interview/  # Report generation and views
└── README.md
```

## Prerequisites

- Node.js 20 or later
- MongoDB database
- Google Gemini API key

## Environment Variables

Create `Backend/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

Do not commit `.env` files or API keys.

## Installation

Install dependencies in both applications:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

## Running Locally

Open two terminals from the repository root.

Start the backend:

```bash
cd Backend
npm run dev
```

The API runs at `http://localhost:3000`.

Start the frontend:

```bash
cd Frontend
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

The backend CORS configuration and frontend API services currently expect these default ports.

## Available Scripts

### Backend

- `npm run dev` - Start the Express server with Nodemon

### Frontend

- `npm run dev` - Start the Vite development server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run Oxlint

## API Overview

### Authentication

- `POST /api/auth/register` - Create a user account
- `POST /api/auth/login` - Log in and set the auth cookie
- `GET /api/auth/logout` - Log out and clear the auth cookie
- `GET /api/auth/get-me` - Get the current authenticated user

### Interviews

These endpoints require authentication:

- `POST /api/interview` - Generate an interview report using multipart form data with `resume`, `selfDescription`, and `jobDescription`
- `GET /api/interview` - List the current user's reports
- `GET /api/interview/:interviewId` - Retrieve one report
- `POST /api/interview/resume/pdf/:interviewReportId` - Generate a tailored resume PDF

Resume uploads are held in memory and limited to 3 MB by the backend.

## Typical User Flow

1. Register or log in.
2. Enter a target job description.
3. Upload a resume or provide a self-description.
4. Generate an interview strategy.
5. Review technical questions, behavioral questions, skill gaps, and the preparation roadmap.
6. Download the generated resume PDF when needed.

## Notes

- Authentication uses cookies, so the frontend and backend must run on the configured local origins.
- AI requests require a valid Gemini API key and may take several seconds to complete.
- The backend parses uploaded resumes as PDF content before sending the information to the AI service.
