import * as withPagination from 'sequelize-cursor-pagination';
import { Column, Model, Table, DataType, Index } from 'sequelize-typescript';

@Table({
	modelName: 'device',
	tableName: 'devices',
	underscored: true,
	timestamps: true,
	version: true,
})
export class Device extends Model<Device> {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV1,
		comment: 'The identifier for the device record.',
	})
	id: string;

	@Column({
		type: DataType.STRING,
		comment: 'The device name.',
	})
	name: string;

	@Column({
		type: DataType.BOOLEAN,
		comment: 'The device verification status.',
		defaultValue: false,
	})
	isVerified: boolean;

	@Column({
		type: DataType.BOOLEAN,
		comment: 'The device active status.',
		defaultValue: false,
	})
	isActive: boolean;
}

withPagination({
	methodName: 'findAndPaginate',
	primaryKeyField: 'id',
})(Device);