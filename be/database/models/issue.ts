// models/Issue.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Item from './item';
import Employee from './employee';

class Issue extends Model {
  public uid!: string;
  public items_id!: string;
  public status!: 'open' | 'in_progress' | 'closed';
  public description!: string;
  public owner!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Issue.init(
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
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'closed'),
      allowNull: false,
    },
    description: DataTypes.STRING,
    owner: {
      type: DataTypes.STRING,
      references: {
        model: Employee,
        key: 'uid',
      },
    },
  },
  {
    sequelize,
    tableName: 'issues',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Issue;
