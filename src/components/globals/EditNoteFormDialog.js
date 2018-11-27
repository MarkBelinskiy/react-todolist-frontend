import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditNote from '../notes/editNote/EditNote';
import Grow from '@material-ui/core/Grow';

function DialogTransition( props ) {
	return <Grow direction="up" { ...props } />;
}

const MenuDialog = ( { open, refTitle, title, noteType, popupCloseMethod, submitMethod } ) => {
	return (
		<Dialog
			PaperProps={ { className: 'dialog' } }
			open={ open }
			onClose={ () => { this[ refTitle ].handleClearForm() } }
			TransitionComponent={ DialogTransition }
			keepMounted
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle className="dialog-title" id="form-dialog-title">{ title }</DialogTitle>
			<EditNote
				data={ {
					title: '',
					note: noteType,
				} }

				ref={ e => { this[ refTitle ] = e} }
				submitMethod={ submitMethod }
				popupCloseMethod={ popupCloseMethod }
			/>
		</Dialog>
	);
};

MenuDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	refTitle: PropTypes.string.isRequired,
	title: PropTypes.string,
	noteType: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.array,
	] ).isRequired,
	popupCloseMethod: PropTypes.func.isRequired,
	submitMethod: PropTypes.func.isRequired,

};
MenuDialog.defaultProps = {
	open: false,
	refTitle: 'child',
	title: 'Unnamed',
	noteType: '',
	popupCloseMethod: () => {},
	submitMethod: () => {},
};

export default MenuDialog;