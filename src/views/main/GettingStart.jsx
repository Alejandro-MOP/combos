import React from 'react';
import { useHistory } from 'react-router-dom';

import mexicoImage from '../../assets/images/countries/mexico.png';
import userImage from '../../assets/images/countries/user.png';
import userStatusOnline from '../../assets/images/countries/statusOnline.png';
import { TableFilter } from '../../components';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';

const moduleInformation = [
	{ name: 'DT Combos', route: '', buttonColor: '#FDAF4E' },
	{ name: 'Combos Generator HK', route: '/combos-generator', buttonColor: '#1890ff' },
	{ name: 'Promotool', route: '', buttonColor: '#64BE85' },
	{ name: 'Smart Discounts', route: '', buttonColor: '#817AF6' }
];

const GettingStart = () => {

    const history = useHistory();

    const handleClickModule = route => {
        history.push(route.toString())
        console.log(route.toString());
    }
	return (
		<>
			<header className='px-4 py-3 d-flex justify-content-between align-items-center' style={{ height: '55px' }}>
				<div className='d-flex justify-content-between align-items-center'>
					<h3
						className='mr-5 my-0'
						style={{
							fontFamily: 'Red Hat Display, sans-serif',
							fontSize: '35px',
							fontWeight: '900',
							color: '#3A396B'
						}}
					>
						LOGO
					</h3>

					<TableFilter backgroundInput='#EFF1F8' />
				</div>
				<div className='d-flex justify-content-between align-items-center'>
					<div className='px-5 mr-4'>
						<Nav>
							<NavItem>
								<NavLink href='#' className='text-nav'>
									Estadisticas
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href='#' className='text-nav'>
									Visión General
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href='#' className='text-nav'>
									Dashboard
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href='#' className='text-nav'>
									Analytics
								</NavLink>
							</NavItem>
						</Nav>
					</div>
					<div>
						<img
							src={mexicoImage}
							alt='Imagen Pais'
							style={{ height: '38px', width: '38px' }}
							className='mr-3'
						/>
						<img src={userImage} alt='Imagen Perfil' style={{ position: 'relative' }} />
						<img
							src={userStatusOnline}
							alt='status online'
							style={{
								position: 'absolute',
								top: '35px',
								right: '26px'
							}}
						/>
					</div>
				</div>
			</header>

			<main className='d-flex justify-content-between py-3 my-3 px-5 mx-5'>
				{moduleInformation.map(item => (
					<div
						key={item.buttonColor}
						className='text-center pt-5 card-main'
						style={{
							boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
							height: '536px',
							width: '273px'
						}}
					>
						<div
							className='my-5 mx-5 d-flex justify-content-center align-items-center'
							style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}
						>
							<h3
								className='py-5 py-5 mb-0'
								style={{
									fontFamily: 'Red Hat Display, sans-serif',
									fontSize: '35px',
									fontWeight: '900',
									color: '#3A396B'
								}}
							>
								LOGO
							</h3>
						</div>

						<h3
							className='mb-0 px-5'
							style={{
								fontFamily: 'Red Hat Display, sans-serif',
								fontSize: '20px',
								fontWeight: '900',
								color: '#3A396B',
								height: '52px'
							}}
						>
							{item.name}
						</h3>

						<div className='mt-5 pt-5 px-3'>
							<Button
								block
								style={{
									backgroundColor: `${item.buttonColor}`,
									border: 'none'
								}}
                                onClick={() => handleClickModule(item.route)}
							>
								Button
							</Button>
						</div>
					</div>
				))}
			</main>
		</>
	);
};

export default GettingStart;
