import { navLinks } from '@/constants';
import SidebarLink from './SidebarLink';

export default function Sidebar() {
	return (
		<aside className='transition-all flex flex-col justify-between h-full bg-card'>
			<div className='flex flex-col p-2 gap-1'>
				{navLinks.map((link) => (
					<SidebarLink
						key={link.name}
						name={link.name}
						path={link.path}
						icon={link.icon}
					/>
				))}
			</div>

			<div className='flex flex-col p-2 gap-1'>
				<SidebarLink name='Logout' path='/logout' icon='logout' />
			</div>
		</aside>
	);
}
