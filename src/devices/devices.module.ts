import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from 'nestjs-pino';

import { Device } from './device.model';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

@Module({
	imports: [LoggerModule],
	providers: [
		{ provide: 'DevicesService', useClass: DevicesService },
		{ provide: 'DevicesRepository', useValue: Device },
	],
	controllers: [DevicesController],
})
export class DevicesModule {}
