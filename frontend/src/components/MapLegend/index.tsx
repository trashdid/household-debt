import { Box, Typography } from '@mui/material'

const MapLegend = ({ scale }: { scale: any }) => {
	const [min, max] = scale.domain()

	const gradient = `linear-gradient(to right, 
    ${scale(min)}, 
    ${scale(min + (max - min) * 0.25)}, 
    ${scale(min + (max - min) * 0.5)}, 
    ${scale(min + (max - min) * 0.75)}, 
    ${scale(max)}
  )`

	return (
		<Box
			sx={{
				width: 200,
				position: 'absolute',
				bottom: 20,
				right: 20,
				bgcolor: 'rgba(255,255,255,0.8)',
				p: 1,
				borderRadius: 1,
				boxShadow: 1,
			}}
		>
			<Typography
				variant="caption"
				sx={{
					display: 'block',
					mb: 0.5,
					fontWeight: 'bold',
				}}
			>
				Avg Household Debt Ratio
			</Typography>
			<Box
				sx={{
					height: 10,
					width: '100%',
					background: gradient,
					borderRadius: 5,
				}}
			/>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					mt: 0.5,
				}}
			>
				<Typography variant="caption">{min.toFixed(1)}</Typography>
				<Typography variant="caption">{max.toFixed(1)}</Typography>
			</Box>
		</Box>
	)
}

export default MapLegend
