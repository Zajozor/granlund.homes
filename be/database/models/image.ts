// models/Image.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Item from './item';

class Image extends Model {
  public uid!: string;
  public items_id!: string;
  public url!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Image.init(
  {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    items_id: {
      type: DataTypes.STRING,
      references: {
        model: Item,
        key: 'uid',
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Image;
