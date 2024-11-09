// api.ts
import { Property, PropertyDetails, Items, Item, NewProperty, CreatePropertyResponse } from '../types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Define TypeScript types for response objects

export async function getHello(): Promise<string> {
  const response = await axios.get<string>(`${API_BASE_URL}/`);
  return response.data;
}

export async function getProperties(): Promise<Property[]> {
  const response = await axios.get<Property[]>(`${API_BASE_URL}/properties`);
  return response.data;
};

export async function getProperty(id: string | number): Promise<PropertyDetails> {
  const response = await axios.get<PropertyDetails>(`${API_BASE_URL}/properties:${id}`);
  // Convert installationDate strings to Date objects
  for (const category in response.data.items) {
    // eslint-disable-next-line no-prototype-builtins
    if (response.data.items.hasOwnProperty(category)) {
      const itemsArray = response.data.items[category as keyof Items];
      itemsArray.forEach((item: Item) => {
        item.installationDate = new Date(item.installationDate);
      });
    }
  }
  return response.data;
};

export async function createProperty(newProperty: NewProperty): Promise<CreatePropertyResponse> {
  const response = await axios.post<CreatePropertyResponse>(`${API_BASE_URL}/properties/create`, newProperty);
  return response.data;
};
