import { Link, useParams } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import DarkModeToggle from './ui/darkmode-toggle';

export default function Header() {
	const { postID } = useParams();

	return (
		<header className='transition-all px-5 h-[10dvh] flex justify-between items-center bg-card'>
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

			{!postID && (
				<div className='flex items-center gap-5'>
					<DarkModeToggle />
					<div className='md:hidden'>
						<SidebarLink name='Logout' path='/logout' icon='logout' />
					</div>
				</div>
			)}

			{/* <div>
				<SidebarLink name='Profile' path='/profile' icon='profile' />
			</div> */}
		</header>
	);
}
