import request from 'supertest';
import app from '../index';
import {describe, expect, test} from '@jest/globals';

describe('GET /', () => {
  it('should return Hello, Hackathon!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, Hackathon!');
  });
});
