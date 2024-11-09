// models/Property.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class Property extends Model {
  public uid!: string;
  public address!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Property.init(
  {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'properties',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Property;
