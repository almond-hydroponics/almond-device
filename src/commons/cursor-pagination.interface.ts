export interface IEdge<T> {
	node: T;
	cursor: string;
}

export interface IPageInfo {
	startCursor: string;
	endCursor: string;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface IFindPayload<T> {
	totalCount: number;
	edges: IEdge<T>[];
	pageInfo: IPageInfo;
}
