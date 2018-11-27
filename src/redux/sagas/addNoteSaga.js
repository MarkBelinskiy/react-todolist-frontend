import { call, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../config';
import axios from 'axios'

import { ADD_NOTE_FAILURE, ADD_NOTE_REQUEST, ADD_NOTE_SUCCESS, } from './../actions'

function addNote( noteItem ) {
	const data = {
		title: noteItem.title,
		note: noteItem.note
	};
	return axios( {
		method: 'post',
		url: API_URL + '/notes/',
		data
	} );
}

function* addNoteSaga( action ) {
	try {
		const response = yield call( addNote, action.noteItem );

		const { note } = response.data;
		const formattedNote = {
			id: note._id,
			title: note.title,
			note: note.note,
		};

		yield put( { type: ADD_NOTE_SUCCESS, noteItem: formattedNote } );
	} catch ( error ) {
		yield put( { type: ADD_NOTE_FAILURE, error: error.response.data.message } );
	}
}

export function* watchDeleteNoteSaga() {
	yield takeEvery( ADD_NOTE_REQUEST, addNoteSaga )
}
