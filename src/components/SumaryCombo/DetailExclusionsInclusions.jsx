import React from 'react';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';

const DetailExclusionsInclusions = () => {
	const exclusionsAndInclusions = useSelector(state => state.exclusionsAndInclusions);

	const {
		GET_regionalSalesDirectorate,
		GET_salesOrganization,
		GET_salesOffice,
		// GET_clients,
		SET_regionalSalesDirectorate,
		SET_salesOrganization,
		SET_salesOffice,
		// SET_clientsExclusion,
		SET_clientsInclusion
	} = exclusionsAndInclusions;

	return (
		<>
			<>
				<div className='mt-2'>
					<Row className=' text-center mx-0'>
						<Col
							sm='2'
							md='2'
							className='column-header d-flex align-items-center justify-content-center px-2'
						>
							<p className='m-0'>Regiones Incluidas:</p>
						</Col>
						<Col
							sm='2'
							md='2'
							className='column-header d-flex align-items-center justify-content-center px-2'
						>
							<p className='m-0'>Organizaciones Incluidas:</p>
						</Col>
						<Col
							sm='2'
							md='2'
							className='column-header d-flex align-items-center justify-content-center px-2'
						>
							<p className='m-0'>Oficinas Incluidas:</p>
						</Col>
						<Col
							sm='2'
							md='2'
							className='column-header d-flex align-items-center justify-content-center px-2'
						>
							<p className='m-0'>Clientes Incluidos:</p>
						</Col>
						<Col
							sm='2'
							md='2'
							className='column-header d-flex align-items-center justify-content-center px-2'
						>
							<p className='m-0'>Regiones Excluidas:</p>
						</Col>
						<Col
							sm='1'
							md='1'
							className='column-header d-flex align-items-center justify-content-center pl-1 pr-2'
						>
							<p className='m-0'>Organizaciones Excluidas:</p>
						</Col>
						<Col
							sm='1'
							md='1'
							className='column-header d-flex align-items-center justify-content-center px-2'
						>
							<p className='m-0'>Oficinas Excluidas:</p>
						</Col>
					</Row>
					<Row
						className=' text-center mx-0'
						style={{
							color: 'rgba(0, 0, 0, 0.78)',
							fontFamily: 'Roboto, sans-serif',
							fontSize: '14px',
							fontWeight: 'bold'
						}}
					>
						<Col sm='2' md='2' className='d-flex align-items-center justify-content-center px-2'>
							<p className='m-0 py-2'>{SET_regionalSalesDirectorate.length}</p>
						</Col>
						<Col sm='2' md='2' className='d-flex align-items-center justify-content-center px-2'>
							<p className='m-0 py-2'>{SET_salesOrganization.length}</p>
						</Col>
						<Col sm='2' md='2' className='d-flex align-items-center justify-content-center px-2'>
							<p className='m-0 py-2'>{SET_salesOffice.length}</p>
						</Col>
						<Col sm='2' md='2' className='d-flex align-items-center justify-content-center px-2'>
							<p className='m-0 py-2'>{SET_clientsInclusion.length}</p>
						</Col>
						<Col sm='2' md='2' className='d-flex align-items-center justify-content-center px-2'>
							<p className='m-0 py-2'>
								{GET_regionalSalesDirectorate.length - SET_regionalSalesDirectorate.length}
							</p>
						</Col>
						<Col sm='1' md='1' className='d-flex align-items-center justify-content-center px-2'>
							<p className='m-0 py-2'>{GET_salesOrganization.length - SET_salesOrganization.length}</p>
						</Col>
						<Col sm='1' md='1' className='d-flex align-items-center justify-content-center px-2'>
							<p className='m-0 py-2'>{GET_salesOffice.length - SET_salesOffice.length}</p>
						</Col>
					</Row>
				</div>
			</>
		</>
	);
};

export default DetailExclusionsInclusions;
