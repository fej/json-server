import {Data} from "./service.js";
import * as fs from 'fs';

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
}