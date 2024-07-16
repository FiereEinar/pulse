import { NavLink } from 'react-router-dom';
import GetIcon from './icons';

export default function SidebarLink({ path, name, icon }) {
	// 'navIconContainer' class is IMPORTANT for identifying when a nav is active or hovered to change the svg icons color
	// when changing the color of the text, change the color of svg in index.css to match it, currently 'muted-foreground' and 'primary' on hover/active
	const navClass =
		'navIconContainer transition-all md:w-full sm:p-2 rounded-md md:pl-4 md:py-3 md:pr-16 flex flex-col sm:flex-row sm:gap-2 items-center justify-start md:w-[10rem] text-muted-foreground hover:text-primary/90 font-medium';

	return (
		// 'active-link' class is IMPORTANT so that the color applies when the link is active, see index.css
		<NavLink
			title={name}
			to={path}
			className={({ isActive }) =>
				`${navClass} ${isActive ? 'text-primary active-link' : ''}`
			}
		>
			<GetIcon iconKey={icon} />
			<p className='text-xs sm:text-base truncate'>{name}</p>
		</NavLink>
	);
}
