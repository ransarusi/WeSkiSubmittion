export type Image = {
	URL: string;
	MainImage?: string;
};

export type Accommodation = {
	HotelCode: string;
	HotelName: string;
	HotelDescriptiveContent: {
		Images: Image[];
	};
	HotelInfo: {
		Position: {
			Latitude: string;
			Longitude: string;
			Distances: {
				type: string;
				distance: string;
			}[];
		};
		Rating: string;
		Beds: string;
	};
	PricesInfo: {
		AmountAfterTax: string;
		AmountBeforeTax: string;
	};
};

export type IHotelsProviderSearchResponse = {
	statusCode: number;
	body: {
		success: string;
		accommodations: Accommodation[];
	};
};