import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import './SnackbarAlert.scss'


const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};


function MySnackbarContent( props ) {
	const { message, onClose, variant, ...other } = props;
	const Icon = variantIcon[ variant ];

	return (
		<SnackbarContent
			className={ variant }
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className="message">
          <Icon className="icon icon-variant"/>
					{ message }
        </span>
			}
			action={ [
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					className="close"
					onClick={ onClose }
				>
					<CloseIcon className="icon"/>
				</IconButton>,
			] }
			{ ...other }
		/>
	);
}


const SnackbarAlert = ( { open, onClose, message, variant } ) => {
	return (
		<Snackbar
			anchorOrigin={ {
				vertical: 'bottom',
				horizontal: 'left',
			} }
			className="snackbar"
			open={ open }
			// autoHideDuration={ 6000 }
			onClose={ onClose }
		>
			<MySnackbarContent
				onClose={ onClose }
				variant={ variant }
				message={ message }
			/>
		</Snackbar>
	);
};


export default SnackbarAlert;