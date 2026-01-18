import { Box, Typography } from '@mui/material'
import { useState, useMemo } from 'react'
import { scaleSequential } from 'd3-scale'
import { interpolateViridis } from 'd3-scale-chromatic'
import { useDebtData } from '../../hooks/useDebtData.ts'
import { useDebtSelection } from '../../hooks/useDebtSelection.ts'
import TimelineSlider from '../../components/TimelineSlider'
import DebtMap from '../../components/DebtMap'
import MapLegend from '../../components/MapLegend'
import SidebarControls from '../../components/SidebarControls'

const Home = () => {
	const [timeIndex, setTimeIndex] = useState<number>(104)
	const [mapType, setMapType] = useState<string>('State')

	const { dataMap } = useDebtData(timeIndex, mapType)

	const {
		selectedFips,
		currentSelectionData,
		staticData,
		handleRegionClick,
		handleDropdownSelect,
	} = useDebtSelection(timeIndex, mapType)

	const colorScale = useMemo(() => {
		const maxRatio = mapType === 'State' ? 2.1 : 3.0
		return scaleSequential()
			.domain([0.0, maxRatio])
			.interpolator(interpolateViridis)
	}, [mapType])

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			sx={{ height: '93vh',        // Force full viewport height
				width: '95vw',         // Force full viewport width
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',
				boxSizing: 'border-box' }}
		>
			<Typography align="center" variant="h3" mt="1rem">
				Household Debt Visualizer
			</Typography>

			<Box sx={{ width: '80%', maxWidth: '50rem', mt: '.5rem' }}>
				<TimelineSlider value={timeIndex} onChange={setTimeIndex} />
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', md: 'row' },
					width: '100%',
					maxWidth: '75.9rem',
					gap: 4,
					alignItems: 'flex-start',
					mt: 4,
				}}
			>
				<Box sx={{ flexGrow: 1, width: '58rem' }}>
					<DebtMap
						mapType={mapType}
						dataMap={dataMap}
						selectedFips={selectedFips}
						onRegionSelect={handleRegionClick}
						colorScale={colorScale}
					/>
					<MapLegend scale={colorScale} />
				</Box>

				<Box sx={{ width: '20rem' }}>
					<SidebarControls
						mapType={mapType}
						onMapTypeChange={setMapType}
						states={staticData.states}
						counties={staticData.counties}
						onSelectionChange={handleDropdownSelect}
						detailData={currentSelectionData}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default Home
