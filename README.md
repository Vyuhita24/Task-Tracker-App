# Task Tracker Application

A full-stack task management application with a React frontend and ASP.NET Core Web API backend.

## Architecture

```text
React (Vite)
    |
    | HTTP / JSON + JWT Bearer token
    v
ASP.NET Core Web API
    |
    v
Services -> Repositories -> Dapper
    |
    v
SQL Server
```

## Features

- JWT-based login and protected routes
- Role-aware dashboards for team leads and developers
- Task creation and assignment
- Personal task tracking and task details
- Task progress updates
- Comments and task history
- Task review / approval workflow
- Notifications
- Reports
- User profile
- File attachments
- Swagger/OpenAPI for backend API exploration

## Project structure

```text
Task-Tracker-App/
├── backend/       # ASP.NET Core Web API (.NET 8)
└── frontend/      # React + Vite
```

## Technology stack

### Backend
- C# / .NET 8
- ASP.NET Core Web API
- Dapper
- SQL Server
- JWT authentication
- Swagger / OpenAPI

### Frontend
- React
- Vite
- React Router
- Axios
- Lucide React

## Running locally

### 1. Backend

Open `backend/TaskTrackerApplication.sln` in Visual Studio or run:

```bash
dotnet restore
dotnet run
```

Configure the database connection and JWT key locally. **Do not commit real credentials or signing keys.**

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

If your API is not running at the default local URL, create a `.env` file from `.env.example` and set:

```text
VITE_API_BASE_URL=https://localhost:44351/api
```

## Security note

Secrets from the original local configuration were deliberately removed before preparing this repository. If those credentials are real and have ever been shared outside the intended environment, rotate the database password and JWT signing key.

## Status

This repository is a cleaned source-control version of the Task Tracker application. Build artifacts, IDE metadata, dependencies, generated frontend output, and local secrets are excluded from Git.
