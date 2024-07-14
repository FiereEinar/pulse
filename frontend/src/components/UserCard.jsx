/* eslint-disable react/prop-types */
import PostUserHeader from './PostUserHeader';
import { Button } from './ui/button';

export default function UserCard({ profile, fullname, username, userID }) {
	return (
		<div className='transition-all flex gap-2 p-3 hover:bg-secondary items-center justify-between'>
			<PostUserHeader
				fullname={fullname}
				username={username}
				creatorProfile={profile}
				userID={userID}
			/>
			<Button size='sm'>Send Request</Button>
		</div>
	);
}
