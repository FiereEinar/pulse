import { Link } from 'react-router-dom';

export default function Logo() {
	return (
		<Link to='/' className='flex items-center gap-2 text-popover-foreground'>
			<img className='border size-12 rounded-full' src='/logo.jpg' alt='logo' />
			<h1 className='text-2xl font-semibold'>Pulse</h1>
		</Link>
	);
}
