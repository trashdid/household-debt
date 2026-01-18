import { useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'
import type {
	State,
	CountyExtended,
	StateDebt,
	CountyDebt,
} from '../services/household_debt_api'
import { getQuarterDates } from '../utils/helpers'

export const useDebtSelection = (timeIndex: number, mapType: string) => {
	const [states, setStates] = useState<State[]>([])
	const [counties, setCounties] = useState<CountyExtended[]>([])

	const [selectedFips, setSelectedFips] = useState<string | null>(null)
	const [currentSelectionData, setCurrentSelectionData] = useState<
		StateDebt | CountyDebt | null
	>(null)

	useEffect(() => {
		const loadStaticData = async () => {
			try {
				const [resStates, resCounties] = await Promise.all([
					api.states.getStatesStatesGet(),
					api.counties.getCountiesCountiesGet(),
				])

				setStates(
					resStates.data.sort((a, b) => a.name.localeCompare(b.name))
				)
				setCounties(
					resCounties.data.sort((a, b) =>
						a.name.localeCompare(b.name)
					)
				)
			} catch (error) {
				console.error('Failed to fetch static data', error)
			}
		}
		loadStaticData()
	}, [])

	const fetchDetailData = useCallback(
		async (fips: string, type: string) => {
			const { startDate, endDate } = getQuarterDates(timeIndex)
			try {
				if (type === 'County') {
					const res =
						await api.debts.getCountyDebtDebtsCountiesFipsCodeGet({
							fipsCode: fips,
							startDate,
							endDate,
						})
					setCurrentSelectionData(res.data)
				} else {
					const stateMatch =
						states.find((s) => s.fips_code === fips) ||
						states.find((s) => s.code === fips) // Handle various inputs

					if (stateMatch) {
						const res =
							await api.debts.getStateDebtDebtsStatesStateCodeGet(
								{
									stateCode: stateMatch.code,
									startDate,
									endDate,
								}
							)
						setCurrentSelectionData(res.data)
					}
				}
			} catch (error) {
				console.error('Failed to fetch detail data', error)
				setCurrentSelectionData(null)
			}
		},
		[timeIndex, states]
	)

	useEffect(() => {
		if (selectedFips) {
			fetchDetailData(selectedFips, mapType)
		}
	}, [timeIndex, selectedFips, mapType, fetchDetailData])

	const handleRegionClick = (geo: any) => {
		const isCounty = mapType === 'County'
		const fips = geo.id.toString().padStart(isCounty ? 5 : 2, '0')
		setSelectedFips(fips)
		fetchDetailData(fips, mapType)
	}

	const handleDropdownSelect = (item: State | CountyExtended | null) => {
		if (!item) {
			setSelectedFips(null)
			setCurrentSelectionData(null)
			return
		}

		const fips =
			'fips_code' in item
				? item.fips_code
				: (item as any).fips_code || (item as any).code

		setSelectedFips(fips)
		fetchDetailData(fips, mapType)
	}

	return {
		selectedFips,
		currentSelectionData,
		staticData: { states, counties },
		handleRegionClick,
		handleDropdownSelect,
	}
}
