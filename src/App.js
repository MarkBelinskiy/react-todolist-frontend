import React, { Component } from 'react';
import MenuActions from './containers/Menu';
import Notes from './containers/Notes';
import './App.scss';
import { connect } from 'react-redux';
import * as noteActions from './redux/actions'
import SnackbarAlert from './components/globals/SnackbarAlert'


class App extends Component {
	handleClose = ( event, reason ) => {
		const { cleanErrorMessage } = this.props;
		if ( reason === 'clickaway' ) {
			return;
		}
		cleanErrorMessage();
		this.setState( { openSnackbar: false, snackbarMessage: '' } );
	};

	constructor( props ) {
		super( props );
		this.state = {
			openSnackbar: false,
			snackbarMessage: '',
			snackbarVariant: '',
		};
	}

	componentDidUpdate() {
		const { error } = this.props;
		const { openSnackbar } = this.state;
		if ( error !== null && !openSnackbar ) {
			this.setState( {
				openSnackbar: true,
				snackbarMessage: error,
				snackbarVariant: "error"
			} );
		}
	}

	render() {
		const { openSnackbar, snackbarMessage, snackbarVariant } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">To Do List</h1>
				</header>
				<MenuActions/>
				<Notes/>

				<SnackbarAlert
					open={ openSnackbar }
					onClose={ this.handleClose }
					message={ snackbarMessage }
					variant={ snackbarVariant }
				/>
			</div>
		);
	}
}


const mapStateToProps = state => {
	return {
		error: state.notesFields.error,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		cleanErrorMessage: () => {
			dispatch( noteActions.cleanErrorMessage() )
		},
	}
};
export default connect( mapStateToProps, mapDispatchToProps )( App )

