// models/associations.ts
import Catalogue from './models/catalogue';
import Item from './models/item';
import Property from './models/property';
import Issue from './models/issue';
import Image from './models/image';
import Employee from './models/employee';

// Define associations here
Catalogue.hasMany(Item, { foreignKey: 'catalogue_uid' });
Item.belongsTo(Catalogue, { foreignKey: 'catalogue_uid' });

Property.hasMany(Item, { foreignKey: 'property_id' });
Item.belongsTo(Property, { foreignKey: 'property_id' });

Item.hasMany(Issue, { foreignKey: 'items_id' });
Issue.belongsTo(Item, { foreignKey: 'items_id' });

Item.hasOne(Image, { foreignKey: 'items_id' });
Image.belongsTo(Item, { foreignKey: 'items_id' });

Employee.hasMany(Issue, { foreignKey: 'owner' });
Issue.belongsTo(Employee, { foreignKey: 'owner' });

export { Catalogue, Item, Property, Issue, Image, Employee };
