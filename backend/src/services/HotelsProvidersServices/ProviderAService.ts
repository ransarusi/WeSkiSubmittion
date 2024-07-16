import { ISearchInput } from "../../models/ISearchInput";
import axios from 'axios';
import { HotelsProviderService } from "./HotelsProviderService";

export class ProviderAService extends HotelsProviderService {
	async fetchHotels(searchInput: ISearchInput) {
		const { ski_site, group_size, from_date, to_date } = searchInput;
		const { data } = await axios.post(`https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator`, {
			query: {
				ski_site: parseInt(ski_site.toString()),
				group_size,
				from_date,
				to_date
			}
		});
		if (!data.body.accommodations) {
			console.error('No accommodations found');
			return [];
		}
		return data.body.accommodations;
	}
}
