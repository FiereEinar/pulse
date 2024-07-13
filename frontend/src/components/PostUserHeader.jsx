import { formatDistanceToNow } from 'date-fns';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PostController from './PostController';

/* eslint-disable react/prop-types */
export default function PostUserHeader({
	creatorProfile,
	fullname,
	username,
	userID,
	date,
	isEdited,
	showActions,
	content,
	refetch,
	postID,
}) {
	const currentUserID = localStorage.getItem('UserID');

	return (
		<div className='flex justify-between items-center'>
			<div className='flex gap-2 items-center'>
				{/* user image */}
				<Link className='flex-shrink-0' to={`/profile/${userID}`}>
					<img
						className='size-10 rounded-full object-cover object-center shadow-md'
						src={creatorProfile ? creatorProfile : '/default_user.jpg'}
						alt=''
					/>
				</Link>

				{/* username and fullname */}
				<div className='flex flex-col justify-center'>
					<div className='flex items-center gap-1 flex-wrap'>
						<Link to={`/profile/${userID}`}>
							<h4 className='transition-all font-semibold text-popover-foreground text-wrap hover:underline'>
								{_.startCase(fullname)}
							</h4>
						</Link>
						{date && (
							<p className='text-muted-foreground text-[0.60rem] italic'>
								-{' '}
								{formatDistanceToNow(date, {
									includeSeconds: true,
									addSuffix: true,
								})}
							</p>
						)}
						{isEdited && (
							<p className='text-muted-foreground text-[0.60rem] italic'>
								- Edited
							</p>
						)}
					</div>
					<p className='text-muted-foreground text-sm text-wrap'>@{username}</p>
				</div>
			</div>

			{/* actions */}
			{showActions && currentUserID === userID && (
				<PostController content={content} refetch={refetch} postID={postID} />
			)}
		</div>
	);
}
