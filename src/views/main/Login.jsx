import React from 'react';
import { Button, Form, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import '../../index.css';

const Login = () => {
	const history = useHistory();

	const handleSubmit = e => {
		e.preventDefault();
		history.push('/main/country');
	};

	return (
		<>
			<header className='pl-4 py-2' style={{ height: '55px' }}>
				<h3
					style={{
						fontFamily: 'Red Hat Display, sans-serif',
						fontSize: '35px',
						fontWeight: '900',
						color: '#3A396B'
					}}
				>
					LOGO
				</h3>
			</header>
			<main
				style={{
					backgroundColor: '#EFF1F8',
					// paddingTop: '3rem'
				}}
				className='d-flex justify-content-center align-items-center contenedor'
			>
				<div
					style={{
						height: '538px',
						width: '538px',
						borderRadius: '10px',
						backgroundColor: 'white'
					}}
				>
					<div className='d-flex flex-column justify-content-center align-items-center'>
						<h2
							style={{
								fontFamily: 'Red Hat Display, sans-serif',
								fontWeight: '900',
								fontSize: '55px',
								color: '#3A396B',
								marginTop: '6rem',
								marginBottom: '6rem'
							}}
						>
							LOGO
						</h2>

						<Form>
							<Input
								type='email'
								name='email'
								placeholder='Usuario'
								className='my-3'
								style={{
									width: '320px'
								}}
							/>
							<Input
								type='password'
								name='password'
								placeholder='Contraseña'
								className='my-3'
								style={{
									width: '320px'
								}}
							/>
							<Button type='submit' className='btn-login mt-3' onClick={handleSubmit}>
								Iniciar sesión
							</Button>
						</Form>
					</div>
				</div>
			</main>
		</>
	);
};

export default Login;
