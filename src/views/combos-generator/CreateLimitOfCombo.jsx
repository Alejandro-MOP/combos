import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import EmojiIcon from '@atlaskit/icon/glyph/search';
import Select, { components } from 'react-select';
import { useDispatch } from 'react-redux';

import idLogo from '../../assets/images/assignment_ind.png';
import { optionsListMCL } from '../../helpers/selectsOption.js';
import { AlertGeneric, ModalCreateLimit } from '../../components';
import { createLimitOfComboAction, createIDLimitOfComboAction } from '../../redux/actions/limitOfCombosActions';

const owner = 'PPM Corporativo';

const initialLimitOfCombo = {
	nivelCombo: '',
	estructuraVenta: '',
	combosPermitidos: 0,
	CombosDisponibles: 0,
	activo: false,
	IdLimite: ''
};

const DropdownIndicator = props => {
	return (
		<components.DropdownIndicator {...props}>
			<EmojiIcon primaryColor={'#666666'} />
		</components.DropdownIndicator>
	);
};

const CreateLimitOfCombo = () => {
	/*    Redux     */
	const dispatch = useDispatch();

	const addLimitOfCombo = limitOfCombo => dispatch(createLimitOfComboAction(limitOfCombo));
	const currentIDlimitOfCombo = id => dispatch(createIDLimitOfComboAction(id));

	/*    Local State     */

	const [limitOfCombo, setLimitOfCombo] = useState(initialLimitOfCombo);
	const [error, setError] = useState(false);
	const [saved, setSaved] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const handleChange = e => {
		setLimitOfCombo({
			...limitOfCombo,
			[e.target.name]: e.target.value
		});
	};

	useEffect(() => {
		if (limitOfCombo.IdLimite !== '') return;

		const idLimit = `L-${parseInt(Math.random() * 1000000000)}`;

		setLimitOfCombo({
			...limitOfCombo,
			IdLimite: idLimit
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [limitOfCombo]);

	useEffect(() => {
		setLimitOfCombo({
			...limitOfCombo,
			estructuraVenta: selectedOption.value !== undefined ? selectedOption.value : ''
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption]);

	const handleChangeSelect = option => {
		setSelectedOption(option);
	};

	const saveLimitOfCombo = e => {
		// e.preventDefault();
		if (
			limitOfCombo.nivelCombo.trim() === '' ||
			limitOfCombo.estructuraVenta === '' ||
			parseInt(limitOfCombo.combosPermitidos) === 0 ||
			parseInt(limitOfCombo.combosPermitidos) <= 0
		) {
			setError(true);
		} else {
			setError(false);
			addLimitOfCombo({
				...limitOfCombo,
				CombosDisponibles: limitOfCombo.combosPermitidos
			});
			setSaved(true);

			setTimeout(() => {
				setLimitOfCombo(initialLimitOfCombo);
				setSaved(false);
				setSelectedOption('');
				document.getElementById('combosPermitidos').value = '0';
				document.getElementById('radio').checked = false;
			}, 1200);
		}
	};

	const saveAndNewLimitOfCombo = e => {
		if (
			limitOfCombo.nivelCombo.trim() === '' ||
			limitOfCombo.estructuraVenta === '' ||
			parseInt(limitOfCombo.combosPermitidos) === 0 ||
			parseInt(limitOfCombo.combosPermitidos) < 0
		) {
			setError(true);
		} else {
			setError(false);
			addLimitOfCombo({
				...limitOfCombo,
				CombosDisponibles: limitOfCombo.combosPermitidos
			});
			setSaved(true);
			setTimeout(() => {
				setLimitOfCombo(initialLimitOfCombo);
				setSelectedOption('');
				document.getElementById('combosPermitidos').value = '';
				document.getElementById('radio').checked = false;
				setSaved(false);
			}, 1200);
		}
	};

	const saveLimitOfComboAndCreateCombo = () => {
		// e.preventDefault();
		if (
			limitOfCombo.nivelCombo.trim() === '' ||
			limitOfCombo.estructuraVenta === '' ||
			parseInt(limitOfCombo.combosPermitidos) === 0 ||
			parseInt(limitOfCombo.combosPermitidos) <= 0
		) {
			setError(true);
		} else {
			setError(false);
			addLimitOfCombo({
				...limitOfCombo,
				CombosDisponibles: limitOfCombo.combosPermitidos
			});
			setSaved(true);

			setTimeout(() => {
				setLimitOfCombo(initialLimitOfCombo);
				setSaved(false);
				setSelectedOption('');
				document.getElementById('combosPermitidos').value = '0';
				document.getElementById('radio').checked = false;
                toggle();
				currentIDlimitOfCombo(limitOfCombo.IdLimite);
			}, 1200);
		}
	};

	return (
		<>
			<Container className='text-center'>
				<h2
					className='mt-3 mb-5'
					style={{
						fontFamily: 'Roboto, sans-serif',
						fontWeight: 'bold',
						fontSize: '20px',
						color: 'rgba(0, 0, 0, 0.65)'
					}}
				>
					Nuevo Límite de Combos
				</h2>

				<p
					className='mt-2 mb-3'
					style={{
						fontFamily: 'Roboto, sans-serif',
						fontSize: '14px',
						color: 'rgba(0, 0, 0, 0.65)'
					}}
				>
					Propietario: &nbsp;
					<span style={{ color: '#1890FF', fontWeight: '700' }} className='ml-1'>
						<img src={idLogo} alt='id logo' />
						{owner}
					</span>
				</p>

				<Row>
					<Col sm='6' md='6' className='mx-auto'>
						<Form>
							<FormGroup>
								<Input type='select' className='selector' name='nivelCombo' onChange={handleChange}>
									<option className='option-select' disabled defaultValue>
										Nivel del Combo
									</option>
									<option className='option-select' value='ninguno'>
										Ninguno
									</option>
									<option className='option-select' value='Oficina de Ventas'>
										Oficina de Ventas
									</option>
									<option className='option-select' value='Organizacion de Ventas'>
										Organización de Ventas
									</option>
									<option className='option-select' value='Direccion Regional de Ventas'>
										Dirección Regional de Ventas
									</option>
									<option className='option-select' value='Nacional'>
										Nacional
									</option>
								</Input>

								<div style={{ height: '4rem' }} className='mt-4'>
									{/* <SelectStructure isMulti={false} /> */}
									<Select
										value={selectedOption}
										onChange={handleChangeSelect}
										options={optionsListMCL}
										components={ <DropdownIndicator label={''}/> }
										placeholder='Estructura de Ventas'
										styles={{ control: css => ({ ...css, fontSize: '14px', textAlign: 'left' }) }}
									/>
								</div>

								<Row>
									<Col sm='9' xs='9' className='d-flex align-items-center'>
										<label className='label my-0' style={{ width: '18rem', marginLeft: '-5rem' }}>
											Combos Permitidos &nbsp;
											<span
												style={{
													fontWeight: 'bold',
													color: 'black'
												}}
											>
												!
											</span>
										</label>
										<Input
											type='number'
											min='1'
											placeholder='0'
											style={{ width: '5.5rem' }}
											className='mr-2 text-center'
											name='combosPermitidos'
											onChange={handleChange}
											id='combosPermitidos'
										/>

										<FormGroup check>
											<Label check className='mt-1 id'>
												<Input
													id='radio'
													type='radio'
													name='activo'
													value={true}
													className='mt-0'
													onChange={handleChange}
												/>{' '}
												Activo
												<span
													style={{
														fontWeight: 'bold',
														color: '#1890ff'
													}}
													className='ml-1'
												>
													!
												</span>
											</Label>
										</FormGroup>
									</Col>
								</Row>
							</FormGroup>
						</Form>
					</Col>
				</Row>
				{error && (
					<Row>
						<Col sm='6' md='6' className='mx-auto'>
							<AlertGeneric
								severity='warning'
								text='Nivel del Combo, Estructura de Ventas y Combos Permitidos son obligatorios.'
							/>
						</Col>
					</Row>
				)}
				{saved && (
					<Row>
						<Col sm='6' md='6' className='mx-auto'>
							<AlertGeneric severity='success' text='Se ha guardado el Limite de Combo' />
						</Col>
					</Row>
				)}
				<Row className='mx-auto d-flex justify-content-around mt-5' style={{ width: '58rem' }}>
					<Col md='4' className='p-0 m-0 font-weight-light'>
						<Button className='modal-button' onClick={saveAndNewLimitOfCombo} style={{ width: '300px' }}>
							Guardar y Nuevo
						</Button>
					</Col>
					<Col md='4' className='p-0 m-0 font-weight-light'>
						<Button className='modal-button' onClick={saveLimitOfCombo} style={{ width: '300px' }}>
							Guardar
						</Button>
					</Col>
					<Col md='4' className='p-0 m-0 font-weight-light'>
						<Button
							className='modal-button'
							onClick={saveLimitOfComboAndCreateCombo}
							style={{ width: '300px' }}
						>
							Guardar y Crear Combo
						</Button>
					</Col>
				</Row>
			</Container>

			<ModalCreateLimit modal={modal} setModal={setModal} toggle={toggle} id={limitOfCombo.IdLimite} />
		</>
	);
};

export default CreateLimitOfCombo;
