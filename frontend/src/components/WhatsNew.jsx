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

				<h4 className='text-popover-foreground'>- Nasa Posts</h4>

				<p className='text-muted-foreground'>
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

				<h4 className='text-popover-foreground'>- Advice Slip</h4>

				<p className='text-muted-foreground'>
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
