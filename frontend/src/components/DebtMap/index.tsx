import React, { type FC, memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { Tooltip } from '@mui/material'
import type { StateDebt, CountyDebt } from '../../services/household_debt_api'

const MAP_LAYERS = {
	State: '/data/states-10m.json',
	County: '/data/counties-10m.json',
}

interface DebtMapProps {
	mapType: string
	dataMap: Map<string, StateDebt | CountyDebt>
	selectedFips: string | null
	onRegionSelect: (geo: any) => void
	colorScale: (value: number) => string
}

const DebtMap: FC<DebtMapProps> = memo(
	({ mapType, dataMap, selectedFips, onRegionSelect, colorScale }) => {
		const [hoveredName, setHoveredName] = React.useState<string | null>(
			null
		)
		const geoUrl = MAP_LAYERS[mapType as keyof typeof MAP_LAYERS]

		return (
			<Tooltip
				title={hoveredName || ''}
				followCursor
				arrow
				disableInteractive
				enterTouchDelay={0}
			>
				<ComposableMap
					projection="geoAlbersUsa"
					style={{ width: '100%', height: 'auto' }}
				>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => {
								const isCounty = mapType === 'County'
								const fips = geo.id
									.toString()
									.padStart(isCounty ? 5 : 2, '0')
								const areaData = dataMap.get(fips)
								const isSelected = selectedFips === fips

								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										onMouseEnter={() =>
											setHoveredName(geo.properties.name)
										}
										onMouseLeave={() =>
											setHoveredName(null)
										}
										onMouseDown={() => onRegionSelect(geo)}
										fill={
											isSelected
												? '#3b82f6'
												: areaData
													? colorScale(
															areaData.average_debt
														)
													: '#F5F5F5'
										}
										stroke={isSelected ? '#FFFFFF' : '#DDD'}
										strokeWidth={isSelected ? 2 : 0.5}
										style={{
											default: {
												outline: 'none',
												transition: 'all 0.2s',
											},
											hover: {
												fill: '#60a5fa',
												outline: 'none',
												cursor: 'pointer',
											},
											pressed: { outline: 'none' },
										}}
									/>
								)
							})
						}
					</Geographies>
				</ComposableMap>
			</Tooltip>
		)
	}
)

export default DebtMap
