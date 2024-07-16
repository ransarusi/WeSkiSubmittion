import React from 'react'
import classes from './styles.module.scss';
import { times } from 'lodash';
import { default as starIcon } from '../../../assets/star.svg';
import { default as locationIcon } from '../../../assets/location.svg';
import { Accommodation, Image } from '../../../models/IHotelsProviderResponse';

interface IAccommodationCardProps {
	resortName: string;
	accomodation: Accommodation;
}

export const AccommodationCard = (props: IAccommodationCardProps) => {
	const hotelRating: number = parseInt(props.accomodation.HotelInfo.Rating);
	const hotelMainImage: Image | undefined = props.accomodation.HotelDescriptiveContent.Images.find((image) => image.MainImage);
	return (<div className={classes.accommodationCardContainer}>
		{hotelMainImage && <img src={hotelMainImage.URL} className={classes.hotelImage} alt={hotelMainImage.URL} />}
		<div className={classes.accomodationDetailsContainer}>
			<p className={classes.hotelName}>{props.accomodation.HotelName}</p>
			<div className={classes.starsRate}>
				{times(hotelRating).map((_, index) => (
					<img src={starIcon} alt='star' key={index} />
				))}
			</div>
			<div className={classes.locationContainer}>
				<img src={locationIcon} alt='location' className={classes.locationIcon} />
				<p className={classes.location}>{props.resortName}</p>
			</div>
		</div>
	</div>)
}
