import { useNavigate } from 'react-router-dom';
import ActivityCard from './ActivityCard';
import { Button } from './ui/button';

export default function ActivityFeed({ activities }) {
	const navigate = useNavigate();

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
							<Button onClick={() => console.log('follow back')} size='sm'>
								Accept
							</Button>
						)
					}
				/>
			))}
		</div>
	);
}
