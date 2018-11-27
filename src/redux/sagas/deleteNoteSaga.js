import { call, put, select, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../config';
import axios from 'axios'

import { REMOVE_NOTE_FAILURE, REMOVE_NOTE_REQUEST, REMOVE_NOTE_SUCCESS, } from './../actions'

function deleteNoteById( noteId ) {
	return axios( {
		method: "delete",
		url: API_URL + '/notes/' + noteId
	} );
}

function* deleteNoteSaga( action ) {
	try {
		const response = yield call( deleteNoteById, action.id );

		const { id } = response.data;
		const getNotes = ( state ) => state.notesFields.notes;
		const notes = yield select( getNotes );
		const removedNote = notes.filter( elem => elem.id !== id );

		yield put( { type: REMOVE_NOTE_SUCCESS, notes: removedNote } );
	} catch ( error ) {
		yield put( { type: REMOVE_NOTE_FAILURE, error: error.response.data.message } );
	}
}

export function* watchDeleteNoteSaga() {
	yield takeEvery( REMOVE_NOTE_REQUEST, deleteNoteSaga )
}
