/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: it is option of "Combos" for the navigation in the application,
 * 	inside it has the configuration to url that will be sent
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

import { ModalCreateCombo } from '../../../index';

const Combos = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [modal, setModal] = useState(false);

	const toggleDropDownMenu = () => setDropdownOpen(!dropdownOpen);
	const toggleModal = () => setModal(!modal);

	return (
		<div>
			<Dropdown nav isOpen={dropdownOpen} toggle={toggleDropDownMenu}>
				<DropdownToggle nav caret className='text pl-1'>
					Combos
				</DropdownToggle>
				<DropdownMenu className='submenu'>
					<DropdownItem
						className='option'
						onClick={toggleModal}
					>
							Crear Combo
					</DropdownItem>
					<DropdownItem className='option'>Detalle</DropdownItem>
					<DropdownItem className='option'>Relacionado</DropdownItem>
				</DropdownMenu>
			</Dropdown>

			<ModalCreateCombo
				toggle={toggleModal}
				modal={modal}
			/>
		</div>
	);
};

export default Combos;
