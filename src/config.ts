import {Data} from "./service.js";
import * as fs from 'fs';

export type PaginationMap = {
	_sort?: string
	_start?: string
	_end?: string
	_limit?: string
	_page?: string
	_per_page?: string
}

export class Config {
	private configData?: Data;

	constructor(configFile?: string) {
		if(configFile && fs.existsSync(configFile)) {
			const rawData: string = fs.readFileSync(configFile, 'utf-8');
			this.configData = JSON.parse(rawData);
		}
	}

	public getId(collection: string): string {
		if(this.configData && this.configData[collection]) {
			return this.configData[collection]!.id;
		}
		return 'id';
	}

	public getOutput(collection: string): string | null {
		return null;
	}

	public getPagination(collection: string): PaginationMap {
		if(this.configData) {
			if (this.configData[collection] && this.configData[collection]!.paginationMap && Object.keys(this.configData[collection]!.paginationMap).length > 0) {
				return this.configData[collection]!.paginationMap as PaginationMap;
			} else if(this.configData['global']?.paginationMap && Object.keys(this.configData['global']!.paginationMap).length > 0) {
				return this.configData['global'].paginationMap as PaginationMap
			}
		}

		return {
			_sort: "_sort",
			_start: "_start",
			_end: "_end",
			_limit: "_limit",
			_page: "_page",
			_per_page: "_per_page"
		} as PaginationMap;
	}

	public getSearch(collection: string): string | null {
		return null;
	}

	public getRoutes(collection: string): string | null {
		return null;
	}
}