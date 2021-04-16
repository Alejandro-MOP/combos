/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: main view for limit of combos, here is the table and the modal
 *  to create limit of combo and also to create a combo
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
*/
import React from 'react';
import { Col, Row } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

import './LimitOfCombos.css';
import addImage from '../../assets/images/header/add.png';
import CombosTable from './CombosTable/CombosTable';

const LimitsOfCombos = () => {
	const history = useHistory();

	const createComboPush = () => history.push('/combos-generator/crear-limite-combo');

	return (
		<>
			<Row>
				<Col sm='9' md='9'>
					<h3 className='encabezado mt-4 text-center' style={{marginLeft:'22rem', color:'#1890ff'}}>Límite de Combos</h3>
				</Col>

				<Col sm='3' md='3' className='d-flex'>
					<button className='add-combo mt-3'>
						<img src={addImage} alt='Add logo' className='py-2 mr-3' onClick={createComboPush} />
					</button>
					<Link to={'/combos-generator/crear-limite-combo'}>
						<h3 className='encabezado text-center pt-4'>Crear Límite de Combo</h3>
					</Link>
				</Col>
			</Row>

			<Row className='m-0'>
				<Col sm='12' md='12' className='px-5'>
					<CombosTable />
				</Col>
			</Row>

			{/* <ModalCreateLimit modal={modal} setModal={setModal} toggle={toggle} /> */}
		</>
	);
};

export default LimitsOfCombos;
