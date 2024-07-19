import { Link } from 'react-router-dom';
import { PostCardContainer } from './ui/container';

export default function Socials() {
	return (
		<PostCardContainer>
			<article className='p-3 flex flex-col gap-2'>
				<h1 className='text-popover-foreground'>Socials</h1>
				<div className='flex gap-3'>
					<Link to='https://github.com/FiereEinar' target='_blank'>
						<img
							className='size-8 rounded-full'
							src='/github.png'
							alt='github'
						/>
					</Link>
					<Link
						to='https://www.linkedin.com/in/nick-xylan-melloria-91671228b/'
						target='_blank'
					>
						<img
							className='size-8 rounded-full'
							src='/linkedin.png'
							alt='github'
						/>
					</Link>
				</div>
			</article>
		</PostCardContainer>
	);
}
