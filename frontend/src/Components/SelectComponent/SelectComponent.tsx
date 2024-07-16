import React from 'react'
import classes from './styles.module.scss';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface ISelectComponentProps {
	value: any;
	options: {
		value: any;
		label: string;
	}[]
	handleChange: (event: SelectChangeEvent) => void;
}

export const SelectComponent = (props: ISelectComponentProps) => {
	return <Select
		labelId="demo-simple-select-label"
		id="demo-simple-select"
		value={props.value}
		label="Age"
		onChange={props.handleChange}
	>
		{props.options.map((option) => (
			<MenuItem key={option.value} value={option.value}>
				{option.label}
			</MenuItem>
		))}
	</Select>
}