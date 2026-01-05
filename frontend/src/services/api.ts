import {
	Configuration,
	StatesApi,
	CountiesApi,
	DebtsApi,
} from './household_debt_api'

const config = new Configuration({
	basePath: 'http://localhost:8000/api',
})

export const api = {
	states: new StatesApi(config),
	counties: new CountiesApi(config),
	debts: new DebtsApi(config),
}
