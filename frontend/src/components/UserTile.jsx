import _ from 'lodash';
import { Link } from 'react-router-dom';

export default function UserTile({ profile, fullname, userID }) {
	return (
		<Link
			to={`/profile/${userID}`}
			className='transition-all hover:bg-secondary flex flex-col items-center size-fit p-2 rounded-md gap-1 text-popover-foreground'
		>
			<img
				className='size-max rounded-md object-cover object-center'
				src={profile || '/default_user.jpg'}
				alt=''
			/>
			<h4 className='w-max text-wrap text-center'>{_.startCase(fullname)}</h4>
		</Link>
	);
}
