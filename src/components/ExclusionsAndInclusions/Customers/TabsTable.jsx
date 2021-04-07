/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: handler of tab for the tables inclusions and exclusion in customers
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
*/
import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';

import './Customers.css';
import TableFilter from '../TableFilter';
import { filterCustomers } from '../../../helpers/tableSearchRules';
import TableOfExclusions from './TableOfExclusions';
import TableOfInclusions from './TableOfInclusions';
import ModalExclusions from './ModalExclusions';
import ModalInclusions from './ModalInclusions';
import { setClientsExclusionAction, setClientsInclusionAction, clearExclusionsAction, clearInclusionsAction } from '../../../redux/actions/exclusionsAndInclusionsActions';


const TabsTable = ({ setView, setValue, customers, setCurrentViewTab, setCurrentNestedViewTab }) =>{

	const dispatch = useDispatch();

	const setCostumersExclusion = customers => dispatch( setClientsExclusionAction(customers) );
	const setCostumersInclusion = customers => dispatch( setClientsInclusionAction(customers) );
    const clearAllExclusions = () => dispatch( clearExclusionsAction());
	const clearAllInclusions = () => dispatch( clearInclusionsAction());

	// const exclusions = useSelector(state => state.exclusionsAndInclusions.fileNamesExclusions);

	const newCustomers = customers && customers.map( item => {
		let obj = {};
		obj['id'] = item.id;
		obj['nombre'] = item.nombre;
		obj['oficinaVentas'] = `${item.idOV} ${item.oficinaVentas}`;
		obj['agrupadorPrecios'] = item.agrupadorPrecios;
		return obj;
	});

	//for Tabs
	const [activeTab, setActiveTab] = useState('1');
	//for the TableFilter
	const [searchItem, setSearchItem] = useState('');
	const [idSAP, setIdSAP] = useState(false);
	//for Data on DataTable
	const [foundItem, setFoundItem] = useState(newCustomers);
	const [clear, setClear] = useState(false);
	//for DataTable -> Exclusions
	const [rowSelectExclusions, setRowSelectExclusions] = useState([]);
	//for DataTable -> Inclusions
	const [rowSelectInclusions, setRowSelectInclusions] = useState([]);

	//Modals
	const [modalExclusion, setModalExclusion] = useState(false);
	const [modalInclusion, setModalInclusion] = useState(false);

	const [exclusionsFiles, setExclusionsFiles] = useState(false);

	useEffect(() => {
        setCurrentViewTab(1);
        setCurrentNestedViewTab(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowSelectExclusions, rowSelectInclusions, ])

	//for Tabs
	const toggle = tab => activeTab !== tab && setActiveTab(tab);

	//for the TableFilter
	const handleChangeCheckbox = () => setIdSAP(!idSAP);

	//for Data on DataTable
	const handleChangeInputSearch = e => {
		e.persist();
		setSearchItem(e.target.value);
		filterCustomers(searchItem, idSAP, setFoundItem, newCustomers);
	};

	//for DataTable -> Exclusions
	const handleRowSelectExclusions = state => setRowSelectExclusions(state.selectedRows);

	const handleCancelExclusions = () => {
		setRowSelectExclusions([]);
		clearAllExclusions();
		setView(2);
	}

	const handleClickExclusions = () => {
		if(rowSelectExclusions.length === 0 || exclusionsFiles === false){
			setActiveTab('2');
		} else {
			setCostumersExclusion(rowSelectExclusions);
			setModalExclusion(true);
		}
	}

	//for DataTable -> Inclusions
	const handleRowSelectInclusions = state => setRowSelectInclusions(state.selectedRows);

	const handleCancelInclusions = () => {
		setRowSelectInclusions([]);
		clearAllInclusions();
		toggle('1');
	}

	const handleClickInclusions = () => {
		if(rowSelectInclusions.length === 0	){
			setValue(2);
		} else {
			setCostumersInclusion(rowSelectInclusions);
			setModalInclusion(true);
		}
	}

	//for modals
	const toggleExclusions = () => setModalExclusion(!modalExclusion);
	const toggleInclusions = () => setModalInclusion(!modalInclusion);




	return (
		<>
			<div>
				<TableFilter name={'search'} value={searchItem} onChange={handleChangeInputSearch} />
				<FormControlLabel
					value='idSAP'
					control={<Checkbox color='primary' onChange={handleChangeCheckbox} />}
					label='Buscar por lista de ID de SAP de la oficina de ventas'
					labelPlacement='end'
				/>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === '1' })}
							onClick={() => {
								toggle('1');
							}}>
							Exclusiones
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === '2' })}
							onClick={() => {
								toggle('2');
							}}>
							Inclusiones
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
					<TabPane tabId='1'>
						<TableOfExclusions
							foundItem={foundItem}
							handleRowSelect={handleRowSelectExclusions}
							clear={clear}
							setExclusionsFiles={setExclusionsFiles}
						/>
					</TabPane>
					<TabPane tabId='2'>
						<TableOfInclusions
							foundItem={foundItem}
							handleRowSelect={handleRowSelectInclusions}
							clear={clear}
						/>
					</TabPane>
				</TabContent>
			</div>

			{activeTab === '1' && (
				<div className='mt-4 d-flex justify-content-beetwen' style={{ position: 'relative', left: '-6%' }}>
					<Button className='boton-exclusion mr-2' onClick={handleCancelExclusions}>
						Cancelar
					</Button>
					<Button className='boton-exclusion ml-2' onClick={handleClickExclusions}>
						{(rowSelectExclusions.length === 0 || exclusionsFiles===false) ? 'Continuar' : 'Excluir'}
					</Button>
				</div>
			)}
			{activeTab === '2' && (
				<div className='mt-4 d-flex justify-content-beetwen' style={{ position: 'relative', left: '-6%' }}>
					<Button className='boton-exclusion mr-2' onClick={handleCancelInclusions}>
						Cancelar
					</Button>
					<Button className='boton-exclusion ml-2' onClick={handleClickInclusions}>
						{rowSelectInclusions.length === 0 ? 'Continuar' : 'Incluir'}
					</Button>
				</div>
			)}
			<ModalExclusions
				toggleExclusions={toggleExclusions}
				modal={modalExclusion}
				setActiveTab={setActiveTab}
				setRowSelectExclusions={setRowSelectExclusions}
			/>

			<ModalInclusions
				toggleInclusions={toggleInclusions}
				modal={modalInclusion}
				setActiveTab={setActiveTab}
				setRowSelectInclusions={setRowSelectInclusions}
				setValue={setValue}
			/>
		</>
	);
};

export default TabsTable;
