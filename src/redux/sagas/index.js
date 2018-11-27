import { all, fork } from 'redux-saga/effects'
import * as loadNotesSagas from './loadNotesSaga'
import * as addNoteSaga from './addNoteSaga'
import * as updateNoteSagas from './updateNoteSaga'
import * as deleteNoteSagas from './deleteNoteSaga'

export default function* rootSaga() {
	yield all( [
		...Object.values( loadNotesSagas ),
		...Object.values( addNoteSaga ),
		...Object.values( updateNoteSagas ),
		...Object.values( deleteNoteSagas ),
	].map( fork ) );
}