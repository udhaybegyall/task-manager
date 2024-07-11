# Task Manager

This project is a task manager application built with Next.js, TypeScript, and Tailwind CSS. It includes both the frontend and backend code.

<div align="center">
<p>To read the documentaion and structure of both the backend and frontend see the following readme files:</p>
<p><a href="https://github.com/udhaybegyall/task-manager/blob/main/task-manager-backend/README.md">task-manager-backend readme</a></p>
<p><a href="https://github.com/udhaybegyall/task-manager/blob/main/task-manager-frontend/README.md">task-manager-frontend readme</a></p>

</div>

## Directory Structure

The project has the following directory structure:

```bash
task-manager
└── task-manager-backend
└── task-manager-frontend
```

## Setup Instructions

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/udhaybegyall/task-manager.git
```

2. Navigate to the task-manager directory:

```bash
cd task-manager
```

3. Install the dependencies for both task-manager-backend and task-manager-frontend:

```bash
cd task-manager-backend
npm install
cd ../task-manager-frontend
npm install
```

4. Create a .env file at the root of task-manager-backend directory and add the following variables:

```bash
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

Replace <your_mongodb_uri> with the MongoDB connection string and <your_jwt_secret> with a secret key for JWT authentication.

5. you can Now start the backend server:

```bash
cd task-manager-backend
npm run dev
```

## Now let's focus on the frontend

1. create a .env.local file in the task-manager-frontend directory and add the following variables:

```bash
AUTH_SECRET=<replace_with_a_random_string_of_32_characters>
NEXTAUTH_SECRET=<replace_with_a_random_string_of_32_characters>
NEXTAUTH_URL=http://localhost:3000
```

2. Start the frontend development server:

```bash
cd ../task-manager-frontend
npm run dev
```

The application should now be running at http://localhost:3000.

# Testing

To run the tests for the backend, navigate to the task-manager-backend directory and run:

```bash
npm run test
```

This will run the Jest tests using the MongoDB in-memory server.
