import { Link } from 'react-router-dom';
import SidebarLink from './SidebarLink';

export default function Header() {
	return (
		<header className='transition-all px-5 h-[10dvh] flex justify-between items-center bg-card'>
			<Link to='/' className='flex items-center gap-3 text-popover-foreground'>
				<img
					className='border size-12 rounded-full'
					src='/logo.jpg'
					alt='logo'
				/>
				<h1 className='text-2xl font-semibold'>Logo</h1>
			</Link>

			<div>
				<SidebarLink name='Profile' path='/profile' icon='profile' />
			</div>
		</header>
	);
}
