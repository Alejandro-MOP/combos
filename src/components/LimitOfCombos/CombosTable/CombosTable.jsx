/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: handler first table in the limits of combo
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

import TrashIcon from '../../../assets/images/Trash.png';
import { optionsPagination } from '../../../helpers/reactDataTable';
import { customStylesCT } from '../../../helpers/styles';
import { Spinner } from '../../index';
import { getAllLimitOfCombosAction } from '../../../redux/actions/limitOfCombosActions';
import { createIDLimitOfComboAction } from '../../../redux/actions/limitOfCombosActions.js';
import { useHistory } from 'react-router';


const CombosTable = () => {

	const history = useHistory();

	/*    Redux     */
    const dispatch = useDispatch();
	const limitsOfCombos = useSelector(state => state.limitOfCombos.limitsOfCombos);
	const loading = useSelector(state => state.limitOfCombos.loading);
    const getLimitsCombos = () => dispatch(getAllLimitOfCombosAction());
	const currentIDlimitOfCombo = id => dispatch(createIDLimitOfComboAction(id));

	/*    Local State     */

	useEffect(() => {
		getLimitsCombos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const createCombo = idLimitOfCombo => {
		currentIDlimitOfCombo(idLimitOfCombo);
		history.push('/combos-generator/crear-combo');
	}

	const columnsCombosTable = [
		{ name: '', selector: 'id', sortable: true, width: '5rem', center: true },
		{ name: 'ID Límite', selector: 'IdLimite', sortable: true },
		{ name: 'Nivel del Combo', selector: 'nivelCombo', sortable: true, width: '15rem' },
		{ name: 'Estructura de Ventas', selector: 'estructuraVenta', sortable: true, width: '12rem' },
		{ name: 'Combos Permitidos', selector: 'combosPermitidos', wrap: true, sortable: true, center: true, width: '11rem' },
		{ name: 'Combos Disponibles', selector: 'CombosDisponibles', sortable: true, center: true, width: '11rem' },
		{ name: 'ID Combo', selector: 'idCombo', sortable: true, center: true },
		{
			name: '',
			selector: '',
			center: true,
			width: '6.2rem',
			cell: row => (
				<p className='m-0 link-table'>Ver Detalle</p>
			)
		},
		{
			name: '',
			selector: '',
			center: true,
			width: '7.1rem',
			cell: row => (
				<p
					className='m-0 link-table'
					value={row.IdLimite}
					name={row.IdLimite}
					onClick={() => createCombo(row.IdLimite)}
				>
					Crear Combo
				</p>
			),
		},
		{
			name:'',
			selector: '',
			center: true,
			width: '3rem',
			cell: row => (
				<img
					src={TrashIcon}
					alt='Trash icon'
					style={{ height:'18px', width: '14px', cursor:'pointer' }}
					value={row.sku}
					name={row.sku}
					onClick={ 'e => handleDeselectOption(e)'}
				/>
			)
		}
	];


	const component = loading ? (
		<Spinner />
	) : (
		<>
			<DataTable
				columns={columnsCombosTable}
				data={limitsOfCombos}
				customStyles={customStylesCT}
				paginationComponentOptions={optionsPagination}
				noDataComponent={<span>No se encontró ningún elemento</span>}
				// paginationResetDefaultPage={resetPaginationToggle}
				// subHeaderComponent={subHeaderComponentMemo}
				dense
				striped
				fixedHeader
				responsive
				subHeader
				highlightOnHover
				pagination
			/>
			{/* <p className='total'>{limitsOfCombos.length} Elementos.</p> */}
		</>
	);

	return <div style={{ marginTop: '-.55rem' }}>{component}</div>;
};

export default CombosTable;
