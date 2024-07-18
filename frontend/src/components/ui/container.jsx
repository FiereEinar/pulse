export function MainContainer({ children }) {
	return (
		<div className='transition-all bg-card '>
			<main className='relative m-auto flex overflow-hidden flex-col w-full xl:w-[80rem] h-[100dvh] text-white'>
				{children}
			</main>
		</div>
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
