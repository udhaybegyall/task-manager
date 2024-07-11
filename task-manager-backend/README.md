# Task Manager Backend API

This project is a RESTful API for a task management system built with Node.js, Express, and MongoDB. It provides endpoints for user authentication and task management.

## Table of Contents

1. System Design
2. Project Structure
3. Setup and Installation
4. API Endpoints
5. Authentication
6. Error Handling
7. Testing

## System Design

The application follows a typical MVC (Model-View-Controller) architecture, adapted for a RESTful API:

- Models: Represent the data structures (User and Task).
- Controllers: Handle the business logic (implemented within route handlers).
- Routes: Define the API endpoints and link them to controllers.

The system uses MongoDB as the database, with Mongoose as an ODM (Object-Document Mapper) to interact with it. Authentication is implemented using JSON Web Tokens (JWT).

## Key Components

1. Express Application: The core of the server, handling HTTP requests and responses.
2. MongoDB Database: Stores user and task data.
3. Authentication Middleware: Validates user tokens for protected routes.
4. Task Routes: Handle CRUD operations for tasks.
5. User Routes: Handle user registration and login.
6. Error Handling Middleware: Catches and formats error responses.

## Project Structure

The project is structured as follows:

```bash
src/
|-- server.ts              # Entry point of the application
|-- models/
|   |-- Task.ts            # Task model
|   |-- User.ts            # User model
|-- routes/
|   |-- tasks.ts           # Task routes
|   |-- auth.ts            # Authentication routes
|-- middleware/
|   |-- errorHandler.ts    # Error handling middleware
|   |-- validateTask.ts    # Task validation middleware
|   |-- auth.ts            # Authentication middleware
|-- __tests__/
|   |-- tasks.test.ts      # Task route tests

```

- `bash __tests__/`: Contains test files.
- middleware/: Custom middleware functions.
- models/: Mongoose models for database entities.
- routes/: API route definitions.
- server.ts: Main application file.

## Setup And Installation

1. clone the repository
2. Install dependencies using `npm install`
3. Set up the environment variables in a `.env` file

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run the server using `npm run dev`

## API Endpoints

### Authentication

- `POST api/auth/register`: Register a new user.
- `POST api/auth/login`: Log in an existing user.

### Tasks

- `GET api/tasks`: Get all tasks for the current user.
- `POST api/tasks`: Create a new task.
- `PUT api/tasks/:id`: Update a task by ID.
- `DELETE api/tasks/:id`: Delete a task by ID.

The API uses JWT for authentication. After successful login, the client receives a token which must be included in the Authorization header for protected routes:

```bash
Authorization: Bearer <token>
```

## Error Handling

The application uses a central error handling middleware (errorHandler.ts) to catch and format error responses. In production, detailed error information is omitted from the response.

## Testing

Tests are written using Jest and Supertest. They use an in-memory MongoDB server for isolation. To run tests:

```bash
npm run test
```
