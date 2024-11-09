// models/Employee.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class Employee extends Model {
  public uid!: string;
  public name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Employee.init(
  {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'employees',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Employee;
