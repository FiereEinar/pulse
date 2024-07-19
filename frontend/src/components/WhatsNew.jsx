import { Link } from 'react-router-dom';
import { PostCardContainer } from './ui/container';
import { Button } from './ui/button';

export default function WhatsNew() {
	return (
		<PostCardContainer>
			<article className='p-3 flex flex-col gap-2'>
				<h1 className='text-popover-foreground text-xl font-semibold'>
					What&apos;s new
				</h1>

				<p className='text-muted-foreground text-sm'>
					NOTE: Actions are only available on user created posts (like, comment,
					share) because they are only being fetched and not saved in the
					database
				</p>

				<div className='border-b w-full' />

				{/* Nasa */}

				<h4 className='text-popover-foreground'>- Nasa Posts</h4>

				<p className='text-muted-foreground  text-sm'>
					We are excited to introduce a new feature that brings the wonders of
					space right to your feed! With our integration of NASA&apos;s API, you
					can now explore random posts about galaxies, stars, planets, and more.
					Discover breathtaking images, fascinating facts, and stay updated with
					the latest in space exploration.
				</p>

				<div>
					<Button className='w-fit p-0' variant='link'>
						<Link
							className='text-wrap text-start'
							to='https://api.nasa.gov/'
							target='_blank'
						>
							Visit nasa API documentation
						</Link>
					</Button>
					<Button className='w-fit p-0' variant='link'>
						<Link
							className='text-wrap text-start'
							to='https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf'
							target='_blank'
						>
							Documentation PDF
						</Link>
					</Button>
				</div>

				<div className='border-b w-full' />

				{/* Useless Facts */}

				<h4 className='text-popover-foreground'>- Useless Facts</h4>

				<p className='text-muted-foreground text-sm'>
					Need a break from the mundane? Dive into a world of random and amusing
					trivia with our new Useless Facts feature! Discover quirky, fun, and
					utterly useless facts that are perfect for lightening up your day and
					impressing your friends with knowledge they never knew they needed.
				</p>

				<div>
					<Button className='w-fit p-0' variant='link'>
						<Link
							className='text-wrap text-start'
							to='https://uselessfacts.jsph.pl/'
							target='_blank'
						>
							Visit Useless Facts documentation
						</Link>
					</Button>
				</div>

				<div className='border-b w-full' />

				{/* Advice Slip */}

				<h4 className='text-popover-foreground'>- Advice Slip</h4>

				<p className='text-muted-foreground text-sm'>
					Receive random pieces of advice to inspire and guide you through your
					day. Whether you&apos;re looking for a spark of motivation or a gentle
					nudge in the right direction, our new advice slips are here to help.
				</p>

				<div>
					<Button className='w-fit p-0' variant='link'>
						<Link
							className='text-wrap text-start'
							to='https://api.adviceslip.com/'
							target='_blank'
						>
							Visit AdviceSlip API documentation
						</Link>
					</Button>
				</div>
			</article>
		</PostCardContainer>
	);
}
