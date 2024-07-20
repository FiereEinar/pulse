import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './ui/darkmode-toggle';
import LogoutIcon from './icons/logout';
import BackButton from './buttons/BackButton';
import Logo from './ui/logo';

export default function Header() {
	const { pathname } = useLocation();

	return (
		<header className='transition-all px-5 h-[10dvh] flex justify-between items-center bg-card'>
			{/* for desktop, no back button */}
			<div className='hidden sm:flex'>
				<Logo />
			</div>

			{/* for mobile, show the back button when viewing a post */}
			<div className='sm:hidden'>
				{pathname === '/' ? <Logo /> : <BackButton />}
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

			{/* for mobile, hidden when not in home */}
			<div className='sm:hidden'>
				{pathname === '/' && (
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
