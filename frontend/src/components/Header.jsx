import { Link, useParams } from 'react-router-dom';
import DarkModeToggle from './ui/darkmode-toggle';
import LogoutIcon from './icons/logout';

export default function Header() {
	const { postID } = useParams();

	return (
		<header className='transition-all px-5 h-[10dvh] flex justify-between items-center bg-card'>
			{/* for desktop, no back button */}
			<div className='hidden sm:flex'>
				<Link
					to='/'
					className='flex items-center gap-3 text-popover-foreground'
				>
					<img
						className='border size-12 rounded-full'
						src='/logo.jpg'
						alt='logo'
					/>
					<h1 className='text-2xl font-semibold'>Logo</h1>
				</Link>
			</div>

			{/* for mobile, show the back button when viewing a post */}
			<div className='sm:hidden'>
				{!postID ? (
					<Link
						to='/'
						className='flex items-center gap-3 text-popover-foreground'
					>
						<img
							className='border size-12 rounded-full'
							src='/logo.jpg'
							alt='logo'
						/>
						<h1 className='text-2xl font-semibold'>Logo</h1>
					</Link>
				) : (
					<Link className='' to={-1}>
						<img className='size-8' src='/icons/back.svg' alt='' />
					</Link>
				)}
			</div>

			{/* for desktop */}
			<div className='hidden sm:flex'>
				<div className='flex items-center gap-5'>
					<DarkModeToggle />

					<div className='md:hidden'>
						<Link to='/logout'>
							<LogoutIcon />
						</Link>
					</div>
				</div>
			</div>

			{/* for mobile */}
			<div className='sm:hidden'>
				{!postID && (
					<div className='flex items-center gap-5'>
						<DarkModeToggle />
						<div className='md:hidden'>
							<Link to='/logout'>
								<LogoutIcon />
							</Link>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
