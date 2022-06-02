import { FindOptions } from 'sequelize/types';

import {
	IFindAndPaginateOptions,
	IFindAndPaginateResult,
} from '../commons/find-and-paginate.interface';
import { DeviceDto } from './device.dto';
import { Device } from './device.model';

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
