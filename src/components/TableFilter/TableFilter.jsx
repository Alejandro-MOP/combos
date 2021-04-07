/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: handler for search items in the tables with react-data-table
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, /*Divider,*/ IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 490,
		height: 30,
		border: '1px solid #e5e5e5',
		margin: '.5rem 0',
		boxShadow: 'none'
	},
	input: {
		marginLeft: theme.spacing(2),
		flex: 1,
		fontSize: '14px'
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	}
}));

const TableFilter = ({ name, value, onChange, searchBy, backgroundInput='' }) => {
	const classes = useStyles();

	return (
		<Paper component='form' className={classes.root} style={{backgroundColor: backgroundInput}}>
			<InputBase
				className={classes.input}
				placeholder={searchBy ?`Ingresa tu búsqueda por ${ searchBy }` :'Ingresa tu búsqueda'}
				name={name}
				value={value}
				onChange={onChange}
				style={{
					backgroundColor: backgroundInput
				}}
			/>
			<IconButton type='submit' className={classes.iconButton} disabled>
				<SearchIcon style={{ color: 'rgba(0, 0, 0, 0.84)' }} />
			</IconButton>
		</Paper>
	);
};

export default TableFilter;
