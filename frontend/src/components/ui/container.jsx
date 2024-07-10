import DarkModeToggle from './darkmode-toggle';

/* eslint-disable react/prop-types */
export function MainContainer({ children }) {
	return (
		<div className='transition-all w-full bg-background'>
			<main className='relative m-auto flex overflow-hidden flex-col w-full h-[100dvh] md:max-w-[70rem] text-white'>
				{children}
				<DarkModeToggle />
			</main>
		</div>
	);
}
