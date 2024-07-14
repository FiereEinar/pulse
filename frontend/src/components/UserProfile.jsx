/* eslint-disable react/prop-types */
import _ from 'lodash';
import CoverPhoto from './CoverPhoto';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export default function UserProfile({
	coverImage,
	userID,
	profileImage,
	fullname,
	username,
	friends,
	bio,
	refetch,
}) {
	const currentUserID = localStorage.getItem('UserID');
	const navigate = useNavigate();

	return (
		<div className='transition-all bg-card w-full rounded-md h-fit p-3'>
			<div className='relative'>
				<CoverPhoto refetch={refetch} image={coverImage} userID={userID} />

				{/* spacing */}
				<div className='w-full h-8' />

				{/* user profile picture */}
				<img
					className='absolute bottom-0 left-3 size-[5rem] rounded-full object-cover object-center'
					src={profileImage || '/default_user.jpg'}
					alt='profile'
				/>
			</div>

			<div className='mt-3 flex items-start justify-between'>
				<div>
					<h1 className='transition-all text-xl font-semibold text-popover-foreground'>
						{_.startCase(fullname)}
					</h1>
					<p className='text-muted-foreground'>@{username}</p>
				</div>

				{userID !== currentUserID &&
					!friends.some((friend) => friend._id === currentUserID) && (
						<Button size='sm'>Send Request</Button>
					)}

				{userID === currentUserID && (
					<Button onClick={() => navigate('/user/edit')} size='sm'>
						Edit Profile
					</Button>
				)}
			</div>

			{bio && <p className='text-muted-foreground mt-3'>{bio}</p>}
		</div>
	);
}
