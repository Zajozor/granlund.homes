// import 'db/associations'; // Set db runtime associations
import sequelize from 'db/database'; // Import your database instance
import {Catalogue} from 'db/models';
import Item from 'db/models/item';
import Property from 'db/models/property';
import Issue from 'db/models/issue';
import Image from 'db/models/image';
import Employee from 'db/models/employee';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Sequelize Models Test with In-Memory Database', () => {
  test('should create and fetch Catalogue with Items', async () => {
    // Create a Catalogue entry
    const catalogue = await Catalogue.create({
      uid: 'cat001',
      serial_number: 'SN001',
      description: 'Test Catalogue',
      manufacturer: 'Test Manufacturer',
      url: 'http://example.com/item',
    });

    // Create an Item linked to the Catalogue
    const item = await Item.create({
      uid: 'item001',
      property_id: 'prop001',
      coordinates: '45.1234, -75.1234',
      catalogue_uid: catalogue.uid,
    });

    // Fetch and verify the data
    const fetchedCatalogue = await Catalogue.findOne({
      where: { uid: 'cat001' },
      include: Item,
    });

    expect(fetchedCatalogue).not.toBeNull();
    expect(fetchedCatalogue?.serial_number).toBe('SN001');
    expect(fetchedCatalogue?.items?.[0]?.uid).toBe('item001');
  });

  test('should create and fetch Property with Items', async () => {
    const property = await Property.create({
      uid: 'prop001',
      address: '123 Main St',
    });

    const item = await Item.create({
      uid: 'item002',
      property_id: property.uid,
      coordinates: '40.7128, -74.0060',
      catalogue_uid: 'cat001', // assuming this exists
    });

    const fetchedProperty = await Property.findOne({
      where: { uid: 'prop001' },
      include: Item,
    });

    expect(fetchedProperty).not.toBeNull();
    expect(fetchedProperty?.address).toBe('123 Main St');
    expect(fetchedProperty?.items?.[0]?.uid).toBe('item002');
  });

  test('should create and fetch Employee with Issues', async () => {
    const employee = await Employee.create({
      uid: 'emp001',
      name: 'John Doe',
    });

    const issue = await Issue.create({
      uid: 'issue001',
      items_id: 'item001',
      status: 'open',
      description: 'Test issue',
      owner: employee.uid,
    });

    const fetchedEmployee = await Employee.findOne({
      where: { uid: 'emp001' },
      include: Issue,
    });

    expect(fetchedEmployee).not.toBeNull();
    expect(fetchedEmployee?.name).toBe('John Doe');
    expect(fetchedEmployee?.issues?.[0]?.uid).toBe('issue001');
  });

  test('should create and fetch Item with Image', async () => {
    const image = await Image.create({
      uid: 'img001',
      items_id: 'item001',
      url: 'http://example.com/image.png',
    });

    const fetchedItem = await Item.findOne({
      where: { uid: 'item001' },
      include: Image,
    });

    expect(fetchedItem).not.toBeNull();
    expect(fetchedItem?.images?.[0]?.uid).toBe('img001');
  });
});
