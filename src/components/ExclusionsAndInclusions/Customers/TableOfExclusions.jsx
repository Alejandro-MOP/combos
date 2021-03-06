/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: Table with info for selection of exclusions in customers
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
*/
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Radio } from '@material-ui/core';

import DataTable from 'react-data-table-component';
import { optionsPagination, columnsExclusions } from '../../../helpers/reactDataTable';
import { customStyles } from '../../../helpers/styles';


const TableOfExclusions = ({ foundItem, handleRowSelect, clear }) => {
	return (
		<>
			<Row>
				<Col sm='12'>
					<DataTable
						columns={columnsExclusions}
						data={foundItem}
						customStyles={customStyles}
						noDataComponent={<span>No se encontró ningún elemento</span>}
						paginationComponentOptions={optionsPagination}
						selectableRows
						onSelectedRowsChange={handleRowSelect}
						selectableRowsComponent={Radio}
						clearSelectedRows={clear}
						dense
						striped
						fixedHeader
						responsive
						highlightOnHover
						pagination
					/>
				</Col>
			</Row>
            <Row>
                <Col>
                    
                </Col>
            </Row>
		</>
	);
};

export default TableOfExclusions;