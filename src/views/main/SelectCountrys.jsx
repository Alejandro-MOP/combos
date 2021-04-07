import React from 'react';
import { useHistory } from 'react-router-dom';

import mexicoImage from '../../assets/images/countries/mexico.png';
import peruImage from '../../assets/images/countries/peru.png';
import colombiaImage from '../../assets/images/countries/colombia.png';
import ecuadorImage from '../../assets/images/countries/ecuador.png';
import panamaImage from '../../assets/images/countries/panama.png';
import userImage from '../../assets/images/countries/user.png';
import userStatusOnline from '../../assets/images/countries/statusOnline.png';
import { TableFilter } from '../../components';

const user = 'Fernando Loyola';

const currentDate = new Date();
const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const optionsTime = { hour: '2-digit', minute: '2-digit' };

const customCurrentDate = `
	${ currentDate.toLocaleDateString('es-ES', optionsDate) }
	${ currentDate.toLocaleTimeString([],optionsTime) }
`;

const countries = [
	{ nombre: 'México', source: mexicoImage, classNameHover: 'mexico' },
	{ nombre: 'Perú', source: peruImage , classNameHover: 'peru' },
	{ nombre: 'Colombia', source: colombiaImage , classNameHover: 'colombia' },
	{ nombre: 'Ecuador', source: ecuadorImage , classNameHover: 'ecuador' },
	{ nombre: 'Panamá', source: panamaImage , classNameHover: 'panama' }
];

const SelectCountrys = () => {
	const history = useHistory();

	const handleClick = () => {
		history.push('/main/start');
	};

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
					<p
						className='m-0 mr-2 pr-4'
						style={{
							fontFamily: 'Inter, sans-serif',
							fontWeight: '500',
							fontSize: '14px',
							color: '#ACABC2'
						}}
					>
						{customCurrentDate}
					</p>
					<img
						src={userImage}
						alt='Imagen Perfil'
						style={{position:'relative'}}
					/>
					<img
						src={userStatusOnline}
						alt='status online'
						style={{
							position:'absolute',
							top: '35px',
							right:'26px'
						}}
					/>
				</div>
			</header>
			<main
				style={{
					backgroundColor: '#EFF1F8',
					paddingTop: '3rem'
				}}
				className='d-flex justify-content-center contenedor'
			>
				<div className='p-3'>
					<div className='text-center'>
						<h1
							style={{
								fontFamily: 'Red Hat Display, sans-serif',
								fontSize: '36px',
								fontWeight: '700',
								color: '#3A396B'
							}}
						>
							¡Bienvenido! <br /> {user}
						</h1>
						<p
							className='m-0 pt-3'
							style={{
								fontFamily: 'Red Hat Display, sans-serif',
								fontSize: '14px',
								fontWeight: '700',
								color: '#3A396B'
							}}
						>
							Elige el país que deseas configurar:
						</p>
					</div>
					<div className='d-flex justify-content-center align-items-center'>
						{countries.map(item => (
							<div
								key={item.nombre}
								className='mt-5 py-4 px-5 text-center'
								style={{ cursor: 'pointer', transition:'.3s ease all' }}
								onClick={handleClick}
							>
								<img src={item.source} alt={`Logo ${item.nombre}`} style={{position: 'relative'}}/>
								<div className={`country ${item.classNameHover}`}></div>
								<p
									className='mt-2'
									style={{
										fontFamily: 'Red Hat Display, sans-serif',
										fontSize: '14px',
										fontWeight: '700',
										color: '#3A396B'
									}}
								>
									{item.nombre}
								</p>
							</div>
						))}
					</div>
				</div>
			</main>
		</>
	);
};

export default SelectCountrys;
