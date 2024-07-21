import { PostCardContainer } from './ui/container';
import { Skeleton } from './ui/skeleton';

export function AdviceSlipLoading() {
	return (
		<>
			<div className='flex gap-2'>
				<Skeleton className='w-10 h-10 rounded-full flex-shrink-0' />
				<Skeleton className='w-full h-10' />
			</div>
			<Skeleton className='w-full h-20 mt-2' />
		</>
	);
}

export function PostCardLoading() {
	return (
		<PostCardContainer>
			<article className='p-3 flex flex-col gap-2'>
				<PostUserHeaderLoading />

				<div>
					<Skeleton className='w-[90%] h-4 rounded-none rounded-t-md rounded-br-md' />
					<Skeleton className='w-[70%] h-4 rounded-none rounded-b-md' />
				</div>

				<Skeleton className='w-full h-[15rem]' />

				<Skeleton className='w-[10rem] h-8' />
			</article>
		</PostCardContainer>
	);
}

export function PostFeedLoading() {
	const length = Array(5).fill(0);

	return (
		<section className='flex flex-col gap-3'>
			{length.map((_, i) => (
				<PostCardLoading key={i} />
			))}
		</section>
	);
}

export function UsersFeedLoading() {
	const length = Array(5).fill(0);

	return (
		<div className='flex flex-col w-full'>
			{length.map((_, i) => (
				<div
					key={i}
					className='transition-all w-full flex flex-col gap-2 rounded-md p-3'
				>
					<PostUserHeaderLoading />
				</div>
			))}
		</div>
	);
}

export function PostUserHeaderLoading() {
	return (
		<div className='flex gap-2'>
			<Skeleton className='w-10 h-10 rounded-full flex-shrink-0' />
			<Skeleton className='flex-shrink w-[13rem] h-10' />
		</div>
	);
}

export function CreatePostLoading() {
	return (
		<div className='bg-card w-full rounded-md h-full p-3'>
			<PostUserHeaderLoading />
		</div>
	);
}

export function ProfilePageLoading() {
	return (
		<section className='w-full h-full space-y-6 mb-6'>
			<div className='bg-card pb-3'>
				<div className='relative p-3 '>
					<Skeleton className='h-[15rem] w-full' />
					<div className='h-8' />

					<Skeleton className='absolute bottom-0 left-6 size-[5rem] rounded-full' />
				</div>

				<div className='space-y-2 px-3'>
					<Skeleton className='h-[1.5rem] w-[8rem]' />
					<Skeleton className='h-[1rem] w-[4rem]' />
				</div>
			</div>

			<div className='bg-card p-2 flex gap-3'>
				<Skeleton className='size-[8rem]' />
				<Skeleton className='size-[8rem]' />
			</div>
		</section>
	);
}

export function LoadingSpin() {
	return (
		<div role='status'>
			<svg
				aria-hidden='true'
				className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
				viewBox='0 0 100 101'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
					fill='currentColor'
				/>
				<path
					d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
					fill='currentFill'
				/>
			</svg>
			<span className='sr-only'>Loading...</span>
		</div>
	);
}
