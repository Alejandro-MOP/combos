import React, { useEffect, useState } from 'react';
import { Col, Row, Input, Container, Button, Label } from 'reactstrap';
import EmojiIcon from '@atlaskit/icon/glyph/search';
import Select, { components } from 'react-select';
import CurrencyInput from 'react-currency-input-field';
import { useDispatch, useSelector } from 'react-redux';

import ModalSelectionQuota from './ModalSelectionQuota';
import imageTrash from '../../../assets/images/Trash.png';
import imageEye from '../../../assets/images/eye.png';
import { setQuotasAction, clearQuotasAction } from '../../../redux/actions/searchMaterialsActions';
import { formatterPesos } from '../../../helpers/materials';

const DropdownIndicator = props => {
	return (
		<components.DropdownIndicator {...props}>
			<EmojiIcon primaryColor={'#666666'} />
		</components.DropdownIndicator>
	);
};

const optionListCategories = [
	{ value: 'Familiar', label: '01 Familiar', sku: '01' },
	{ value: 'Media', label: '02 Media', sku: '02' },
	{ value: 'Cuarto', label: '03 Cuarto', sku: '03' },
	{ value: 'Barril', label: '04 Barril', sku: '04' },
	{ value: 'Mega', label: '05 Mega', sku: '05' },
	{ value: 'Bote', label: '06 Bote', sku: '06' },
	{ value: 'Media Importado', label: '07 Media Importado', sku: '07' },
	{ value: 'Bote Importado', label: '08 Bote Importado', sku: '08' },
	{ value: 'Litro Importado', label: '09 Litro Importado', sku: '09' },
	{ value: 'Agua', label: '10 Agua', sku: '10' },
	{ value: 'Refresco', label: '11 Refresco', sku: '11' },
	{ value: 'Jugos', label: '12 Jugos', sku: '12' },
	{ value: 'Agua natural', label: '13 Agua natural', sku: '13' },
	{ value: 'Agua sabor', label: '14 Agua sabor', sku: '14' },
	{ value: 'Agua mineralizada', label: '15 Agua mineralizada', sku: '15' },
	{ value: 'Té', label: '16 Té', sku: '16' },
	{ value: '710', label: '17 710', sku: '17' },
	{ value: 'Latón', label: '18 Latón', sku: '18' }
];

const Quota = ({ setView, setValue, products }) => {
	/*	REDUX	*/
	const dispatch = useDispatch();

	const setQuotas = quotas => dispatch(setQuotasAction(quotas));
	const clearQuotas = () => dispatch( clearQuotasAction() );

	const quotasStore = useSelector(state => state.materials.SET_quota);
	const productsStore = useSelector(state => state.materials.SET_products);

	/*	LOCAL STATE	*/
	const [listCategories, setListCategories] = useState(optionListCategories);
	const [categoryList, setCategoryList] = useState([]);
	const [familyCategoryList, setFamilyCategoryList] = useState([]);

	const [selectedCategory, setSelectedCategory] = useState('');
	const [modal, setModal] = useState(false);

	const [quotaItems, setQuotaItems] = useState(quotasStore ? quotasStore : []);
	const [total, setTotal] = useState(0);

	const [selectableRowsQuota, setSelectableRowsQuota] = useState([]);

	const toggle = () => setModal(!modal);

	const handleSelect = ({ value }) => setSelectedCategory(value);

	const handleChangeSelectCategory = () => {
		const categoryList = products.filter(obj => obj.categoria === selectedCategory);
		const familyCategories = categoryList.map(obj => obj.familia);
		const uniqueFamilyCategories = [...new Set(familyCategories)];
		setCategoryList(categoryList);
		setFamilyCategoryList(uniqueFamilyCategories);
	};

	useEffect(() => {
		if (selectedCategory === '') return;
		handleChangeSelectCategory();
		toggle();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory]);

	useEffect(() => {
		const listFilteredCategory = listCategories.filter(obj => obj.value !== selectedCategory);
		setListCategories(listFilteredCategory);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory]);

	useEffect(() => {
		const totalAmountProducts = productsStore.reduce((acc, el) => acc + el.totalImpuestos, 0);
		const totalAmountQuota = quotaItems.reduce((acc, el) => acc + el.totalImpuestos, 0);
		setTotal(totalAmountQuota + totalAmountProducts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quotaItems]);

	const handleQuotaItems = quotaGroup => {
		const repeatedQuota = quotaItems.filter(obj => obj.sku === quotaGroup.sku);
		const quotaWithoutRepetition = quotaItems.filter(obj => obj.sku !== quotaGroup.sku);

		if (repeatedQuota.length === 1 && quotaWithoutRepetition.length === 0) {
			setQuotaItems([quotaGroup]);
			return;
		}
		if (repeatedQuota.length === 1 && quotaWithoutRepetition.length >= 1) {
			setQuotaItems([quotaWithoutRepetition, quotaGroup].flat());
			return;
		}
		setQuotaItems([...quotaItems, quotaGroup]);
	};

	const handleInputChange = e => {
		const { id, value } = e.target;
		const updatedQuota = quotaItems.map(item => {
			let obj = {};

			item.sku === id
				? (obj['cantidad'] = value === '' ? 0 : parseInt(value))
				: (obj['cantidad'] = parseInt(item.cantidad));
			obj['sku'] = item.sku.toString();
			obj['material'] = item.material;
			obj['precioUnitarioImpuestos'] = parseFloat(item.precioUnitarioImpuestos);
			obj['precioUnitario'] = parseFloat(item.precioUnitario);
			obj['total'] = parseFloat(
				(item.sku === id ? (value === '' ? 0 : parseInt(value)) : parseInt(item.cantidad)) * item.precioUnitario
			);
			obj['totalImpuestos'] = parseFloat(
				(item.sku === id ? (value === '' ? 0 : parseInt(value)) : parseInt(item.cantidad)) *
					item.precioUnitarioImpuestos
			);
			obj['tipo'] = item.tipo;

			return obj;
		});
		setQuotaItems(updatedQuota);
	};

	const handleInputCurrencyChange = e => {
		const { id, value, name } = e.target;
		const valueFloat = value === '' ? 0 : parseFloat(value).toFixed(2);
		const floatValue = parseFloat(valueFloat);

		console.log(value);

		if (name === 'precioUnitarioImpuestos') {
			const updatedQuota = quotaItems.map(item => {
				let obj = {};

				item.sku === id
					? (obj['precioUnitarioImpuestos'] = floatValue)
					: (obj['precioUnitarioImpuestos'] = item.precioUnitarioImpuestos);
				obj['precioUnitario'] = parseInt(item.precioUnitario);
				obj['sku'] = item.sku.toString();
				obj['material'] = item.material;
				obj['cantidad'] = parseInt(item.cantidad);
				obj['total'] = parseFloat(item.cantidad * item.precioUnitario).toFixed(2);
				obj['totalImpuestos'] = parseFloat(
					(item.cantidad * (item.sku === id ? floatValue : item.precioUnitarioImpuestos)).toFixed(2)
				);
				obj['tipo'] = item.tipo;

				return obj;
			});
			setQuotaItems(updatedQuota);
			return;
		}

		if (name === 'precioUnitario') {
			const updatedQuota = quotaItems.map(item => {
				let obj = {};

				item.sku === id ? (obj['precioUnitario'] = floatValue) : (obj['precioUnitario'] = item.precioUnitario);
				obj['precioUnitarioImpuestos'] = item.precioUnitarioImpuestos;
				obj['sku'] = item.sku.toString();
				obj['material'] = item.material;
				obj['cantidad'] = item.cantidad;
				obj['total'] = parseFloat(item.cantidad * (item.sku === id ? floatValue : item.precioUnitario)).toFixed(
					2
				);
				obj['totalImpuestos'] = parseFloat((item.cantidad * item.precioUnitarioImpuestos).toFixed(2));
				obj['tipo'] = item.tipo;

				return obj;
			});
			setQuotaItems(updatedQuota);
			return;
		}
	};

	const handleDeleteItem = idSKU => {
		//find the item to add it back to the picklist
		const categoryAdd = optionListCategories.filter(obj => obj.sku === idSKU);
		setListCategories([...listCategories, categoryAdd].flat());

		//remove the item from the list of selected quota
		const newListQuota = quotaItems.filter(obj => obj.sku !== idSKU);
		setQuotaItems(newListQuota.sort());
	};

	const handleAddMoreItemsQuota = quota => {
		const { material } = quota;
		const { categoria } = material[0];

		setSelectedCategory(categoria);
		setSelectableRowsQuota(material);
	};

	const handleCancel = () => {
		setQuotaItems([]);
		clearQuotas();
		setListCategories(optionListCategories);
	};

	const handleContinue = () => {
		setQuotas(quotaItems);
		setTimeout(() => setValue(3), 1000);
	};

	return (
		<>
			<Row className='mt-4'>
				<Col sm='10' md='10' className='mx-auto h-25'>
					<Select
						value={selectedCategory}
						onChange={handleSelect}
						options={listCategories}
						components={{ DropdownIndicator }}
						placeholder={'Ingresa tu Busqueda'}
						styles={{
							control: css => ({ ...css, height: '.5rem' }),
							valueContainer: css => ({ ...css, position: 'initial', fontSize: '13px' }),
							option: css => ({ ...css, fontSize: '13px', paddingTop: '4px', paddingBottom: '4px' })
						}}
						noOptionsMessage={() => (
							<p className='m-0'>No hay resultados encontrados, verifica tu busqueda.</p>
						)}
						isClearable
					/>
				</Col>
			</Row>

			{(quotaItems.length > 0 || productsStore.length > 0) && (
				<>
					<div className='mt-4' style={{ border: '1px solid rgba(0, 0, 0, 0.15)' }}>
						<Row className=' text-center mx-0'>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'
							>
								<p>Tipo</p>
							</Col>
							<Col
								sm='2'
								md='2'
								className='column-header d-flex align-items-center justify-content-center'
							>
								<p>SKU / Código</p>
							</Col>
							<Col
								sm='3'
								md='3'
								className='column-header d-flex align-items-center justify-content-center'
							>
								<p>Material / Cupo</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'
							>
								<p>Cantidad</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'
							>
								<p className=''>
									Precio Unitario <hr className='m-0 p-0 border-0' />
									c/Impuestos
								</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'
							>
								<p className=''>Precio Unitario</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'
							>
								<p>Total</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'
							>
								<p>Total con Impuestos</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'
							>
								<p> </p>
							</Col>
						</Row>

						{productsStore.length > 0 &&
							productsStore.map(item => (
								<Row key={item.sku} className='text-center'>
									<Col
										sm='1'
										md='1'
										className='d-flex align-items-center justify-content-center py-1'
									>
										<p className='m-0 text-summary pl-4'>Producto</p>
									</Col>
									<Col
										sm='2'
										md='2'
										className='d-flex align-items-center justify-content-center py-1'
									>
										<p className='m-0 text-summary'>{item.sku}</p>
									</Col>
									<Col
										sm='3'
										md='3'
										className='d-flex align-items-center justify-content-center py-1 px-0'
									>
										<p
											className='m-0 text-summary'
											style={{ fontWeight: 'bold', fontSize: '12px' }}
										>
											{item.material}
										</p>
									</Col>
									<Col
										sm='1'
										md='1'
										className='d-flex align-items-center justify-content-center py-1'
									>
										<Input
											id={item.sku}
											type='number'
											min='1'
											style={{ height: '28px', fontSize: '14px' }}
											className='text-center'
											name='cantidad'
											placeholder='0'
											value={item.cantidad}
											// onChange={handleInputChange}
											fixedDecimalLength={2}
											disabled
										/>
									</Col>
									<Col sm='1' md='1' className='d-flex align-items-center justify-content-center'>
										<CurrencyInput
											id={item.sku}
											name='precioUnitarioImpuestos'
											placeholder={item.precioUnitarioImpuestos}
											decimalsLimit={2}
											// onChange={handleInputCurrencyChange}
											style={{ height: '28px', fontSize: '14px', width: '79px' }}
											className='text-center form-control'
											disabled
										/>
									</Col>
									<Col sm='1' md='1' className='d-flex align-items-center justify-content-center '>
										<Input
											type='number'
											min='1'
											placeholder='-'
											className='text-center'
											style={{ height: '28px', fontSize: '14px', width: '79px' }}
											disabled
										/>
									</Col>
									<Col
										sm='1'
										md='1'
										className='d-flex align-items-center justify-content-center py-1'
									>
										<p className='m-0 text-summary'>{'-'}</p>
									</Col>
									<Col
										sm='1'
										md='1'
										className='d-flex align-items-center justify-content-center py-1'
									>
										<p className='m-0 text-summary'>{formatterPesos.format(item.totalImpuestos)}</p>
									</Col>
									<Col
										sm='1'
										md='1'
										className='d-flex align-items-center justify-content-center py-1'
									>
										{/* <img
											style={{ cursor: 'pointer' }}
											src={imageTrash}
											alt='trash logo'
											onClick={'() => handleDeleteItem(item.sku)'}
										/> */}
									</Col>
								</Row>
							))}

						{quotaItems.map(item => (
							<Row key={item.sku} className='text-center'>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center py-1'>
									<p className='m-0 text-summary pl-4'>Cupo</p>
								</Col>
								<Col sm='2' md='2' className='d-flex align-items-center justify-content-center py-1'>
									<p className='m-0 text-summary'>{item.sku}</p>
								</Col>
								<Col
									sm='3'
									md='3'
									className='d-flex align-items-center justify-content-center py-1 px-0'
								>
									<p
										className='m-0 text-summary material'
										style={{ fontWeight: 'bold', fontSize: '12px' }}
										onClick={() => handleAddMoreItemsQuota(item)}
									>
										{item.material[0].categoria}
										<img
											src={imageEye}
											alt='logo eye'
											className='mt-1 ml-3'
											style={{
												height: '10px',
												width: '17px'
											}}
										/>
									</p>
								</Col>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center py-1'>
									<Input
										id={item.sku}
										type='number'
										min='1'
										style={{ height: '28px', fontSize: '14px' }}
										className='text-center'
										name='cantidad'
										placeholder='0'
										value={item.cantidad}
										onChange={handleInputChange}
										fixedDecimalLength={2}
									/>
								</Col>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center '>
									<CurrencyInput
										id={item.sku}
										name='precioUnitarioImpuestos'
										placeholder={item.precioUnitarioImpuestos}
										decimalsLimit={2}
										onChange={handleInputCurrencyChange}
										style={{ height: '28px', fontSize: '14px', width: '79px' }}
										className='text-center form-control'
										// value={ item.precioUnitarioImpuestos }
									/>
								</Col>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center '>
									<CurrencyInput
										id={item.sku}
										name='precioUnitario'
										placeholder={item.precioUnitario}
										decimalsLimit={2}
										onChange={handleInputCurrencyChange}
										style={{ height: '28px', fontSize: '14px', width: '79px' }}
										className='text-center form-control'
										// value={ item.precioUnitario }
									/>
								</Col>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center py-1'>
									<p className='m-0 text-summary'>{formatterPesos.format(item.total)}</p>
								</Col>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center py-1'>
									<p className='m-0 text-summary'>{formatterPesos.format(item.totalImpuestos)}</p>
								</Col>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center py-1'>
									<img
										style={{ cursor: 'pointer' }}
										src={imageTrash}
										alt='trash logo'
										onClick={() => handleDeleteItem(item.sku)}
									/>
								</Col>
							</Row>
						))}
						<Row className='d-flex justify-content-end pr-5 pt-3'>
							<Col sm='3' md='3' className='text-right pr-5'>
								<p className='text-total'>Total {formatterPesos.format(total)}</p>
							</Col>
						</Row>
					</div>
					<Row className='mt-2 d-flex justify-content-end '>
						<Label
							className='mr-4 delete-all'
							style={{fontSize:'14px'}}
							onClick={ handleCancel }
						>
							Borrar todos los materiales cupo
						</Label>
					</Row>
					<Container className='mt-5 pt-3 px-5 mx-2'>
						<div className='d-flex justify-content-between'>
							<Button className='boton-exclusion mx-4' onClick={handleCancel}>
								Cancelar
							</Button>
							<Button className='boton-exclusion mx-4' onClick={handleContinue}>
								Continuar
							</Button>
						</div>
					</Container>
				</>
			)}
			{modal && categoryList.length > 0 && (
				<ModalSelectionQuota
					modal={modal}
					toggle={toggle}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					categoryList={categoryList}
					familyCategoryList={familyCategoryList}
					handleQuotaItems={handleQuotaItems}
					selectableRowsQuota={selectableRowsQuota}
					setSelectableRowsQuota={setSelectableRowsQuota}
				/>
			)}
		</>
	);
};

export default Quota;
