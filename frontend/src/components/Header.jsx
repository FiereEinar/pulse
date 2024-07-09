import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function Header() {
	return (
		<header className='px-5 h-[10dvh] flex justify-between items-center border-b dark:border-gray-800 bg-inherit'>
			<Link
				to='/'
				className='flex items-center gap-3 text-gray-800 dark:text-white'
			>
				<img className='border size-10 rounded-full' src='' alt='logo' />
				<h1 className='text-2xl font-semibold'>Logo</h1>
			</Link>

			<Button className='flex gap-2' variant='secondary' size='sm'>
				<img className='size-5 border rounded-md' src='' alt='profile' />
				<p>Profile</p>
			</Button>
		</header>
	);
}
