import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';

import OKimage from '../../assets/images/ok.png';

const ModalSendCombo = ({ idCombo, toggle, modal, clearIdLimitComboStore, clearDataComboStore, clearExclusionsAndInclusionsStore, clearMaterialsStore, clearAllIndexViews}) => {

	//TODO: limpiar el store para no dejar registro del combo creado previamente

	const history = useHistory();

	const [nestedModal, setNestedModal] = useState(false);
	const [closeAll, setCloseAll] = useState(false);

	const toggleNested = () => {
		//TODO: send data with REDUX
		//TODO: REDIRECT

		setNestedModal(!nestedModal);
		setCloseAll(false);
	};

	const toggleAll = () => {
		setNestedModal(!nestedModal);
		setCloseAll(true);
		setTimeout(() => {
			clearIdLimitComboStore();
			clearDataComboStore();
			clearExclusionsAndInclusionsStore();
			clearMaterialsStore();
			clearAllIndexViews();
			history.push('/combos-generator');
		}, 1000);
	};

	const toggleClear = () => {
		// setRowSelectExclusions([]);
		// clearAllExclusions();
		toggle();

	};

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle} centered size='sm'>
				<ModalHeader toggle={toggle}>
					<div className='ml-4 text-center header-modal'>¿Está seguro de solicitar aprobación del combo?</div>
				</ModalHeader>

				<ModalBody className='mb-0'>
					<p className='m-2 file-names text-center'>COMBO {idCombo}</p>
				</ModalBody>

				<Row className='px-4 mb-3'>
					<Col sm='6' md='6'>
						<Button className='button-ghost' block onClick={toggleClear}>
							No
						</Button>
					</Col>
					<Col sm='6' md='6'>
						<Button className='button-success primary' block onClick={toggleNested}>
							Si
						</Button>
					</Col>
				</Row>
			</Modal>

			{/* Nested Modal to confirmation */}
			<Modal
				isOpen={nestedModal}
				toggle={toggleNested}
				onClosed={closeAll ? toggle : undefined}
				centered
				size='sm'
			>
				<ModalBody>
					<div className='text-center'>
						<img src={OKimage} alt='ok logo' style={{ width: '40px', height: '40px' }} className='mb-3' />
						<div className='ml-4 text-center header-modal'>
							Tu combo se ha enviado para aprobación con éxito
						</div>
					</div>
				</ModalBody>
				<ModalFooter className='mx-auto'>
					<Button className='button-success' onClick={toggleAll}>
						Aceptar
					</Button>
				</ModalFooter>
			</Modal>
			{/* Nested Modal to confirmation */}
		</div>
	);
};

export default ModalSendCombo;
