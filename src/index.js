import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import './index.scss';
import App from './App';
import { getStore } from './redux/store';

const store = getStore();
ReactDOM.render(
	<Provider store={ store }>
		<App/>
	</Provider>, document.getElementById( 'root' ) );
registerServiceWorker();
