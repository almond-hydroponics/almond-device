import { IsString, IsBoolean, Length } from 'class-validator';

export class DeviceDto {
	readonly id?: string;

	@IsString()
	@Length(7, 7)
	readonly name?: string;

	@IsString()
	readonly user?: string;

	@IsBoolean()
	readonly verified?: boolean;

	@IsBoolean()
	readonly active?: boolean;

	readonly createdAt?: string;
	readonly updatedAt?: string;
	readonly version?: number;
}
