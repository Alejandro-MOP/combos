import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import EmojiIcon from '@atlaskit/icon/glyph/search';
import Select, { components } from 'react-select';
import CurrencyInput from 'react-currency-input-field';
import { useDispatch, useSelector } from 'react-redux';

import '../SearchMaterials.css';
import imageTrash from '../../../assets/images/Trash.png';
import { setProductsAction, clearProductsAction } from '../../../redux/actions/searchMaterialsActions';

let formatterPesos = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
});

const DropdownIndicator = props => {
	return (
		<components.DropdownIndicator {...props}>
			<EmojiIcon primaryColor={'#666666'} />
		</components.DropdownIndicator>
	);
};

const Products = ({ setView, setValue, products, handleButtonActiveQuota }) => {
	/*	Redux	*/
	const dispatch = useDispatch();

	const productStore = useSelector( state => state.materials.SET_products );

	const setProducts = products => dispatch( setProductsAction(products) );
	const clearProducts = () => dispatch( clearProductsAction() );

	/*	Local State */
	const optionListProducts = products.map(item => {
		let obj = {};
		obj['label'] = item.sku + '   ' + item.material;
		obj['value'] = item.sku;
		return obj;
	});

	const [listProducts, setListProducts] = useState(optionListProducts.sort());
	const [selectProduct, setSelectProduct] = useState('');
	const [arrayProductsSelected, setArrayProductsSelected] = useState(productStore ?productStore :[]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const listFilteredProducts = listProducts.filter(obj => obj.value !== selectProduct);
		setListProducts(listFilteredProducts.sort());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectProduct]);

	useEffect(() => {
		const totalAmount = arrayProductsSelected.reduce((acc, el) => acc + el.totalImpuestos, 0);
		setTotal(totalAmount);
		if(arrayProductsSelected.length === 0) clearProducts();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [arrayProductsSelected]);

	const handleChangeSelect = option => {
		if (!option) return;
		const { value } = option;
		setSelectProduct(value);

		const product = products.filter(obj => obj.sku === value);
		//add properties to the object "product"
		product[0].cantidad = '';
		product[0].precioUnitarioImpuestos = '';
		product[0].total = 0.0;
		product[0].totalImpuestos = 0.0;

		setArrayProductsSelected([...arrayProductsSelected, product].flat());
	};

	const handleDeleteItem = idSKU => {
		//find the item to add it back to the picklist
		const productAdd = optionListProducts.filter(obj => obj.value === idSKU);
		setListProducts([...listProducts, productAdd].flat());

		//remove the item from the list of selected products
		const newListProducts = arrayProductsSelected.filter(obj => obj.sku !== idSKU);
		setArrayProductsSelected(newListProducts.sort());
	};

	const handleInputChange = e => {
		const { id, value } = e.target;
		const updatedProduct = arrayProductsSelected.map(product => {
			let obj = {};

			product.sku === parseInt(id)
				? (obj['cantidad'] = value === '' ? 0 : parseInt(value))
				: (obj['cantidad'] = product.cantidad);
			obj['sku'] = parseInt(product.sku);
			obj['material'] = product.material;
			obj['precioUnitarioImpuestos'] = product.precioUnitarioImpuestos;
			obj['total'] = product.total;
			obj['totalImpuestos'] = parseFloat((obj.cantidad * product.precioUnitarioImpuestos).toFixed(2));

			return obj;
		});
		setArrayProductsSelected(updatedProduct);
	};

	const handleInputCurrencyChange = e => {
		const { id, value } = e.target;
		const valueFloat = value === '' ? 0 : parseFloat(value).toFixed(2);
		const floatValue = parseFloat(valueFloat);

		const updatedProduct = arrayProductsSelected.map(product => {
			let obj = {};

			product.sku === parseInt(id)
				? (obj['precioUnitarioImpuestos'] = floatValue)
				: (obj['precioUnitarioImpuestos'] = product.precioUnitarioImpuestos);
			obj['sku'] = parseInt(product.sku);
			obj['material'] = product.material;
			obj['cantidad'] = product.cantidad;
			obj['total'] = product.total;
			obj['totalImpuestos'] = parseFloat((obj['cantidad'] * obj['precioUnitarioImpuestos']).toFixed(2));

			return obj;
		});

		setArrayProductsSelected(updatedProduct);
	};

	const handleCancel = () => {
		setArrayProductsSelected([]);
		clearProducts();
	}

	const handleContinue = () => {
		setProducts(arrayProductsSelected);
		handleButtonActiveQuota()
	}

	return (
		<>
			<Row className='mt-4'>
				<Col sm='10' md='10' className='mx-auto h-25'>
					<Select
						value={''}
						onChange={handleChangeSelect}
						options={listProducts}
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
			{arrayProductsSelected.length !== 0 && (
				<>
					<div className='mt-4' style={{ border: '1px solid rgba(0, 0, 0, 0.15)' }}>
						<Row className=' text-center mx-0'>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'>
								<p>Tipo</p>
							</Col>
							<Col
								sm='2'
								md='2'
								className='column-header d-flex align-items-center justify-content-center'>
								<p>SKU / Código</p>
							</Col>
							<Col
								sm='3'
								md='3'
								className='column-header d-flex align-items-center justify-content-center'>
								<p>Material / Cupo</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'>
								<p>Cantidad</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'>
								<p className='pl-2'>
									Precio Unitario <hr className='m-0 p-0 border-0' />
									con Impuestos
								</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'>
								<p className='pl-3'>Precio Unitario</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'>
								<p>Total</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'>
								<p>Total con Impuestos</p>
							</Col>
							<Col
								sm='1'
								md='1'
								className='column-header d-flex align-items-center justify-content-center'>
								<p> </p>
							</Col>
						</Row>
						{arrayProductsSelected.map(item => (
							<Row key={item.sku} className='text-center'>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center py-1'>
									<p className='m-0 text-summary pl-4'>Producto</p>
								</Col>
								<Col sm='2' md='2' className='d-flex align-items-center justify-content-center py-1'>
									<p className='m-0 text-summary'>{item.sku}</p>
								</Col>
								<Col
									sm='3'
									md='3'
									className='d-flex align-items-center justify-content-center py-1 px-0'>
									<p className='m-0 text-summary' style={{ fontWeight: 'bold', fontSize: '12px' }}>
										{item.material}
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
								<Col
									sm='1'
									md='1'
									className='d-flex align-items-center justify-content-center pl-4 pr-1'>
									<p
										className='my-0 text-summary pr-1'
										style={{ fontSize: '14px', marginLeft: '-1rem' }}>
										$
									</p>
									<CurrencyInput
										id={item.sku}
										name='precioUnitarioImpuestos'
										placeholder={'0.00'}
										decimalsLimit={2}
										onChange={handleInputCurrencyChange}
										style={{ height: '28px', fontSize: '14px', width: '79px' }}
										className='text-center form-control'
									/>
								</Col>
								<Col
									sm='1'
									md='1'
									className='d-flex align-items-center justify-content-center pl-4 pr-3'>
									<Input
										type='number'
										min='1'
										placeholder='0'
										className='text-center'
										style={{ height: '28px', fontSize: '14px', width: '60px' }}
										disabled
									/>
								</Col>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center py-1'>
									<p className='m-0 text-summary'>$ 0.00</p>
								</Col>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center py-1'>
									<p className='m-0 text-summary'>{formatterPesos.format(item.totalImpuestos)}</p>
								</Col>
								<Col sm='1' md='1' className='d-flex align-items-center justify-content-center py-1'>
									<img src={imageTrash} alt='trash logo' onClick={() => handleDeleteItem(item.sku)} />
								</Col>
							</Row>
						))}
						<Row className='d-flex justify-content-end pr-5 pt-3'>
							<Col sm='3' md='3' className='text-right pr-5'>
								<p className='text-total'>Total {formatterPesos.format(total.toFixed(2))}</p>
							</Col>
						</Row>
					</div>

					<Container className='mt-5 pt-3 px-5 mx-2'>
						<Row className='d-flex justify-content-around'>
							<Button className='boton-exclusion ml-3' onClick={ handleCancel }>
								Cancelar
							</Button>
							<Button className='boton-exclusion mr-3' onClick={ handleContinue }>
								Continuar
							</Button>
						</Row>
					</Container>
				</>
			)}
		</>
	);
};

export default Products;