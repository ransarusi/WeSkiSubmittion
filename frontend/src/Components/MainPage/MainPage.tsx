import React, { useEffect, useState } from 'react'
import classes from './styles.module.scss';
import { IHotelsSearchResponse } from '../../models/IHotelsSearchResponse';
import { SearchResultsContainer } from '../SearchResultsContainer/SearchResultsContainer';
import { SearchBar } from '../SearchBar/SearchBar';
import { ISearchInput } from '../../models/ISearchInput';

interface IMainPageProps {

}

export const MainPage = (props: IMainPageProps) => {
	const [searchResults, setSearchResults] = useState<IHotelsSearchResponse[]>([]);
	const [resortName, setResortName] = useState<string | undefined>();
	const [searchInput, setSearchInput] = useState<ISearchInput | undefined>();

	const fetchSearchResults = async () => {
		const sseQueryString = `ski_site=${parseInt(searchInput!.resortId.toString(), 10)}&from_date=${searchInput!.fromDate}&to_date=${searchInput!.toDate}&group_size=${searchInput!.groupSize}`;
		const eventSource = new EventSource(`http://localhost:5000/search?${sseQueryString}`);

		eventSource.onmessage = function (event) {
			const data: IHotelsSearchResponse = JSON.parse(event.data);
			setSearchResults((prevResults) => [...prevResults, data]);
		};

		eventSource.onerror = function (err) {
			console.error('EventSource failed:', err);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}

	useEffect(() => {
		if (searchInput) {
			setSearchResults([]);
			fetchSearchResults();
		}
	}, [searchInput]);

	const handleSearchSubmit = (searchInput: ISearchInput, resortName: string) => {
		setSearchInput(searchInput);
		setResortName(resortName);
	}

	return (<div className={classes.mainPageContainer}>
		<SearchBar handleSearchSubmit={handleSearchSubmit} />
		{
			searchInput && <SearchResultsContainer searchInput={searchInput} resortName={resortName || ''} searchResults={searchResults} />
		}
	</div>)
}