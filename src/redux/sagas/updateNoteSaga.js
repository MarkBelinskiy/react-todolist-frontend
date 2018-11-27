import { call, put, select, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../config';
import axios from 'axios'

import { UPDATE_NOTE_FAILURE, UPDATE_NOTE_REQUEST, UPDATE_NOTE_SUCCESS, } from './../actions'

function updateNoteById( noteItem ) {
	const data = {
		title: noteItem.title,
		note: noteItem.note
	};

	return axios( {
		method: "put",
		url: API_URL + '/notes/' + noteItem.id,
		data
	} );
}

function* updateNoteSaga( action ) {
	try {
		const response = yield call( updateNoteById, action.noteItem );

		const { note } = response.data;

		const formattedNote = {
			id: note._id,
			title: note.title,
			note: note.note,
		};

		const getNotes = ( state ) => state.notesFields.notes;

		const notes = yield select( getNotes );

		const updatedNotes = notes.map( elem => {
			elem.id === formattedNote.id && (
				elem = {
					id: formattedNote.id,
					title: formattedNote.title,
					note: formattedNote.note
				}
			);
			return elem;
		} );


		yield put( { type: UPDATE_NOTE_SUCCESS, notes: updatedNotes } );
	} catch ( error ) {
		yield put( { type: UPDATE_NOTE_FAILURE, error: error.response.data.message } );
	}
}

export function* watchDeleteNoteSaga() {
	yield takeEvery( UPDATE_NOTE_REQUEST, updateNoteSaga )
}
