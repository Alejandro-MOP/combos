import React from 'react';
import { useHistory } from 'react-router';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import './ModalCreateCombo.css';

const ModalCreateCombo = ({ toggle, modal }) => {
	const history = useHistory();

	const handleClickExistingLimit = () =>{
        toggle();
		history.push('/combos-generator/limite-combos');
    }

	const handleClickNewLimit = () =>{
        toggle();
		history.push('/combos-generator/crear-limite-combo');
    }

	return (
		<>
			<Modal isOpen={modal} toggle={toggle} centered size='md'>
				<ModalHeader toggle={toggle}>
					<div className='text-center header-modal py-4'>
						Elige el tipo de combo que deseas crear:
					</div>
				</ModalHeader>
				<ModalBody className='mb-0 '>
					<Row className='d-flex justify-content-center'>
						<Col
							sm='12'
							md='12'
							className='d-flex flex-column justify-content-center align-items-center'
						>
							<Button
								className='mb-3 button-combo'
								onClick={() => handleClickExistingLimit()}
							>
								Con ID Límite Existente
							</Button>
							<Button
								className='mb-3 button-combo'
								onClick={() => handleClickNewLimit()}
							>
								Con Nuevo ID Límite
							</Button>
						</Col>
					</Row>
				</ModalBody>
			</Modal>
		</>
	);
};

export default ModalCreateCombo;
