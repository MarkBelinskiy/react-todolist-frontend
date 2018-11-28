import { call, put, takeLatest, select } from 'redux-saga/effects'
import { API_URL } from '../../config';
import axios from 'axios'

import { LOAD_NOTES_FAILURE, LOAD_NOTES_REQUEST, LOAD_NOTES_SUCCESS, } from './../actions'

function getNotes( pageNumber, size ) {
	return axios( {
		method: "get",
		url: API_URL + '/notes/',
		params: { pageNumber, size },
	} );
}

function* loadNotesSaga( action ) {
	try {
		const notesFields = yield select( ( state ) => state.notesFields );
		let { hasMoreNotes } = notesFields;
		const { pageNumber, size } = action;

		const response = yield call( getNotes, pageNumber, size );

		const notes = response.data.notes.map( noteItem => ({
			id: noteItem._id,
			title: noteItem.title,
			note: noteItem.note
		} ) );

		const totalPages = response.data.totalPages;

		totalPages === pageNumber ? hasMoreNotes = false : hasMoreNotes = true;
		console.log( totalPages );
		console.log( pageNumber );

		yield put( { type: LOAD_NOTES_SUCCESS, notes, pageNumber, hasMoreNotes, totalPages } );
	} catch ( error ) {
		yield put( { type: LOAD_NOTES_FAILURE, error: error.response.data.message } );
	}
}

export function* watchLoadNotesSaga() {
	yield takeLatest( LOAD_NOTES_REQUEST, loadNotesSaga );
}
