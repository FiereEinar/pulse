/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

export default function SidebarLink({ path, name, icon }) {
	const navClass =
		'transition-all w-full px-5 py-3 flex gap-2 items-center justify-start w-[10rem] hover:bg-accent dark:hover:bg-slate-700 hover:opacity-90 rounded-md';

	return (
		<NavLink
			to={path}
			className={({ isActive }) =>
				`${navClass} ${isActive ? 'bg-accent dark:bg-slate-700' : ''}`
			}
		>
			<img className='size-6 border rounded-md' src={icon} alt='' />
			<p>{name}</p>
		</NavLink>
	);
}
