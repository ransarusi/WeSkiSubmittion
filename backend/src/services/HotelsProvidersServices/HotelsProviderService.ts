import { Accommodation } from "../../models/IHotelsProviderResponse";
import { ISearchInput } from "../../models/ISearchInput";

export abstract class HotelsProviderService {
	abstract fetchHotels(searchInput: ISearchInput): Promise<Accommodation[]>;
}