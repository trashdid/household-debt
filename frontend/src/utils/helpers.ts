export function toTitleCase(str: string): string {
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => {
			if (word.length === 0) return ''
			return word.charAt(0).toUpperCase() + word.slice(1)
		})
		.join(' ')
}

export const getQuarterLabel = (index: number) => {
	const startYear = 1999
	const year = startYear + Math.floor(index / 4)
	const quarter = (index % 4) + 1
	return `${year}-Q${quarter}`
}

export const getQuarterDates = (index: number) => {
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
