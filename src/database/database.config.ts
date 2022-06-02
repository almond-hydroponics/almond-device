import * as dotenv from 'dotenv';

import { IDatabaseConfig } from './database.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
	development: {
		dialect: 'postgres',
		database: process.env.DB_DATABASE || 'almond',
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT || '5432', 10),
	},
	test: {
		dialect: 'postgres',
		database: process.env.DB_DATABASE || 'almond',
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT || '5432', 10),
	},
	production: {
		dialect: 'postgres',
		database: process.env.DB_DATABASE,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10),
	},
};
