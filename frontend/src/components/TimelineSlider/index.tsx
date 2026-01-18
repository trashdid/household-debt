import { Box, Slider, Typography } from '@mui/material'
import { type FC } from 'react'
import { getQuarterLabel } from '../../utils/helpers'

interface TimelineSliderProps {
	value: number
	onChange: (newValue: number) => void
}

const marks = [
	{ value: 0, label: '1999' },
	{ value: 24, label: '2005' },
	{ value: 44, label: '2010' },
	{ value: 64, label: '2015' },
	{ value: 84, label: '2020' },
	{ value: 104, label: '2025' },
]

const TimelineSlider: FC<TimelineSliderProps> = ({ value, onChange }) => {
	const handleChange = (_event: Event, newValue: number | number[]) => {
		onChange(newValue as number)
	}

	return (
		<Box sx={{ width: '100%', px: 4 }}>
			<Typography id="time-slider-label" gutterBottom align="center">
				Data Period: <strong>{getQuarterLabel(value)}</strong>
			</Typography>
			<Slider
				value={value}
				min={0}
				max={104}
				step={1}
				marks={marks}
				onChange={handleChange}
				valueLabelDisplay="auto"
				valueLabelFormat={getQuarterLabel}
				aria-labelledby="time-slider-label"
			/>
		</Box>
	)
}

export default TimelineSlider
