import { ISearchInput } from "../../models/ISearchInput";
import axios from 'axios';
import { HotelsProviderService } from "./HotelsProviderService";

export class ProviderAService extends HotelsProviderService {
	async fetchHotels(searchInput: ISearchInput) {
		// Implement here the second provider logic
		return [];
	}
}