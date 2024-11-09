import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class Catalogue extends Model {
  public uid!: string;
  public serial_number!: string;
  public description!: string;
  public manufacturer!: string;
  public url!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Catalogue.init(
  {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    serial_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'catalogues',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Catalogue;
