
/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: handler for table of selection general directorate sales
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
*/import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap';
import { FormControlLabel, Checkbox, Radio } from '@material-ui/core'
import DataTable from 'react-data-table-component'

import  './GeneralDirectorateSales.css';
import { AlertGeneric } from '../../index';
import TableFilter from '../TableFilter'
import { filterGeneralDirectorateSales } from '../../../helpers/tableSearchRules'

import { optionsPagination, columnsGDS  } from '../../../helpers/reactDataTable';
import { customStylesGDS } from '../../../helpers/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setRegionalSalesDirectorateAction } from '../../../redux/actions/exclusionsAndInclusionsActions';




///this is the view #0 for the Exclusions and Inclusions
const GeneralDirectorateSales =  ({setView, generalDirectorateSales, setValue, setCurrentViewTab, setCurrentNestedViewTab }) => {

    const dispatch = useDispatch();

    const setGeneralDirectorateSales = DGR => dispatch( setRegionalSalesDirectorateAction(DGR) );
    const generalDirectorateSalesStore = useSelector( state => state.exclusionsAndInclusions.SET_REGIONAL_SALES_DIRECTORATE)

    const [searchItem, setSearchItem] = useState('');
    const [foundItem, setFoundItem] = useState(generalDirectorateSales);
    const [idSAP, setIdSAP] = useState(false);
    const [rowSelect, setRowSelect] = useState(generalDirectorateSalesStore ?generalDirectorateSalesStore :[]);
    const [clear, setClear] = useState(false);
    const [error, setError] = useState(false);

    const handleChangeCheckbox = () => setIdSAP(!idSAP);

    const handleChangeInputSearch = e => {
        e.persist();
        setSearchItem( e.target.value );
    }

    useEffect(() => {
        setCurrentViewTab(1);
        setCurrentNestedViewTab(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowSelect])

    useEffect(() => {
        filterGeneralDirectorateSales(searchItem, idSAP, setFoundItem, generalDirectorateSales);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchItem])

    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

    const handleRowSelect = (state) => {
        setRowSelect(state.selectedRows);
    };

    const handleButtonCancel = () => {
        setClear(!clear);
        setRowSelect({});
        setView(0);
        setValue(0);
    }

    const handleButtonContinue = () => {
        if(rowSelect.length === 0){
            setError(true);
            return;
        }
        setGeneralDirectorateSales(rowSelect);
        setView(1);
    }



    return (
        <>
        <Container
            style={{ fontSize: '14px', width: '60rem', height: '28rem', paddingLeft:'8rem'}}
            className='pt-0 mt-0'
        >

            <Row>
                <Col sm='10' md='10'  className='text-center'>
                    <h3 className='encabezado text-center mt-2 '>
                        Direccion Regional de Ventas
                    </h3>
                </Col>
            </Row>

            {/* { loading
                ?( <Spinner /> )
                :( */}
                    <>
                        <Row>
                            <TableFilter
                                name={'search'}
                                value={searchItem}
                                onChange={handleChangeInputSearch}
                            />
                            <FormControlLabel
                                value="idSAP"
                                control={<Checkbox color="primary" onChange={handleChangeCheckbox}/>}
                                label="Buscar por lista de ID de SAP de la oficina de ventas"
                                labelPlacement="end"
                            />
                            <DataTable
                                columns={columnsGDS}
                                data={foundItem}
                                customStyles={customStylesGDS}
                                noDataComponent={<span>No se encontró ningún elemento</span>}
                                paginationComponentOptions={optionsPagination}
                                selectableRows
                                onSelectedRowsChange={handleRowSelect}
                                selectableRowsComponent={Radio}
                                clearSelectedRows={clear}
                                selectableRowSelected={row => row}
                                dense
                                striped
                                fixedHeader
                                responsive
                                highlightOnHover
                                pagination
                                selectableRowsComponentProps={selectProps}
                            />
                        </Row>

                    </>
                {/* )
            } */}
        </Container>

        {
            error &&
                (
                    <Row className='my-1'>
                        <Col sm='8' md='8' className='mx-auto'>
                            <AlertGeneric severity='warning' text='Selecciona al menos una Organizacion de Ventas' />
                        </Col>
                    </Row>
                )
        }


        {/* {
            !loading &&
                ( */}
                    <Row className='mt-1 mx-auto'>
                        <Col smd='10' md='10' className='d-flex justify-content-around' style={{marginLeft:'5rem'}}>
                            <Button
                                className='boton-exclusion'
                                onClick={handleButtonCancel}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className='boton-exclusion'
                                onClick={handleButtonContinue}
                            >
                                Continuar
                            </Button>
                        </Col>
                    </Row>
                {/* )
        } */}
    </>
    )
}

export default GeneralDirectorateSales
