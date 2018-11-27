import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const MenuItem = ( { title, iconURL, itemAction, openPopupNote, openPopupList } ) => {

	const itemActionCompare = ( itemAction ) => {
		switch ( itemAction ) {
			case 'addNote' :
				return openPopupNote;
			case 'addList' :
				return openPopupList;
			default:
				return false
		}
	};
	return (
		<li>
			<Tooltip title={ title }
					 placement="top">
				<img onClick={ itemActionCompare( itemAction ) }
					 src={ iconURL }
					 alt={ title }/>
			</Tooltip>
		</li>
	)
};


MenuItem.propTypes = {
	title: PropTypes.string,
	iconURL: PropTypes.string.isRequired,
	itemAction: PropTypes.string.isRequired,
	openPopupNote: PropTypes.func.isRequired,
	openPopupList: PropTypes.func.isRequired
};

MenuItem.defaultProps = {
	title: 'Default title',
	iconURL: '',
	itemAction: 'addNote',
	openPopupNote: () => {},
	openPopupList: () => {}
};

export default MenuItem;