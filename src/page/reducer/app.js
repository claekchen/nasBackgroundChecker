import { combineReducers } from 'redux'
import search from './app/search'
import person from './app/person'
import company from './app/company'
import menus from './app/menus'
const app = combineReducers({
  search, person, company, menus
})

export default app
