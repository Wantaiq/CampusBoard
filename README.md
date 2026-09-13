# CampusBoard

> _A full-stack project that allows students to collaborate on group projects.
> Built on a learning journey primarily to experiment, explore, and learn feature-based architecture, separation of concerns and code organization._

## Tech Stack

### Backend

- Express
- PostgreSQL
- Rest API

### Frontend

- React
- React Router
- Context API

## Architecture

> _The main idea is organizing the application code around domain-oriented modules, or feature-based architecture, and provide encapsulation, separation of concerns and easily extendable functionality_

### Backend

```text
/backend
  ├── src/
    ├── config/          # Environment variables centralized
    ├── middleware/      # Auth, error handling, validation...
    ├── modules/         # Entity or feature based modules
      ├── *.controller   # Http layer
      ├── *.schema       # Schemas for request validation
      ├── *.repository   # Database query handlers
      ├── *.service      # Enforces logic and orchestrates repositories
      ├── *.routes       # Module route definitions
    ├── shared/          # Helper functions and error classes
  └── app.js
```

### Frontend

```text
/frontend
  ├── src/
    ├── components/      # Reusable shared components
    ├── features/        # Features
      ├── components/    # Feature related components
      ├── context/       # Feature related context and reducer
      ├── hooks/         # Feature related logic encapsulation in hooks
      ├── pages/         # Feature related pages
    ├── layouts/         # App based layouts
    ├── pages/           # App based pages
    ├── routes/          # Route definitions and composition
    ├── utils/           # App based utilities, i.e. fetch wrapper
  └── main.jsx           # Entry point
```

## Learning outcomes

> _One of the main things I learned are trade-offs.
> Separating code can make a codebase easier to navigate and maintain, but it also introduces additional layer of abstraction. In some cases additional layer may not be necessary._

## Installation & Setup

### 1. Requirements

- Node.js
- PostgreSQL
- npm

### 2. Clone and Navigate

Clone repository.

### 3. Configure environments

Create a environment file from provided example in both frontend and backend.

```bash
cp .env.example .env.development
```

Update .env.development with your own local values.
Do not commit .env.development or any other files containing secrets.

### 4. Start backend development

```bash
# Navigate to backend
cd backend
# Install dependencies
npm install
# Start server
npm run start:dev
```

The server will start on **http://localhost:3000**

### 5. Start frontend development

```bash
# Navigate to frontend
cd frontend
# Install dependencies
npm install
# Start server
npm run dev
```

This will start frontend on **http://localhost:5173**
