import { Button } from './button';

// temporary
export default function DarkModeToggle() {
	const handleClick = () => {
		const body = document.querySelector('body');

		if (body.classList.contains('dark')) {
			body.classList.remove('dark');
		} else {
			body.classList.add('dark');
		}
	};
	return (
		<Button
			variant=''
			onClick={handleClick}
			className='absolute z-50 bottom-3 right-3 size-10 border rounded-full'
		>
			O
		</Button>
	);
}
