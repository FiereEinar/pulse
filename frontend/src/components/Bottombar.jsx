import { navLinks } from '@/constants';
import SidebarLink from './SidebarLink';

export default function Bottombar() {
	const currentUserID = localStorage.getItem('UserID');

	return (
		<aside className='transition-all flex h-full bg-card text-muted-foreground border-t w-full dark:border-gray-800'>
			<div className='flex w-full justify-around p-2 gap-1'>
				{navLinks.map((link) => (
					<SidebarLink
						key={link.name}
						name={link.name}
						path={
							link.path === '/profile'
								? `${link.path}/${currentUserID}`
								: link.path
						}
						icon={link.icon}
					/>
				))}
			</div>
		</aside>
	);
}
