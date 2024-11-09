import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../database'; // Ensure this is correct

console.log('sequelize', sequelize);

class Catalogue extends Model<InferAttributes<Catalogue>, InferCreationAttributes<Catalogue>> {
	public uid!: string;
	public serial_number!: string;
	public description!: string | null;
	public manufacturer!: string | null;
	public url!: string | null;
	public readonly created_at!: CreationOptional<Date>;
	public readonly updated_at!: CreationOptional<Date>;
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
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
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
