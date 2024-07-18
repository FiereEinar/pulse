import { UsersFeedLoading } from './LoadingCards';
import UserCard from './UserCard';

export default function UsersFeed({ users, isLoading, error }) {
	if (isLoading) {
		return <UsersFeedLoading />;
	}

	if (error) {
		return (
			<p className='text-sm italic text-destructive'>Failed to load users</p>
		);
	}

	return (
		<div className='flex flex-col'>
			{users.map((user) => (
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
