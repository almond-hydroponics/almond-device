import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isEmpty } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { FindOptions } from 'sequelize/types';

import {
	IFindAndPaginateOptions,
	IFindAndPaginateResult,
} from '../commons/find-and-paginate.interface';
import { DeviceDto } from './device.dto';
import { Device } from './device.model';
import { IDevicesService } from './devices.interface';

@Injectable()
export class DevicesService implements IDevicesService {
	constructor(
		@Inject('DevicesRepository') private readonly repo: typeof Device,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(DevicesService.name);
	}

	async find(
		query?: IFindAndPaginateOptions,
	): Promise<IFindAndPaginateResult<Device>> {
		this.logger.info('DevicesService#findAll.call %o', query);

		const result: IFindAndPaginateResult<Device> =
			// @ts-expect-error ignore error for now
			await this.repo.findAndPaginate({
				...query,
				raw: true,
				paranoid: false,
			});

		this.logger.info('DevicesService#findAll.result %o', result);

		return result;
	}

	async findById(id: string): Promise<Device> {
		this.logger.info('DevicesService#findById.call %o', id);

		const result: Device = await this.repo.findByPk(id, {
			raw: true,
		});

		this.logger.info('DevicesService#findById.result %o', result);

		return result;
	}

	async findOne(query: FindOptions): Promise<Device> {
		this.logger.info('DevicesService#findOne.call %o', query);

		const result: Device = await this.repo.findOne({
			...query,
			raw: true,
		});

		this.logger.info('DevicesService#findOne.result %o', result);

		return result;
	}

	async count(query?: FindOptions): Promise<number> {
		this.logger.info('DevicesService#count.call %o', query);

		const result: number = await this.repo.count(query);

		this.logger.info('DevicesService#count.result %o', result);

		return result;
	}

	async create(user: DeviceDto): Promise<Device> {
		this.logger.info('DevicesService#create.call %o', user);

		const result: Device = await this.repo.create(user);

		this.logger.info('DevicesService#create.result %o', result);

		return result;
	}

	async update(id: string, user: DeviceDto): Promise<Device> {
		this.logger.info('DevicesService#update.call %o', user);

		const record: Device = await this.repo.findByPk(id);

		if (isEmpty(record)) throw new Error('Device record not found.');

		const result: Device = await record.update(user);

		this.logger.info('DevicesService#update.result %o', result);

		return result;
	}

	async destroy(query?: FindOptions): Promise<number> {
		this.logger.info('DevicesService#destroy.call %o', query);

		const result: number = await this.repo.destroy(query);

		this.logger.info('DevicesService#destroy.result %o', result);

		return result;
	}
}
