import UserTile from './UserTile';

export default function UserGrid({ users, type }) {
	const selectedUsers = users.slice(0, 5);

	return (
		<div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 sm:gap-3'>
			{selectedUsers.length === 0 && (
				<p className='text-muted-foreground italic text-sm p-2'>No {type}</p>
			)}
			{selectedUsers.map((user) => (
				<UserTile
					key={user._id}
					profile={user.profile.url}
					userID={user._id}
					fullname={`${user.firstname} ${user.lastname}`}
				/>
			))}
		</div>
	);
}
