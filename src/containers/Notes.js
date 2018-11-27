import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Notes.scss'
import Note from '../components/notes/note/Note';
import * as noteActions from '../redux/actions'
import Packery from 'packery';


class Notes extends Component {
	static propTypes = {
		notes: PropTypes.array.isRequired,
		removeNote: PropTypes.func.isRequired,
		updateNote: PropTypes.func.isRequired
	};
	static defaultProps = {
		notes: [],
		removeNote: () => {},
		updateNote: () => {},
	};

	packery = () => new Packery( document.querySelector( '.grid' ), {
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		gutter: '.gutter-sizer',
		percentPosition: true,
	} );

	componentDidMount() {
		const packery = this.packery();
		const { loadNotesRequest } = this.props;
		packery.layout();
		loadNotesRequest();
	}

	componentDidUpdate() {
		const packery = this.packery();
		packery.layout();
	}

	render() {
		const { notes, removeNote, updateNote } = this.props;
		return (
			<div className="notes-container">
				<div className="grid">
					<div className="grid-sizer">
					</div>
					<div className="gutter-sizer">
					</div>
					{ (notes.length === 0) ?
						<p>Soryan, there are no notes, yet. Create your first note!</p> :
						notes.map( noteItem =>
							<Note key={ noteItem.id } data={ { ...noteItem } } removeNote={ removeNote }
								  updateNote={ updateNote }/>
						)
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		notes: state.notesFields.notes,
		isFetching: state.notesFields.isFetching
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadNotesRequest: ( params ) => {
			dispatch( noteActions.loadNotesRequest( params ) )
		},
		removeNote: ( id ) => {
			dispatch( noteActions.removeNote( id ) )
		},
		updateNote: noteItem => {
			dispatch( noteActions.updateNote( noteItem ) );
		},
	}
};


export default connect( mapStateToProps, mapDispatchToProps )( Notes )
