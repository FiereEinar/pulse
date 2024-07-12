import { formatDistanceToNow } from 'date-fns';
import _ from 'lodash';
import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
export default function PostUserHeader({
	creatorProfile,
	fullname,
	username,
	userID,
	date,
}) {
	return (
		<div className='flex gap-2 items-center'>
			<Link to={`/profile/${userID}`}>
				<img
					className='size-10 rounded-full object-cover object-center shadow-md'
					src={creatorProfile ? creatorProfile : '/default_user.jpg'}
					alt=''
				/>
			</Link>
			<div className='flex flex-col justify-center'>
				<Link to={`/profile/${userID}`} className='flex items-center gap-2'>
					<h4 className='transition-all font-semibold text-popover-foreground text-wrap hover:underline'>
						{_.startCase(fullname)}
					</h4>
					{date && (
						<p className='text-muted-foreground text-xs italic'>
							-{' '}
							{formatDistanceToNow(date, {
								includeSeconds: true,
								addSuffix: true,
							})}
						</p>
					)}
				</Link>
				<p className='text-muted-foreground text-sm text-wrap'>@{username}</p>
			</div>
		</div>
	);
}
