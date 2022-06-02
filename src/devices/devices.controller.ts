import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import Aigle from 'aigle';
import { isEmpty, isNil } from 'lodash';
import { PinoLogger } from 'nestjs-pino';

import { ICount, IQuery } from '../commons/commons.interface';
import { IFindPayload } from '../commons/cursor-pagination.interface';
import { DeviceDto } from './device.dto';
import { Device } from './device.model';
import { IDevicesService } from './devices.interface';

const { map } = Aigle;

@Controller()
export class DevicesController {
	constructor(
		@Inject('DevicesService')
		private readonly service: IDevicesService,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(DevicesController.name);
	}

	@GrpcMethod('DevicesService', 'find')
	async find(query: IQuery): Promise<IFindPayload<Device>> {
		this.logger.info('DevicesController#findAll.call %o', query);

		const { edges, pageInfo, totalCount } = await this.service.find({
			attributes: !isEmpty(query.select)
				? ['id'].concat(query.select)
				: undefined,
			where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
			order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
			limit: !isNil(query.limit) ? query.limit : 25,
			before: !isEmpty(query.before) ? query.before : undefined,
			after: !isEmpty(query.after) ? query.after : undefined,
		});

		const result: IFindPayload<Device> = {
			totalCount,
			edges,
			pageInfo,
		};

		this.logger.info('DevicesController#findAll.result %o', result);

		return result;
	}

	@GrpcMethod('DevicesService', 'findById')
	async findById({ id }): Promise<Device> {
		this.logger.info('UsersController#findById.call %o', id);

		const result: Device = await this.service.findById(id);

		this.logger.info('DevicesController#findById.result %o', result);

		if (isEmpty(result)) throw new Error('Device record not found.');

		return result;
	}

	@GrpcMethod('DevicesService', 'findOne')
	async findOne(query: IQuery): Promise<Device> {
		this.logger.info('DevicesController#findOne.call %o', query);

		const result: Device = await this.service.findOne({
			attributes: !isEmpty(query.select) ? query.select : undefined,
			where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
		});

		this.logger.info('DevicesController#findOne.result %o', result);

		if (isEmpty(result)) throw new Error('Device record not found.');

		return result;
	}

	@GrpcMethod('DevicesService', 'count')
	async count(query: IQuery): Promise<ICount> {
		this.logger.info('DevicesController#count.call %o', query);

		const count: number = await this.service.count({
			where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
		});

		this.logger.info('DevicesController#count.result %o', count);

		return { count };
	}

	@GrpcMethod('DevicesService', 'create')
	async create(data: DeviceDto): Promise<Device> {
		this.logger.info('DevicesController#create.call %o', data);

		if (isEmpty(data))
			throw new Error('Data is empty. Cannot create at this time.');

		const result: Device = await this.service.create(data);

		this.logger.info('DevicesController#create.result %o', result);

		return result;
	}

	@GrpcMethod('DevicesService', 'update')
	async update({ id, data }): Promise<Device> {
		this.logger.info('DevicesController#update.call %o %o', id, data);

		const result: Device = await this.service.update(id, data);

		this.logger.info('DevicesController#update.result %o', result);

		return result;
	}

	@GrpcMethod('DevicesService', 'destroy')
	async destroy(query: IQuery): Promise<ICount> {
		this.logger.info('DevicesController#destroy.call %o', query);

		const count: number = await this.service.destroy({
			where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
		});

		this.logger.info('DevicesController#destroy.result %o', count);

		return { count };
	}
}
