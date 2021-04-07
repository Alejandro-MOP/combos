/*	COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: modal for the capture and save information on "limit of combo"
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      		Description.
 *
 *
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';


const ModalCreateLimit = ({ modal, setModal, toggle, id}) => {

	const history = useHistory();

	const handleClick = () => {
        toggle();
        setTimeout(() => {
			history.push('/combos-generator/crear-combo');
        }, 700);
    }

	return (
		<Modal isOpen={modal} toggle={toggle} centered size='sm' backdrop={'static'}>
			<ModalBody>
				<div className='text-center'>
					{/* <img src={OKimage} alt='ok logo' style={{ width: '40px', height: '40px' }} className='mb-3' /> */}
					<div className='ml-4 text-center header-modal'>
						Tu ID límite de combo <br/>
						ha sido creado
					</div>
					<p
						className='mb-0 my-3'
						style={{
							fontFamily:'Roboto, sans-serif',
							fontSize:'24px',
							color: 'rgba(0, 0, 0, 0.65)'
						}}
					>
						{ id }
					</p>
				</div>
			</ModalBody>
			<ModalFooter className='mx-auto my-0 pt-0'>
				<Button
					className='button-success'
					style={{
						fontFamily:'Inter, sans-serif',
						width:'200px'
					}}
					onClick={handleClick}>
					Crear Combo
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ModalCreateLimit;
