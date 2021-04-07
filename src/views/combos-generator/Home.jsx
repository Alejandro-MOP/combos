import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import { /*Head,*/ MainCard } from '../../components';
import mainLogo01 from '../../assets/images/main/main01.png';
import mainLogo02 from '../../assets/images/main/main02.png';
import mainLogo03 from '../../assets/images/main/main03.png';

const Home = () => {

    const history = useHistory();

	return (
		<>

			<Container>
				<h1
					className='my-5 py-2 text-center'
					style={{
						color: '#1890ff',
						fontFamily: 'Roboto, sans-serif',
						fontWeight: 'bold',
						fontSize: '36px'
					}}
				>
					¿Qué quieres hacer?
				</h1>
				<Row className='pt-1'>
					<Col sm='4' md='4'>
						<MainCard
							image={mainLogo01}
							text={'Crear Límite y Combo'}
							description={'Configura el ID límite y sus materiales desde cero'}
							classNameHover={'main-card-green'}
                            onClick={ () => history.push('combos-generator/crear-limite-combo') }
						/>
					</Col>
					<Col sm='4' md='4'>
						<MainCard
							image={mainLogo02}
							text={'Crear combo con límite existente'}
							description={'Podrás usar un mismo ID límite pero con diferentes materiales'}
							classNameHover={'main-card-magenta'}
						/>
					</Col>
					<Col sm='4' md='4'>
						<MainCard
							image={mainLogo03}
							text={'Clonar combo existente'}
							description={'Podrás modificar la estructura de ventas con los mismos materiales'}
							classNameHover={'main-card-purple'}
						/>
					</Col>
				</Row>
				<Row className='mt-4'>
					<Container className='text-center'>
						<p
							className='my-3'
							style={{
								fontFamily: 'Robot, sans-serif',
								fontWeight: 'bold',
								fontSize: '14px',
								textDecoration: 'underline',
                                color: '#666666'
							}}
						>
							Consultar límites y combos
						</p>
					</Container>
				</Row>
			</Container>
		</>
	);
};

export default Home;
