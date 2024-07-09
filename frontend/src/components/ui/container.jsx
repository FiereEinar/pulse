/* eslint-disable react/prop-types */
export function MainContainer({ children }) {
	return (
		<main className='dark:bg-gray-900 flex overflow-hidden flex-col h-[100dvh] text-white'>
			{children}
		</main>
	);
}
