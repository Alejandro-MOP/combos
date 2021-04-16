/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: it is option of "Limite de Combos" for the navigation in the application,
 * 	inside it has the configuration to url that will be sent
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
 */
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const LimiteCombos = () => {
    const history = useHistory();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);

    const redirectCreateLimitOfCombo = () => history.push('/combos-generator/crear-limite-combo');

    const redirectAllLimitOfCombo = () => history.push('/combos-generator/limite-combos');


    return (
        <div>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret className='text pl-1'>
                    Limite de Combos
                </DropdownToggle>
                <DropdownMenu className='submenu'>
                    <DropdownItem className='option' onClick={redirectCreateLimitOfCombo}>
                        {/* <Link to={'/combos-generator/crear-limite-combo'}> */}
                            Crear Límite del Combo
                        {/* </Link> */}
                    </DropdownItem>
                    <DropdownItem className='option'>Agregados Recientemente</DropdownItem>
                    <DropdownItem className='option'onClick={redirectAllLimitOfCombo}>
                        {/* <Link to={'/combos-generator/limite-combos'}> */}
                            Todos los Límites de Combos
                        {/* </Link> */}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default LimiteCombos
