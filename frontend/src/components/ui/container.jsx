import DarkModeToggle from './darkmode-toggle';

/* eslint-disable react/prop-types */
export function MainContainer({ children }) {
	return (
		<main className='transition-all bg-card relative m-auto flex overflow-hidden flex-col w-full h-[100dvh] text-white'>
			{children}
			<DarkModeToggle />
		</main>
	);
}
