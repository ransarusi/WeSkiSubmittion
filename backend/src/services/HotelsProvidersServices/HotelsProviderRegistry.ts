import { ISearchInput } from "../../models/ISearchInput";
import { HotelsProviderService } from "./HotelsProviderService";
import { flatten } from "lodash";

export class HotelsProviderRegistry {
	providers: HotelsProviderService[];

	constructor() {
		this.providers = [];
	}

	addProvider(provider: HotelsProviderService) {
		if (!(provider instanceof HotelsProviderService)) {
			throw new Error("Provider must be an instance of HotelsProvider.");
		}
		this.providers.push(provider);
	}

	removeProvider(provider: HotelsProviderService) {
		this.providers = this.providers.filter(p => p !== provider);
	}

	async fetchHotelsFromAllProviders(searchInput: ISearchInput) {
		const promises = await this.providers.map(provider => provider.fetchHotels(searchInput));
		const responses = await Promise.all(promises);
		return flatten(responses);
	}
}
