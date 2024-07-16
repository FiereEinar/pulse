export function MainContainer({ children }) {
	return (
		<main className='transition-all bg-card relative m-auto flex overflow-hidden flex-col w-full lg:px-[10%] h-[100dvh] text-white'>
			{children}
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

export function MainContentContainer({ children }) {
	return (
		<section className='transition-all bg-card w-full p-3 rounded-md flex flex-col'>
			{children}
		</section>
	);
}
