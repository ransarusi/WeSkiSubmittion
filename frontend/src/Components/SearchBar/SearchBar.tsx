import React, { useEffect, useMemo, useState } from 'react'
import classes from './styles.module.scss';
import { default as weSkiIcon } from '../../assets/weski.png';
import { SelectComponent } from '../SelectComponent/SelectComponent';
import { ISearchInput } from '../../models/ISearchInput';
import { Button, SelectChangeEvent } from '@mui/material';
import { DatePicker } from '../DateRangePicker/DateRangePicker';
import { times } from 'lodash';
import axios from 'axios';

interface ISearchBarProps {
	handleSearchSubmit: (searchInput: ISearchInput, resortName: string) => void;
}

export const SearchBar = (props: ISearchBarProps) => {
	const [ resorts, setResorts ] = useState<{ id: number, name: string }[]>([]);
	const [ searchInput, setSearchInput ] = useState<Partial<ISearchInput>>({});

	const handleSearchChange = (key: keyof ISearchInput, value: string) => {
		setSearchInput((prevSearchInput) => ({ ...prevSearchInput, [key]: value }));
	}

	const onDateChange = (fromDate: string, toDate: string) => {
		setSearchInput((prevSearchInput) => ({ ...prevSearchInput, fromDate, toDate }));
	}

	const fetchResorts = async () => {
		const resortsResponse = await axios.get('http://localhost:5000/resorts');
		const resorts = resortsResponse.data;
		setResorts(resorts);
	}

	useEffect(() => {
		fetchResorts();
	}, []);

	const groupSizeOptions = times(10, (index) => ({ value: index + 1, label: `${index + 1} people` }));
	const resortOptions = useMemo(() => {
		return resorts.map((resort) => ({ value: resort.id, label: resort.name }));
	}, [resorts]);

	if (!resorts.length) {
		return <p>Loading Resorts...</p>
	}
	const resortName: string | undefined = resorts.find((resort) => resort.id === searchInput['resortId'])?.name;

	return (<div className={classes.searchBarContainer}>
		<img src={weSkiIcon} alt='We Ski' className={classes.logo} />
		<SelectComponent options={resortOptions} value={searchInput['resortId']} handleChange={(event: SelectChangeEvent) => handleSearchChange('resortId', event.target.value)} />
		<SelectComponent options={groupSizeOptions} value={searchInput['groupSize']} handleChange={(event: SelectChangeEvent) => handleSearchChange('groupSize', event.target.value)} />
		<DatePicker onChange={onDateChange}/>
		<Button
			disabled = {Object.keys(searchInput).length < 4}
			onClick={() => props.handleSearchSubmit(searchInput as ISearchInput, resortName || '')}
		>Search</Button>
	</div>)
}