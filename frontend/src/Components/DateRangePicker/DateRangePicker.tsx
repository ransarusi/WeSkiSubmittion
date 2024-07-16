import React from 'react'
import classes from './styles.module.scss';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

interface IDateRangePickerProps {
	onChange: (fromDate: string, toDate: string) => void;
}

export const DatePicker = (props: IDateRangePickerProps) => {

	const dateToString = (date: Date) => {
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	}

	return (<div className={classes.dateRangePickerContainer}>
		<LocalizationProvider dateAdapter={AdapterDayjs}>

			<DemoContainer components={['SingleInputDateRangeField']}>
				<DateRangePicker
					onChange={(datesRange) => {
						const [fromDate, toDate] = datesRange;
						if (fromDate && toDate) {
							props.onChange(dateToString(new Date(fromDate as any)), dateToString(new Date(toDate as any)));
						}
					}}
					slots={{ field: SingleInputDateRangeField }}
					name="allowedRange"
				/>
			</DemoContainer>
		</LocalizationProvider>
	</div>)
}