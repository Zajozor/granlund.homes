export type Property = {
  id: string;
  address: string;
  floors: number;
  image: Array<string>;
};

export type PropertyDetails = {
  property: Property;
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

export type RawItem = {
    id: string;
    xy_coordinates: {x: number, y: number, floor: number}
    condition_notes: string;
    image: string;
    created_at: string
    catalogue: {
        name: string
        serial_number: string
        manufacturer: string;
        category: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        other_data: any
    }
}

export type NewProperty = {
  address: string;
  images: string[]; // Assuming image is a base64-encoded string or a URL
};

export type CreatePropertyResponse = {
  property: Property;
};
