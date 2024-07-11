import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { app } from '../server';
import jwt from 'jsonwebtoken';

let mongoServer: MongoMemoryServer;
let authToken: string;
let userId: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.disconnect(); // Disconnect from any existing connection
  await mongoose.connect(mongoUri);

  // Register a test user
  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

  // Login the test user
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password123' });

  authToken = loginRes.body.token;

  // Decode the token to get the userId
  const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as { userId: string };
  userId = decoded.userId;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Task',
        description: 'Test Description',
        status: 'To Do',
        user: userId
      });
    
    if (res.statusCode !== 201) {
      console.error('Task creation failed. Response:', res.body);
    }
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toEqual('Test Task');
  });

  it('should get all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});