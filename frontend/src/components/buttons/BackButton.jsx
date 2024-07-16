import { Link } from 'react-router-dom';

export default function BackButton() {
	return (
		<Link className='' to={-1}>
			<img className='size-8' src='/icons/back.svg' alt='' />
		</Link>
	);
}
