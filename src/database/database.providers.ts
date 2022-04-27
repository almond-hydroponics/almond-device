import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { PinoLogger } from 'nestjs-pino';
import { DEVELOPMENT, PRODUCTION, TEST } from './database.constants';
import { databaseConfig } from './database.config';
import { Device } from '../devices/device.model';

export const DatabaseProvider: Provider[] = [
	{
		provide: 'SEQUELIZE',
		useFactory: async (logger: PinoLogger) => {
			logger.setContext('Sequelize');

			let config;
			switch (process.env.NODE_ENV as any) {
				case DEVELOPMENT:
					config = databaseConfig.development;
					break;
				case TEST:
					config = databaseConfig.test;
					break;
				case PRODUCTION:
					config = databaseConfig.production;
					break;
				default:
					config = databaseConfig.development;
			}

			const db: Sequelize = new Sequelize({
				...config,
				logging: logger.info.bind(logger),
				benchmark: true,
				timezone: '+03:00',
				define: {
					underscored: true,
				},
				retry: {
					max: 3,
				},
			});

			db.addModels([Device]);

			await db.sync();

			return db;
		},
		inject: [PinoLogger],
	},
];