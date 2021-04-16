/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: in this component the options are grouped in drop-down menus for navigation
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
 */
import React from 'react';
import { Col, Row } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, /*Divider,*/ IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import './Nav.css';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import gridImage from '../../assets/images/nav/Grid.png';
import descIcon from '../../assets/images/nav/Desc.png';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		// alignItems: 'center',
		width: 250,
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

const Nav = () => {
	const classes = useStyles();
	return (
		<Row className='my-0 d-flex align-items-center pl-4'>
			<Col sm='9' md='9' className='d-flex ml-3'>
				<div className='mr-4'>
					<img src={gridImage} alt='Grid icon' />
				</div>
				<div>
					<DropDownMenu />
				</div>
			</Col>
			<Col sm='2' md='2' className='align-left d-flex pl-0'>
				<Paper component='form' className={classes.root}>
					<InputBase
						className={classes.input}
						placeholder={'Busca Aquí'}
					/>
					<IconButton type='submit' className={classes.iconButton} disabled>
						<SearchIcon style={{ color: 'rgba(0, 0, 0, 0.84)' }} />
					</IconButton>
				</Paper>
                <img
                    src={descIcon}
                    alt={'Descending Logo'}
                    className='mt-3 ml-2'
                    style={{
                        height:'12px',
                        width:'18px'
                    }}
                />
			</Col>
		</Row>
	);
};

export default Nav;
