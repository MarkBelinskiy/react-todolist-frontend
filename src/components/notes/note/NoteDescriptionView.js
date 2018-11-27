import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { FiberManualRecord, RadioButtonUnchecked } from '@material-ui/icons'
import './NoteDescriptionView.scss'

const NoteDescriptionView = ( { noteData } ) => {
	return (
		<div>
			{ Array.isArray( noteData ) ?
				<List>
					{ noteData.map( listItem =>
						<div key={ uuidv4() } className="list-item">
							<ListItem className={ listItem.done ? "done" : 'not-done' }>
								<ListItemIcon className="icon">
									{ listItem.done ?
										<FiberManualRecord/>
										:
										<RadioButtonUnchecked/>
									}
								</ListItemIcon>
								<ListItemText primary={ listItem.title }
											  className="text-wrap"
											  classes={ { primary: "text" } }/>
							</ListItem>
						</div>
					) }
				</List>
				:
				<Typography component="p" align="justify">
					{ noteData }
				</Typography>
			}
		</div>
	);
};

NoteDescriptionView.propTypes = {
	noteData: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.array,
	] ).isRequired,
}

NoteDescriptionView.defaultProps = {
	noteData: '',
};

export default NoteDescriptionView