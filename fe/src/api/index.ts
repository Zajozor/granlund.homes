// api.ts
import { Property, PropertyDetails, Items, Item, NewProperty, CreatePropertyResponse } from '../types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Set default axios configuration
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Define TypeScript types for response objects

export async function getHello(): Promise<string> {
  try {
    const response = await axios.get<string>(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello:', error);
    throw error;
  }
}

export async function getProperties(): Promise<Property[]> {
  try {
    const response = await axios.get<Property[]>(`${API_BASE_URL}/properties`);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}

export async function getProperty(id: string | number): Promise<PropertyDetails> {
  try {
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
  } catch (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    throw error;
  }
}

export async function createProperty(newProperty: NewProperty): Promise<CreatePropertyResponse> {
  try {
    const response = await axios.post<CreatePropertyResponse>(`${API_BASE_URL}/properties/create`, newProperty);
    return response.data;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
}
