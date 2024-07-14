/* eslint-disable react/prop-types */

import UserCard from './UserCard';

export default function UsersFeed({ users, isLoading, error }) {
	if (isLoading) {
		return <p className='text-muted-foreground text-sm italic'>Loading...</p>;
	}

	if (error) {
		return (
			<p className='text-sm italic text-destructive'>Failed to load users</p>
		);
	}

	console.log(users);
	return (
		<div>
			{users.length === 0 && (
				<p className='text-muted-foreground text-sm italic'>Empty</p>
			)}
			{users &&
				users.map((user) => (
					<UserCard
						key={user._id}
						profile={user.profile.url}
						userID={user._id}
						fullname={`${user.firstname} ${user.lastname}`}
						username={user.username}
					/>
				))}
		</div>
	);
}
