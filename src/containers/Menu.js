import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import * as noteActions from '../redux/actions/index'
import MenuItem from '../components/menu/MenuItem';
import EditNoteFormDialog from '../components/globals/EditNoteFormDialog';
import './Menu.scss';

class Menu extends Component {
	static propTypes = {
		menu: PropTypes.arrayOf( PropTypes.shape( {
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			iconURL: PropTypes.string.isRequired,
			itemAction: PropTypes.string.isRequired,
		} ).isRequired ).isRequired,
		addNewNote: PropTypes.func.isRequired,
	};
	static defaultProps = {
		menu: [],
		addNewNote: () => {},
	};
	state = {
		openNote: false,
		openList: false,
	};

	triggerPopupNote = () => {
		this.setState( { openNote: !this.state.openNote } );
	};

	triggerPopupList = () => {
		this.setState( { openList: !this.state.openList } );
	};

	render() {
		const { menu, addNewNote } = this.props;
		const { openNote, openList } = this.state;
		return (
			<div className="actions-menu-wrapper">
				{ (menu.length === 0) ?
					<p>Soryan, there is no actions, yet</p> :
					<div>
						<ul className="actions-menu">
							{ menu.map( menuItem =>
								<MenuItem key={ uuidv4() } { ...menuItem }
										  openPopupNote={ this.triggerPopupNote }
										  openPopupList={ this.triggerPopupList }
								/>,
							) }
						</ul>
						<EditNoteFormDialog open={ openNote }
											refTitle='Note'
											title="Add Note"
											noteType={ '' }
											submitMethod={ ( noteItem ) => {addNewNote( noteItem )} }
											popupCloseMethod={ this.triggerPopupNote }
						/>
						<EditNoteFormDialog open={ openList }
											refTitle='List'
											title="Add List"
											noteType={ [] }
											submitMethod={ ( noteItem ) => {addNewNote( noteItem )} }
											popupCloseMethod={ this.triggerPopupList }
						/>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { menu: state.menuFields };
};

const mapDispatchToProps = dispatch => {
	return {
		addNewNote( noteItem ) {
			dispatch( noteActions.addNote( noteItem ) );
		}
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( Menu );