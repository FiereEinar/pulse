import UserTile from './UserTile';

export default function UserGrid({ users, type }) {
	return (
		<div className='p-1 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 sm:gap-3'>
			{users.length === 0 && (
				<p className='text-muted-foreground italic text-sm p-2'>No {type}</p>
			)}
			{users.map((user) => (
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
