import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, List, ListItem, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { SortableContainer, SortableElement, SortableHandle, } from 'react-sortable-hoc';


const DragHandle = SortableHandle( () => <DragHandleIcon className="drag-item"/> );


const SortableItem = SortableElement( ( { index, value, handleCheckChangeListItem, handleListItemNameChange, handleRemoveListItem } ) => {
	return (
		<ListItem key={ index } className="list-item">
			<DragHandle/>
			<Checkbox
				onChange={ handleCheckChangeListItem }
				checked={ value.done }
			/>
			<TextField
				fullWidth
				multiline
				autoFocus
				rowsMax="18"
				className="note-text"
				margin="normal"
				value={ value.title }
				inputProps={ { className: 'textarea' } }
				placeholder={ `New Task` }
				onChange={ handleListItemNameChange }
				name="title"
			/>
			<CloseIcon className="remove-item" onClick={ handleRemoveListItem }/>
		</ListItem>
	);
} );

SortableItem.propTypes = {
	index: PropTypes.number.isRequired,
	value: PropTypes.object,
	handleCheckChangeListItem: PropTypes.func.isRequired,
	handleListItemNameChange: PropTypes.func.isRequired,
	handleRemoveListItem: PropTypes.func.isRequired,
};

const EditNoteSortableList = SortableContainer( ( { items, handleCheckChangeListItem, handleListItemNameChange, handleRemoveListItem } ) => {
	return (
		<List className="todo-list">
			{ items.map( ( noteListItem, currentId ) => (
				<SortableItem key={ `item-${currentId}` } index={ currentId } value={ noteListItem }
							  handleCheckChangeListItem={ handleCheckChangeListItem( currentId ) }
							  handleListItemNameChange={ handleListItemNameChange( currentId ) }
							  handleRemoveListItem={ handleRemoveListItem( currentId ) }
				/>
			) ) }
		</List>
	);
} );

EditNoteSortableList.propTypes = {
	items: PropTypes.array.isRequired,
	handleCheckChangeListItem: PropTypes.func.isRequired,
	handleListItemNameChange: PropTypes.func.isRequired,
	handleRemoveListItem: PropTypes.func.isRequired,
};

export default EditNoteSortableList;