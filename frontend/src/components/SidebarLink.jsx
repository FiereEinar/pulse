/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

export default function SidebarLink({ path, name, icon }) {
	const navClass =
		'transition-all md:w-full sm:p-2 rounded-md md:pl-4 md:py-3 md:pr-10 flex flex-col sm:flex-row sm:gap-2 items-center justify-start md:w-[10rem] hover:text-primary hover:text-primary/90 hover:underline font-medium';

	return (
		<NavLink
			to={path}
			className={({ isActive }) =>
				`${navClass} ${isActive ? 'text-primary' : ''}`
			}
		>
			<img className='size-6 border rounded-md' src={icon} alt='' />
			<p className='text-xs sm:text-base truncate'>{name}</p>
		</NavLink>
	);
}
