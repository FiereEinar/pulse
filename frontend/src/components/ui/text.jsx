/* eslint-disable react/prop-types */
export function StrongHeaderText({ children }) {
	return (
		<h1 className='text-3xl font-bold text-gray-800 dark:text-white'>
			{children}
		</h1>
	);
}
