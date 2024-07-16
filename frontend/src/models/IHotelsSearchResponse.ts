import { Accommodation } from "./IHotelsProviderResponse";

export interface IHotelsSearchResponse {
	 groupSize: number;
	 rooms: Accommodation[];
}