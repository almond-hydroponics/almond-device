import { join } from 'path';

import { INestMicroservice, LoggerService } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { ExceptionFilter } from './_helpers';
import { AppModule } from './app.module';

(async function main() {
	const app: INestMicroservice =
		await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
			transport: Transport.GRPC,
			options: {
				url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
				package: 'device',
				protoPath: join(__dirname, './_proto/device.proto'),
				loader: {
					keepCase: true,
					enums: String,
					oneofs: true,
					arrays: true,
				},
			},
		});

	app.useGlobalFilters(new ExceptionFilter());
	app.useLogger(app.get<Logger, LoggerService>(Logger));

	return app.listen();
})();
