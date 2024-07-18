import { useNavigate } from 'react-router-dom';
import ActivityCard from './ActivityCard';
import AcceptRequestButton from './buttons/AcceptRequestButton';
import { UsersFeedLoading } from './LoadingCards';

export default function ActivityFeed({ activities, refetch, isLoading }) {
	const navigate = useNavigate();

	if (isLoading) {
		return (
			<div className='transition-all bg-card p-3 rounded-md h-full'>
				<UsersFeedLoading />
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-1'>
			{activities.length === 0 && (
				<p className='text-sm text-muted-foreground italic'>
					Nothing to see here...
				</p>
			)}
			{activities.map((activity) => (
				<ActivityCard
					seen={activity.seen}
					key={activity._id}
					activityID={activity._id}
					message={activity.message}
					image={activity.image || 'default_user.jpg'}
					onClick={() =>
						navigate(
							activity.type === 'user'
								? `/profile/${activity.associatedID}`
								: activity.type === 'post'
								? `/post/${activity.associatedID}`
								: '/'
						)
					}
					action={
						activity.type === 'user' && (
							<AcceptRequestButton
								userID={activity.associatedID}
								refetch={refetch}
							/>
						)
					}
				/>
			))}
		</div>
	);
}
