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

export function PostCardContainer({ children }) {
	return (
		<article className='transition-all bg-card shadow-md rounded-md'>
			{children}
		</article>
	);
}
