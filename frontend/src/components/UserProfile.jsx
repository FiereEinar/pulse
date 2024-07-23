import _ from 'lodash';
import CoverPhoto from './CoverPhoto';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import SendRequestButton from './buttons/SendRequestButton';
import AcceptRequestButton from './buttons/AcceptRequestButton';

export default function UserProfile({
	coverImage,
	userID,
	profileImage,
	fullname,
	username,
	friends,
	friendRequests,
	currentUserFriends,
	currentUserRequests,
	bio,
	refetch,
}) {
	const currentUserID = localStorage.getItem('UserID');
	const navigate = useNavigate();

	return (
		<div className='transition-all bg-card w-full sm:rounded-md shadow-md h-fit p-3'>
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

			<div className='mt-3 flex flex-wrap gap-2 items-start justify-between'>
				<div>
					<h1 className='transition-all text-xl font-semibold text-popover-foreground'>
						{_.startCase(fullname)}
					</h1>
					<p className='text-muted-foreground'>@{username}</p>
				</div>

				{/* button on the side of profile */}

				{userID === currentUserID ? (
					// if its your own profile
					<Button onClick={() => navigate('/user/edit')} size='sm'>
						Edit Profile
					</Button>
				) : currentUserRequests.some((user) => user._id === userID) ? (
					// if the user being viewed is sending request to current user
					<AcceptRequestButton userID={userID} refetch={refetch} />
				) : currentUserFriends.some((user) => user._id === userID) ? (
					// if the user is friends with the current user
					<Button variant='ghost' size='sm' disabled>
						Friends
					</Button>
				) : friendRequests.some((request) => request._id === currentUserID) ? (
					// if still requesting
					<Button variant='ghost' size='sm' disabled>
						Request Sent
					</Button>
				) : !friends.some((friend) => friend._id === currentUserID) ? (
					// if not friends
					<SendRequestButton userID={userID} refetch={refetch} />
				) : null}
			</div>

			{bio && <p className='text-muted-foreground mt-3'>{bio}</p>}
		</div>
	);
}
