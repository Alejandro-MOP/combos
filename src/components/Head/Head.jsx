/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: handler menu for de user profile
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
 */
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Head.css';
import ABILogo from '../../assets/images/header/ABInBev-logo.png';
import HeadMenu from './HeadMenu';
import { clearIDLimitOfComboAction } from '../../redux/actions/limitOfCombosActions';
import { clearDataComboAction } from '../../redux/actions/comboDataActions';
import { clearExclusionsAndInclusionsAction } from '../../redux/actions/exclusionsAndInclusionsActions';
import { clearAllMaterialsAction } from '../../redux/actions/searchMaterialsActions';
import { clearAllIndexAction } from '../../redux/actions/tabsViewCreateComboActions';

const Head = () => {
	/*	REDUX	*/
	const dispatch = useDispatch();
	const clearIdLimitComboStore = () => dispatch(clearIDLimitOfComboAction());
	const clearDataComboStore = () => dispatch(clearDataComboAction());
	const clearExclusionsAndInclusionsStore = () => dispatch(clearExclusionsAndInclusionsAction());
	const clearMaterialsStore = () => dispatch(clearAllMaterialsAction());
	const clearAllIndexViews = () => dispatch(clearAllIndexAction());

	const clearStore = () => {
		clearIdLimitComboStore();
		clearDataComboStore();
		clearExclusionsAndInclusionsStore();
		clearMaterialsStore();
		clearAllIndexViews();
	};

	return (
		<>
			<Row className='mt-1 nav d-flex flex-nowrap justify-content-center' style={{ height: '55px' }}>
				<Col xs='4' sm='4'>
					<Link to={'/combos-generator'} style={{ textDecoration: 'none' }} onClick={clearStore}>
						<h1 className='combos-generator text-center mb-0 mt-3'>
							Combos Generator
						</h1>
					</Link>
				</Col>
				<Col xs='4' sm='4' className='text-center'>
					<img src={ABILogo} alt='ABInBev Logo' />
				</Col>
				<Col xs='4' sm='4' className='mt-3'>
					<HeadMenu />
				</Col>
			</Row>
			<hr className='my-0' />
		</>
	);
};

export default Head;
