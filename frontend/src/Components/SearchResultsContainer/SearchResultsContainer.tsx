import React, { useMemo } from 'react'
import classes from './styles.module.scss';
import { IHotelsSearchResponse } from '../../models/IHotelsSearchResponse';
import { ISearchInput } from '../../models/ISearchInput';
import { AccommodationCard } from './AccommodationCard/AccommodationCard';
import { Accommodation } from '../../models/IHotelsProviderResponse';

interface ISearchResultsContainerProps {
	resortName: string;
	searchInput: ISearchInput;
	searchResults: IHotelsSearchResponse[];
}

export const SearchResultsContainer = (props: ISearchResultsContainerProps) => {
	const sortedSearchResults: IHotelsSearchResponse[] = useMemo(() => {
		return props.searchResults.sort((a, b) => a.groupSize - b.groupSize);
	}, [props.searchResults]);

	const allRooms: Accommodation[] = useMemo(() => {
		return sortedSearchResults.map((result) => result.rooms).flat();
	}, [sortedSearchResults]);

	return (<div className={classes.searchResultsContainerContainer}>
		<p className={classes.mainHeader}>Select your ski trip</p>
		<div className={classes.secondaryHeader}>
			<p className={classes.secondaryText}>{allRooms.length} ski trips options</p>
			<p className={classes.secondaryText}>{props.resortName}</p>
			<p className={classes.secondaryText}>{props.searchInput.fromDate} - {props.searchInput.toDate}</p>
			<p className={classes.secondaryText}>{props.searchInput.groupSize} people</p>
		</div>
		{
			sortedSearchResults.map((result, index) => (
				result.rooms.map((room, index) => (
					<AccommodationCard accomodation={room} resortName={props.resortName} key={index} />
				))
			))
		}
	</div>)
}