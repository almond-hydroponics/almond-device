import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestMicroservice, LoggerService } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function main() {
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

	app.useLogger(app.get<Logger, LoggerService>(Logger));

	return app.listen();
}

main();
