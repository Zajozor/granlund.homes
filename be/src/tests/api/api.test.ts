// NOTE: Only Calvin should edit the expectations of these tests, as changes can break the application otherwise.
// There is no such thing as an insignificant API spec change.

import request from 'supertest';
import app from '../../index';
import {describe, expect, it} from '@jest/globals';

describe('Frontend needs these API specs to remain unchanged', () => {
  it('should return Hello, Hackathon!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, Hackathon!');
  });
});
