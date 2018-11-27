import { call, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../config';
import axios from 'axios'

import { LOAD_NOTES_FAILURE, LOAD_NOTES_REQUEST, LOAD_NOTES_SUCCESS, } from './../actions'

function getNotes() {
	return axios( {
		method: "get",
		url: API_URL + '/notes/'
	} );
}

function* loadNotesSaga() {
	try {
		const response = yield call( getNotes );

		const notes = response.data.notes.map( noteItem => ({
			id: noteItem._id,
			title: noteItem.title,
			note: noteItem.note
		} ) );

		yield put( { type: LOAD_NOTES_SUCCESS, notes } );
	} catch ( error ) {
		yield put( { type: LOAD_NOTES_FAILURE, error: error.response.data.message } );
	}
}

export function* watchLoadNotesSaga() {
	yield takeEvery( LOAD_NOTES_REQUEST, loadNotesSaga );
}
