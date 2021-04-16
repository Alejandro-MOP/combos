import React from 'react';

import './MainCard.css';

const MainCard = ({ image, text, description, classNameHover, onClick }) => {
	return (
		<div
			className={`text-center main-card ${ classNameHover } py-3 mt-3`}
			onClick={onClick}
			style={{
				width:291,
				height: 419
			}}
		>
			<img
                src={image}
                alt={`Logo ${ text }`}
                style={{
                    height:'220px'

                }}
            />
			<h3
				className='my-4 py-2'
				style={{
					color: '#1890ff',
					fontFamily: 'Roboto, sans-serif',
					fontWeight: 'bold',
					fontSize: '24px',
                    height:'74px'
				}}
			>
				{ text }
			</h3>
			<p
				className='m-0'
				style={{
					fontFamily: 'Roboto, sans-serif',
					fontSize: '12px',
					color: '#8a8a8a',
                    padding: '0 4rem'
				}}
			>
				{ description }
			</p>
		</div>
	);
};

export default MainCard;
