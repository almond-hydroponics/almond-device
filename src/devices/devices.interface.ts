import { FindOptions } from 'sequelize/types';

import { Device } from './device.model';
import { DeviceDto } from './device.dto';
import {
	IFindAndPaginateOptions,
	IFindAndPaginateResult,
} from '../commons/find-and-paginate.interface';

export interface IDevicesService {
	find(
		query?: IFindAndPaginateOptions,
	): Promise<IFindAndPaginateResult<Device>>;
	findById(id: string): Promise<Device>;
	findOne(query?: FindOptions): Promise<Device>;
	count(query?: FindOptions): Promise<number>;
	create(user: DeviceDto): Promise<Device>;
	update(id: string, user: DeviceDto): Promise<Device>;
	destroy(query?: FindOptions): Promise<number>;
}
