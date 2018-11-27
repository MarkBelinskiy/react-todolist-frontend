import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
// ImportSAGA
import createSagaMiddleware from 'redux-saga'
//import sagas to init
import rootSaga from './sagas/index'

import reducer from './reducers'

export const getStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		reducer,
		composeWithDevTools( applyMiddleware() ),
		applyMiddleware( logger, sagaMiddleware ),
	);
	//Init sagas after middleware
	sagaMiddleware.run( rootSaga )
	return store;
}
