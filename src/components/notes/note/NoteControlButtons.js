import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Delete, Edit } from '@material-ui/icons';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Zoom
} from '@material-ui/core';
import './NoteControlButtons.scss'

function Transition( props ) {
	return <Slide direction="up" { ...props } />;
}

export default class NoteControlButtons extends Component {
	static propTypes = {
		noteControls: PropTypes.bool.isRequired,
		triggerEditNote: PropTypes.func.isRequired,
		removeNote: PropTypes.func.isRequired,
	}
	static defaultProps = {
		noteControls: false,
		triggerEditNote: () => {},
		removeNote: () => {}
	};
	state = {
		openDeleteConfirm: false,
	};

	triggerDeleteConfirm = () => {
		this.setState( { openDeleteConfirm: !this.state.openDeleteConfirm } );
	};

	render() {
		const { triggerDeleteConfirm } = this;
		const { triggerEditNote, removeNote, noteControls } = this.props;
		const { openDeleteConfirm } = this.state;
		return (
			<div className="controls">
				<Zoom in={ noteControls }>
					<Button variant="fab"
							mini
							color="primary"
							aria-label="edit"
							className="button"
							onClick={ triggerEditNote }>
						<Edit/>
					</Button>
				</Zoom>
				<Zoom in={ noteControls }
					  style={ { transitionDelay: noteControls ? 100 : 0 } }>
					<Button variant="fab"
							mini
							color="secondary"
							aria-label="add"
							className="button"
							onClick={ triggerDeleteConfirm }
					>
						<Delete/>
					</Button>
				</Zoom>

				<Dialog
					open={ openDeleteConfirm }
					TransitionComponent={ Transition }
					keepMounted
					onClose={ triggerDeleteConfirm }
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">
						{ "Remove Note?" }
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							Do you want to delete it? Are you sure?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={ removeNote } color="primary">
							Yes, please
						</Button>
						<Button onClick={ triggerDeleteConfirm } color="primary">
							Nope, tnx
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}