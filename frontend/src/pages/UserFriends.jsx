import { fetchUserByID } from '@/api/user';
import UsersFeed from '@/components/UsersFeed';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

export default function UserFriends() {
	const { userID } = useParams();

	const {
		data: userData,
		error,
		isLoading,
	} = useQuery({
		queryKey: [`user_${userID}`],
		queryFn: () => fetchUserByID(userID),
	});

	return (
		<section className='bg-card rounded-md overflow-hidden w-full h-full'>
			<h4 className='p-3 text-xl border-b font-semibold text-popover-foreground'>
				{_.capitalize(userData.firstname)}&apos;s Friends
			</h4>
			<UsersFeed
				users={userData?.friends}
				error={error}
				isLoading={isLoading}
			/>
		</section>
	);
}
