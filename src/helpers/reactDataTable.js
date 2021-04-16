/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: In this document I generated the configurations for the
 *  react-data-table tables, each export contains the location of where it is used
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
*/

//for al tables
export const optionsPagination = {
    rowsPerPageText: 'Registros por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: '*'
};

//for GeneralDirectorateSales.jsx
export const columnsGDS = [
    { name: 'Número SAP', selector: 'id', sortable: true },
    { name: 'Nombre', selector: 'nombre', sortable: true },
    { name: 'Dirección Regional de Ventas', selector: 'direccionRegionalVentas', sortable: true }
];

//for TableOfExclusions.jsx
export const columnsExclusions = [
    { name: 'Número SAP', selector: 'id', sortable: true },
    { name: 'Nombre', selector: 'nombre', sortable: true },
    { name: 'Oficina de Ventas', selector: 'oficinaVentas', sortable: true },
    { name: 'Agrupador de precios', selector: 'agrupadorPrecios', sortable: true }
];

//for TableOfInclusions.jsx
export const columnsInclusions = [
    { name: 'Número SAP', selector: 'id', sortable: true },
    { name: 'Nombre', selector: 'nombre', sortable: true },
    { name: 'Oficina de Ventas', selector: 'oficinaVentas', sortable: true },
    { name: 'Agrupador de precios', selector: 'agrupadorPrecios', sortable: true }
];

//for SalesOffice.jsx
export const columnsSalesOffice = [
    { name: 'Número SAP', selector: 'id', sortable: true },
    { name: 'Nombre', selector: 'nombre', sortable: true },
    { name: 'Organización de Ventas', selector: 'direccionRegionalVentas', sortable: true }
];

//for SalesOrganization.jsx
export const columnsSalesOrganziation = [
    { name: 'Número SAP', selector: 'id', sortable: true },
    { name: 'Nombre', selector: 'nombre', sortable: true },
    { name: 'Dirección Regional de Ventas', selector: 'direccionRegionalVentas', sortable: true }
];

//for CombosTable.jsx
// export const columnsCombosTable = [
//     { name: '', selector: 'id', sortable: true, width: '5rem', center: true },
//     { name: 'ID Límite', selector: 'IdLimite', sortable: true },
//     { name: 'Nivel del Combo', selector: 'nivelCombo', sortable: true, width: '15rem' },
//     { name: 'Estructura de Ventas', selector: 'estructuraVenta', sortable: true, width: '12rem' },
//     { name: 'Combos Permitidos', selector: 'combosPermitidos', wrap: true, sortable: true, center: true, width: '11rem' },
//     { name: 'Combos Disponibles', selector: 'CombosDisponibles', sortable: true, center: true, width: '11rem' },
//     { name: 'ID Combo', selector: 'idCombo', sortable: true, center: true },
//     {
//         name: '',
//         selector: '',
//         center: true,
//         width: '6.2rem',
//         cell: row => (
//             <p className='m-0' style={{
//                 fontFamily: 'Inter, sans-serif',
//                 fontSize: '12px',
//                 fontWeight: '600',
//                 textDecoration: 'underline',
//                 color: '#1890ff',
//                 cursor: 'pointer'
//             }}>Ver Detalle</p>
//         )
//     },
//     {
//         name: '',
//         selector: '',
//         center: true,
//         width: '7.1rem',
//         cell: row => (
//             <p className='m-0' style={{
//                 fontFamily: 'Inter, sans-serif',
//                 fontSize: '12px',
//                 fontWeight: '600',
//                 textDecoration: 'underline',
//                 color: '#1890ff',
//                 cursor: 'pointer'
//             }}>Crear Combo</p>
//         )
//     },
//     {
//         name:'',
//         selector: '',
//         center: true,
//         cell: row => (
//             <img
// 					src={TrashIcon}
// 					alt='Trash icon'
// 					style={{
// 						height:'18px',
// 						width: '14px',
// 						cursor:'pointer'
// 					}}
// 					value={row.sku}
// 					name={row.sku}
// 					onClick={ e => handleDeselectOption(e)}
// 				/>
//         )
//     }
// ];