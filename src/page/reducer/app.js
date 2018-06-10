import { combineReducers } from 'redux'
import search from './app/search'
import person from './app/person'
import company from './app/company'
const app = combineReducers({
  search, person, company
})

export default app
