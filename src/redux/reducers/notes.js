import {
	ADD_NOTE_FAILURE,
	ADD_NOTE_REQUEST,
	ADD_NOTE_SUCCESS,
	CLEAN_ERROR_MESSAGE,
	LOAD_NOTES_FAILURE,
	LOAD_NOTES_REQUEST,
	LOAD_NOTES_SUCCESS,
	REMOVE_NOTE_FAILURE,
	REMOVE_NOTE_REQUEST,
	REMOVE_NOTE_SUCCESS,
	UPDATE_NOTE_FAILURE,
	UPDATE_NOTE_REQUEST,
	UPDATE_NOTE_SUCCESS
} from '../actions'

const initialState = {
	isFetching: false,
	notes: [],
	error: null,
};

export default function notesFields( state = initialState, action ) {

	switch ( action.type ) {
		case LOAD_NOTES_REQUEST:
		case ADD_NOTE_REQUEST:
		case UPDATE_NOTE_REQUEST:
		case REMOVE_NOTE_REQUEST:
			return { ...state, isFetching: true };

		case LOAD_NOTES_SUCCESS:
			return {
				...state,
				isFetching: false,
				notes: state.notes.concat( action.notes )
			};

		case LOAD_NOTES_FAILURE:
			return { ...state, notes: [], isFetching: false, error: action.error };

		case ADD_NOTE_SUCCESS:
			return { ...state, isFetching: false, notes: [ ...state.notes, action.noteItem ] };

		case REMOVE_NOTE_SUCCESS:
			return { ...state, isFetching: false, notes: action.notes };

		case UPDATE_NOTE_SUCCESS:
			return { ...state, isFetching: false, notes: action.notes };

		case REMOVE_NOTE_FAILURE:
		case ADD_NOTE_FAILURE:
		case UPDATE_NOTE_FAILURE:
			return { ...state, isFetching: false, error: action.error };

		case CLEAN_ERROR_MESSAGE:
			return { ...state, error: null };

		default:
			return state
	}
}