import { Box, Typography } from '@mui/material'
import type { CountyDebt, StateDebt } from '../../services/household_debt_api'
import type { FC } from 'react'

interface DetailCardProps {
	data: StateDebt | CountyDebt | null
	mapType: string
}

const Index: FC<DetailCardProps> = ({ data, mapType }) => {
	if (!data) return null

	return (
		<Box
			sx={{
				mt: 2,
				p: 2,
				bgcolor: 'background.paper',
				borderRadius: 1,
				boxShadow: 1,
				borderLeft: '4px solid #60a5fa',
			}}
		>
			<Typography
				variant="subtitle1"
				sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}
			>
				{mapType} Detail
			</Typography>

			<Typography variant="body2" sx={{ mb: 0.5 }}>
				<strong>Average Debt Ratio:</strong>{' '}
				{data.average_debt?.toFixed(2) || 'N/A'}
			</Typography>

			{'number_of_counties' in data && (
				<Typography variant="body2" sx={{ mb: 0.5 }}>
					<strong>Total Counties:</strong> {data.number_of_counties}
				</Typography>
			)}

			<Typography variant="body2">
				<strong>FIPS Code:</strong> {data.fips_code}
			</Typography>
		</Box>
	)
}

export default Index
