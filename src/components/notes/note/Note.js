import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Grow, Paper, Typography } from '@material-ui/core';
import NoteControlButtons from './NoteControlButtons'
import NoteDescriptionView from './NoteDescriptionView'
import EditNote from '../editNote/EditNote';
import './Note.scss'


function DialogTransition( props ) {
	return <Grow direction="up" { ...props } />;
}

export default class Note extends Component {
	static propTypes = {
		data: PropTypes.shape( {
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			note: PropTypes.oneOfType( [
				PropTypes.string,
				PropTypes.array,
			] ).isRequired,
		} ).isRequired,
	};
	static defaultProps = {
		data: {
			id: '',
			title: '',
			note: '',
		},
	};
	state = {
		noteControls: false,
		editMode: false,
	};

	showNoteControls = () => {
		this.setState( { noteControls: true } );
	};
	hideNoteControls = () => {
		this.setState( { noteControls: false } );
	};
	triggerEditNote = () => {
		this.setState( { editMode: !this.state.editMode } );
	};

	render() {
		const { data, removeNote, updateNote } = this.props;
		const { id, title, note } = data;
		const { editMode, noteControls } = this.state;

		return (
			<div className="grid-item">
				<Paper className="paper"
					   onMouseEnter={ () => this.showNoteControls() }
					   onMouseLeave={ () => this.hideNoteControls() }>
					{ title &&
					<Typography variant="headline" component="h3">
						{ title }
					</Typography>
					}

					{ note &&
					<NoteDescriptionView noteData={ note }/>
					}
					<NoteControlButtons
						noteControls={ noteControls }
						triggerEditNote={ () => this.triggerEditNote() }
						removeNote={ () => removeNote( id ) }
					/>

					<Dialog
						PaperProps={ { className: 'dialog' } }
						open={ editMode }
						TransitionComponent={ DialogTransition }
						keepMounted
						onClose={ () => { this.child.handleClearForm() } }
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle className="dialog-title" id="form-dialog-title">Edit Note</DialogTitle>
						<EditNote
							ref={ e => { this.child = e} }
							data={ { id, title, note } }
							removeNote={ () => removeNote( id ) }
							submitMethod={ ( noteItem ) => updateNote( noteItem ) }
							popupCloseMethod={ () => this.triggerEditNote() }
						/>
					</Dialog>
				</Paper>

			</div>
		);
	}
}