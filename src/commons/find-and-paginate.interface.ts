import { FindAttributeOptions, WhereOptions } from 'sequelize/types';

import { IEdge, IPageInfo } from './cursor-pagination.interface';

export interface IFindAndPaginateOptions {
	attributes: FindAttributeOptions;
	where: WhereOptions;
	order: string[];
	limit: number;
	before: string;
	after: string;
}

export interface ICursor {
	before: string;
	after: string;
	hasNext: boolean;
	hasPrevious: boolean;
}

export interface IFindAndPaginateResult<T> {
	totalCount: number;
	edges: IEdge<T>[];
	pageInfo: IPageInfo;
}
