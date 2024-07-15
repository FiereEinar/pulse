import { updateActivityStatus } from '@/api/user';
import _ from 'lodash';

export default function ActivityCard({
	image,
	message,
	seen,
	onClick,
	action,
	activityID,
}) {
	const currentUserID = localStorage.getItem('UserID');

	const onCardClick = async () => {
		try {
			onClick();

			const result = await updateActivityStatus(currentUserID, activityID, {
				seen: true,
			});

			if (!result.success) {
				console.error('Failed to update activity state');
			}
		} catch (err) {
			console.error('Failed to update activity state', err);
		}
	};

	return (
		<article
			className='transition-all rounded-md cursor-pointer flex justify-between p-3 w-full hover:bg-secondary'
			onClick={onCardClick}
		>
			<div className='flex items-center gap-2'>
				<img
					className='size-10 rounded-full object-cover object-center shadow-md'
					src={image}
					alt=''
				/>
				<p
					className={`text-wrap ${
						seen ? 'text-muted-foreground' : 'text-popover-foreground'
					}`}
				>
					{_.capitalize(message)}
				</p>
			</div>
			{action}
		</article>
	);
}
