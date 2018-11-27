import listIcon from '../../images/menu-actions/list.svg';
import noteIcon from '../../images/menu-actions/summary.svg';

const initialState = [
	{
		id: 0,
		title: 'Create a List',
		iconURL: listIcon,
		itemAction: 'addList'
	},
	{
		id: 1,
		title: 'Create a Note',
		iconURL: noteIcon,
		itemAction: 'addNote'
	},
]


export default function notesFields( state = initialState, action ) {
	switch ( action.type ) {
		default:
			return state
	}
}