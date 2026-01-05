import {
	Autocomplete,
	Box,
	Slider,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
	CountyDebt,
	Debt,
	State,
	StateDebt,
} from '../../services/household_debt_api'
import { api } from '../../services/api.ts'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { toTitleCase } from '../../utils/helpers.ts'
import { scaleSequential } from 'd3-scale'
import { interpolateViridis } from 'd3-scale-chromatic'
import MapLegend from '../../components/MapLegend'

const MAP_LAYERS = {
	State: '/data/states-10m.json',
	County: '/data/counties-10m.json',
}

const Home = () => {
	const [states, setStates] = useState<State[]>([])
	const [currentState, setCurrentState] = useState<State | null>(null)
	const [timeIndex, setTimeIndex] = useState<number>(104)
	const [data, setData] = useState<Debt[]>([])
	const [heatmapData, setHeatmapData] = useState<StateDebt[] | CountyDebt[]>(
		[]
	)
	const [currentStateDebt, setCurrentStateDebt] = useState<
		StateDebt | CountyDebt | null
	>(null)
	const [hoveredState, setHoveredState] = useState<string | null>(null)
	const [mapType, setMapType] = useState<string>('State')

	const geoUrl = MAP_LAYERS[mapType as keyof typeof MAP_LAYERS]
	const sliderMarks = [
		{ value: 0, label: '1999' },
		{ value: 24, label: '2005' },
		{ value: 44, label: '2010' },
		{ value: 64, label: '2015' },
		{ value: 84, label: '2020' },
		{ value: 104, label: '2025' },
	]
	const colorScale = useMemo(() => {
		return scaleSequential()
			.domain([0.5, 2.5]) // The min and max debt ratios
			.interpolator(interpolateViridis)
	}, [])

	const getQuarterLabel = (index: number) => {
		const startYear = 1999
		const year = startYear + Math.floor(index / 4)
		const quarter = (index % 4) + 1
		return `${year}-Q${quarter}`
	}

	const getQuarterDates = (index: number) => {
		const startYear = 1999
		const year = startYear + Math.floor(index / 4)
		const quarterMonth = (index % 4) * 3

		const startDate = new Date(year, quarterMonth, 1)
			.toISOString()
			.split('T')[0]
		const endDate = new Date(year, quarterMonth + 3, 0)
			.toISOString()
			.split('T')[0]

		return { startDate, endDate }
	}

	const handleSliderChange = (_event: Event, newValue: number | number[]) => {
		setTimeIndex(newValue as number)
		console.log('Selected Period:', getQuarterLabel(newValue as number))
	}

	const handleSliderCommitted = (
		_event: React.SyntheticEvent | Event,
		newValue: number | number[]
	) => {
		const index = newValue as number
		const { startDate, endDate } = getQuarterDates(index)

		console.log('-----------------------------------------')
		console.log(`FETCH INITIATED: ${getQuarterLabel(index)}`)
		console.log(`Parameters: startDate: ${startDate}, endDate: ${endDate}`)
		console.log('-----------------------------------------')

		api.debts
			.getDebtsDebtsGet({
				startDate: startDate,
				endDate: endDate,
			})
			.then((response) => setData(response.data))
			.finally(() => console.log(data))
	}

	useEffect(() => {
		const loadData = async () => {
			try {
				const response = await api.states.getStatesStatesGet()
				const sortedStates = response.data.sort((a, b) =>
					a.name.localeCompare(b.name)
				)
				setStates(sortedStates)
			} catch (error) {
				console.error('Failed to fetch states', error)
			}
		}
		loadData()
	}, [])

	useEffect(() => {
		const fetchHeatmapData = async () => {
			const { startDate, endDate } = getQuarterDates(timeIndex)
			try {
				let response
				if (mapType === 'County') {
					response = await api.debts.getCountiesDebtDebtsCountiesGet({
						startDate,
						endDate,
					})
				} else {
					response = await api.debts.getStatesDebtDebtsStatesGet({
						startDate,
						endDate,
					})
				}
				setHeatmapData(response.data)
			} catch (error) {
				console.error('Failed to fetch heatmap data', error)
			}
		}

		fetchHeatmapData()
	}, [timeIndex, mapType])

	const statesDataMap = useMemo(() => {
		return new Map(heatmapData.map((item) => [item.fips_code, item]))
	}, [heatmapData])

	const handleMouseDown = useCallback(
		async (geo: any) => {
			const { startDate, endDate } = getQuarterDates(timeIndex)
			if (mapType === 'County') {
				const fipsCode = geo.id.toString().padStart(5, '0')
				try {
					const response =
						await api.debts.getCountyDebtDebtsCountiesFipsCodeGet({
							fipsCode,
							startDate,
							endDate,
						})
					setCurrentStateDebt(response.data)
				} catch (error) {
					console.error('County fetch failed', error)
				}
			} else {
				const stateName = geo.properties.name
				const stateObj = states.find(
					(s) => s.name === stateName.toUpperCase()
				)

				if (stateObj) {
					setCurrentState(stateObj)
					try {
						const response =
							await api.debts.getStateDebtDebtsStatesStateCodeGet(
								{
									stateCode: stateObj.code,
									startDate,
									endDate,
								}
							)
						setCurrentStateDebt(response.data)
					} catch (error) {
						console.error('Debt fetch failed', error)
						setCurrentStateDebt(null)
					}
				}
			}
		},
		[timeIndex, mapType]
	)

	useEffect(() => {
		const updateSelectedStateData = async () => {
			if (currentState) {
				const { startDate, endDate } = getQuarterDates(timeIndex)

				try {
					const response =
						await api.debts.getStateDebtDebtsStatesStateCodeGet({
							stateCode: currentState.code,
							startDate,
							endDate,
						})
					setCurrentStateDebt(response.data)
				} catch (error) {
					console.error(
						'Failed to sync state debt on time change',
						error
					)
				}
			}
		}

		updateSelectedStateData()
	}, [timeIndex, currentState])

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			sx={{ width: '100vw', mt: '1rem' }}
		>
			<Typography align="center" variant="h2">
				Household Debt Visualizer
			</Typography>
			<Box
				sx={{
					width: '80%',
					maxWidth: '50rem',
					mt: '.5rem',
					px: 4,
				}}
			>
				<Typography id="time-slider-label" gutterBottom align="center">
					Data Period: <strong>{getQuarterLabel(timeIndex)}</strong>
				</Typography>
				<Slider
					value={timeIndex}
					min={0}
					max={104}
					step={1}
					marks={sliderMarks}
					onChange={handleSliderChange}
					onChangeCommitted={handleSliderCommitted}
					valueLabelDisplay="auto"
					valueLabelFormat={getQuarterLabel}
					aria-labelledby="time-slider-label"
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: {
						xs: 'column',
						md: 'row',
					},
					width: '100%',
					maxWidth: '75.9rem',
					gap: 4,
					alignItems: 'flex-start',
				}}
			>
				<Box
					sx={{
						flexGrow: 1,
						width: '58rem',
					}}
				>
					<Tooltip
						title={hoveredState || ''}
						followCursor
						arrow
						disableInteractive // Better performance for simple labels
						enterTouchDelay={0}
					>
						<ComposableMap
							projection="geoAlbersUsa"
							style={{
								width: '100%',
								height: 'auto',
							}}
						>
							<Geographies geography={geoUrl}>
								{({ geographies }) =>
									geographies.map((geo) => {
										const isCounty = mapType === 'County'
										const fips = geo.id
											.toString()
											.padStart(isCounty ? 5 : 2, '0')
										const areaData = statesDataMap.get(fips)
										return (
											<Geography
												key={geo.rsmKey}
												geography={geo}
												onMouseEnter={() =>
													setHoveredState(
														geo.properties.name
													)
												}
												onMouseLeave={() =>
													setHoveredState(null)
												}
												onMouseDown={() =>
													handleMouseDown(geo)
												}
												fill={
													areaData
														? colorScale(
																areaData.average_debt
															)
														: '#F5F5F5'
												}
												style={{
													default: {
														outline: 'none',
														transition:
															'fill 0.3s ease',
													},
													hover: {
														fill: '#60a5fa',
														outline: 'none',
														cursor: 'pointer',
													},
													pressed: {
														outline: 'none',
													},
												}}
											/>
										)
									})
								}
							</Geographies>
						</ComposableMap>
					</Tooltip>
					<MapLegend scale={colorScale} />
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						width: '20rem',
						padding: '.5rem',
					}}
				>
					<Typography variant="h6">Filters</Typography>
					<Autocomplete
						options={Object.keys(MAP_LAYERS)}
						value={mapType}
						onChange={(_event, newValue) => {
							if (newValue) setMapType(newValue)
						}}
						renderInput={(params) => (
							<TextField {...params} label="Select Map View" />
						)}
						sx={{ width: '100%' }}
					/>
					<Autocomplete
						value={currentState}
						options={states}
						getOptionLabel={(option) => toTitleCase(option.name)}
						onChange={(_event, newValue) => {
							if (newValue) {
								setCurrentState(newValue)
								const { startDate, endDate } =
									getQuarterDates(timeIndex)
								api.debts
									.getStateDebtDebtsStatesStateCodeGet({
										stateCode: newValue.code,
										startDate,
										endDate,
									})
									.then((res) =>
										setCurrentStateDebt(res.data)
									)
							}
						}}
						renderInput={(params) => (
							<TextField {...params} label="Select State" />
						)}
						sx={{
							width: '100%',
						}}
					/>
					{currentStateDebt && (
						<>
							<Typography variant="body2">
								<strong>Average Debt Ratio:</strong>{' '}
								{currentStateDebt.average_debt
									? `${currentStateDebt.average_debt.toLocaleString()}`
									: 'No Data'}
							</Typography>
							{currentStateDebt &&
								'number_of_counties' in currentStateDebt && (
									<Typography variant="body2">
										<strong>Number of Counties:</strong>{' '}
										{currentStateDebt.number_of_counties
											? `${currentStateDebt.number_of_counties.toLocaleString()}`
											: 'Unknown'}
									</Typography>
								)}
							<Typography variant="body2">
								<strong>Fips Code:</strong>{' '}
								{currentStateDebt.fips_code
									? `${currentStateDebt.fips_code.toLocaleString()}`
									: 'Unknown'}
							</Typography>
						</>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Home
