// models/Item.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Catalogue from './catalogue';
import Property from './property';

class Item extends Model {
  public uid!: string;
  public property_id!: string;
  public coordinates!: string;
  public catalogue_uid!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Item.init(
  {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    property_id: {
      type: DataTypes.STRING,
      references: {
        model: Property,
        key: 'uid',
      },
    },
    coordinates: DataTypes.STRING,
    catalogue_uid: {
      type: DataTypes.STRING,
      references: {
        model: Catalogue,
        key: 'uid',
      },
    },
  },
  {
    sequelize,
    tableName: 'items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Item;
