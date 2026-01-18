import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { toTitleCase } from '../../utils/helpers'
import type {
	State,
	CountyExtended,
	StateDebt,
	CountyDebt,
} from '../../services/household_debt_api'
import DetailCard from '../DetailCard'

interface SidebarControlsProps {
	mapType: string
	onMapTypeChange: (type: string) => void
	states: State[]
	counties: CountyExtended[]
	onSelectionChange: (item: State | CountyExtended | null) => void
	detailData: StateDebt | CountyDebt | null
}

const SidebarControls: React.FC<SidebarControlsProps> = ({
	mapType,
	onMapTypeChange,
	states,
	counties,
	onSelectionChange,
	detailData,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				padding: '.5rem',
			}}
		>
			<Typography variant="h6">Filters</Typography>

			<Autocomplete
				options={['State', 'County']}
				value={mapType}
				disableClearable
				onChange={(_event, newValue) => {
					if (newValue) onMapTypeChange(newValue)
				}}
				renderInput={(params) => (
					<TextField {...params} label="Select Map View" />
				)}
			/>

			{mapType === 'State' ? (
				<Autocomplete
					options={states}
					getOptionLabel={(option) => toTitleCase(option.name)}
					onChange={(_event, newValue) => onSelectionChange(newValue)}
					renderInput={(params) => (
						<TextField {...params} label="Search States" />
					)}
				/>
			) : (
				<Autocomplete
					options={counties}
					getOptionLabel={(option) =>
						`${toTitleCase(option.name)}, ${option.state_code}`
					}
					onChange={(_event, newValue) => onSelectionChange(newValue)}
					renderInput={(params) => (
						<TextField {...params} label="Search Counties" />
					)}
				/>
			)}

			<DetailCard data={detailData} mapType={mapType} />
		</Box>
	)
}

export default SidebarControls
