# Task Tracker Application

A full-stack Task Tracker application built with **ASP.NET Core Web API** and **React**. The application supports role-based task management for Team Leads and Developers, including task creation, assignment, review, dashboards, reports, notifications, and authentication.

## Tech Stack

### Backend
- .NET 8 / ASP.NET Core Web API
- C#
- Dapper
- Microsoft SQL Server
- JWT Authentication
- Swagger / OpenAPI

### Frontend
- React 19
- Vite
- JavaScript
- Axios
- React Router
- Lucide React

## Project Structure

```text
Task-Tracker-App/
├── backend/
│   └── TaskTrackerApplication/
│       ├── Controllers/
│       ├── Data/
│       ├── Interfaces/
│       ├── Models/
│       ├── Repositories/
│       ├── Services/
│       ├── Program.cs
│       └── appsettings.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Features

- User authentication with JWT
- Role-based access for Team Leads and Developers
- Create and assign tasks
- View and manage personal tasks
- Task details and status tracking
- Task review workflow
- Team Lead and Developer dashboards
- Reports
- Notifications
- User profile management
- RESTful API architecture
- SQL Server data access using Dapper

## Application Flow

```text
React Frontend
      ↓
    Axios
      ↓
ASP.NET Core Web API
      ↓
   Services
      ↓
 Repositories
      ↓
    Dapper
      ↓
 SQL Server
```

The frontend communicates with the backend through REST API endpoints. Controllers receive requests and delegate business operations to services. Services use repositories for database access through Dapper.

## Getting Started

### 1. Backend

Open the backend project in Visual Studio or another .NET-compatible IDE.

```bash
cd backend/TaskTrackerApplication
 dotnet restore
 dotnet run
```

The API exposes Swagger in the development environment.

### 2. Database

Create the required SQL Server database and tables/stored procedures used by the application. Configure the connection string in your local development configuration.

**Do not commit real database credentials or JWT secrets to GitHub.** Use environment-specific configuration or user secrets for sensitive values.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Configure the backend URL using the Vite environment variable:

```env
VITE_API_BASE_URL=https://localhost:44351/api
```

## Configuration

Sensitive configuration should be supplied locally and should not be committed to source control.

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "<your-sql-server-connection-string>"
  },
  "Jwt": {
    "Key": "<your-jwt-secret>"
  }
}
```

## Security

This repository intentionally excludes generated files and secrets. Before deploying the application:

- Use a strong, private JWT signing key.
- Store database credentials securely.
- Never commit passwords, API keys, or connection strings containing credentials.
- Use HTTPS in production.
- Configure CORS for trusted frontend origins only.

## Development Notes

The repository is organized into separate backend and frontend applications so that each layer can be developed and deployed independently.

Generated folders such as `node_modules`, `bin`, `obj`, `dist`, and Visual Studio temporary files are excluded through `.gitignore`.

## License

This project is provided for learning and development purposes.
