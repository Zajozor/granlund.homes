export type Property = {
  id: string;
  address: string;
};

export type PropertyDetails = {
  property: {
    id: string;
    address: string;
    image?: string;
  };
  items: Items;
};

export type Items = {
  electric: Item[];
  hvac: Item[];
  plumbing: Item[];
  utilities: Item[];
  structural: Item[];
  appliances: Item[];
  landscaping: Item[];
  security: Item[];
  other: Item[];
};

export type Item = {
  uid: string;
  coordinates: string;
  name: string;
  installationDate: Date;
  serialNumber: string;
};

export type NewProperty = {
  address: string;
  image: File | null; // Assuming image is a base64-encoded string or a URL
};

export type CreatePropertyResponse = {
  property: Property;
};
