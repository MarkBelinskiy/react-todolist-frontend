import { combineReducers } from 'redux'
import notesFields from './notes'
import menuFields from './menu'

export default combineReducers( {
	notesFields,
	menuFields
} )