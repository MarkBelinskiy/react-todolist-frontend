export const LOAD_NOTES_REQUEST = 'LOAD_NOTES_REQUEST';
export const LOAD_NOTES_SUCCESS = 'LOAD_NOTES_SUCCESS';
export const LOAD_NOTES_FAILURE = 'LOAD_NOTES_FAILURE';

export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';
export const ADD_NOTE_FAILURE = 'ADD_NOTE_FAILURE';

export const REMOVE_NOTE_REQUEST = 'REMOVE_NOTE_REQUEST';
export const REMOVE_NOTE_SUCCESS = 'REMOVE_NOTE_SUCCESS';
export const REMOVE_NOTE_FAILURE = 'REMOVE_NOTE_FAILURE';

export const UPDATE_NOTE_REQUEST = 'UPDATE_NOTE_REQUEST';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
export const UPDATE_NOTE_FAILURE = 'UPDATE_NOTE_FAILURE';

export const CLEAN_ERROR_MESSAGE = 'CLEAN_ERROR_MESSAGE';


// NOTE ACTIONS
export const loadNotesRequest = () => ({ type: LOAD_NOTES_REQUEST });

export const addNote = noteItem => ({ type: ADD_NOTE_REQUEST, noteItem });

export const updateNote = noteItem => ({ type: UPDATE_NOTE_REQUEST, noteItem });

export const removeNote = id => ({ type: REMOVE_NOTE_REQUEST, id });

export const cleanErrorMessage = id => ({ type: CLEAN_ERROR_MESSAGE });

