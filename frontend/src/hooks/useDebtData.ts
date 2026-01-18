import { useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'
import { getQuarterDates } from '../utils/helpers'
import type { CountyDebt, StateDebt } from '../services/household_debt_api'

export const useDebtData = (timeIndex: number, mapType: string) => {
	const [heatmapData, setHeatmapData] = useState<StateDebt[] | CountyDebt[]>(
		[]
	)
	const [loading, setLoading] = useState(false)

	const { startDate, endDate } = useMemo(
		() => getQuarterDates(timeIndex),
		[timeIndex]
	)

	useEffect(() => {
		let isMounted = true

		const fetchData = async () => {
			setLoading(true)
			try {
				const response =
					mapType === 'County'
						? await api.debts.getCountiesDebtDebtsCountiesGet({
								startDate,
								endDate,
							})
						: await api.debts.getStatesDebtDebtsStatesGet({
								startDate,
								endDate,
							})

				if (isMounted) {
					setHeatmapData(response.data)
				}
			} catch (error) {
				console.error('Failed to fetch heatmap data', error)
			} finally {
				if (isMounted) setLoading(false)
			}
		}

		fetchData()

		return () => {
			isMounted = false
		}
	}, [startDate, endDate, mapType])

	const dataMap = useMemo(() => {
		return new Map(heatmapData.map((item) => [item.fips_code, item]))
	}, [heatmapData])

	return { dataMap, loading }
}
