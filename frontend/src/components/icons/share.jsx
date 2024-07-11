/* eslint-disable react/prop-types */
export default function ShareIcon({
	height = '24px',
	width = '24px',
	fill = 'none',
	stroke = '#64748b',
}) {
	return (
		<svg
			width={width}
			height={height}
			viewBox='-0.5 0 25 25'
			fill={fill}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M13.47 4.13998C12.74 4.35998 12.28 5.96 12.09 7.91C6.77997 7.91 2 13.4802 2 20.0802C4.19 14.0802 8.99995 12.45 12.14 12.45C12.34 14.21 12.79 15.6202 13.47 15.8202C15.57 16.4302 22 12.4401 22 9.98006C22 7.52006 15.57 3.52998 13.47 4.13998Z'
				className='navIconPath'
				stroke={stroke}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
