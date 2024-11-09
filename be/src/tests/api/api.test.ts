// NOTE: Only Calvin should edit the expectations of these tests, as changes can break the application otherwise.
// There is no such thing as an insignificant API spec change.

import request from 'supertest';
import app from '../../index';
import { describe, expect, it } from '@jest/globals';
import newPropertyImage from './data/create-property.jpeg'

describe('Frontend needs these API specs to remain unchanged', () => {
  it('should return Hello, Hackathon!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, Hackathon!');
  });
  it('should get a list of properties', async () => {
    const response = await request(app).get('/properties');
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe(Array);
    response.body.forEach((property: any) => {
      expect(property).toHaveProperty('id');
      expect(property).toHaveProperty('address');
    });
  });
  it('One property', async () => {
    const response = await request(app).get('/properties:1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(['property', 'items']);

    expect(typeof response.body.property.id).toBe(String);
    expect(typeof response.body.property.address).toBe(String);
    expect(typeof response.body.property.image).toBeDefined();
    
    expect(response.body.items).toHaveProperty(['electric', 'hvac', 'plumbing', 'utilities', 'structural', 'appliances', 'landscaping', 'security', 'other']);
    expect(typeof response.body.items.electric[0]).toHaveProperty(['coordinates','name', 'installationDate', 'serialNumber']);
    expect(typeof response.body.items.electric[0].coordinates).toBe(String);
    expect(typeof response.body.items.electric[0].name).toBe(String);
    expect(typeof response.body.items.electric[0].serialNumber).toBe(String);
    expect(typeof response.body.items.electric[0].installationDate).toBe(Date);
  });
  it('Create a property', async () => {
    const newProperty = {
      address: '1234 Elm St',
      image: newPropertyImage
    };
    const response = await request(app).post('/properties/create').send(newProperty);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
