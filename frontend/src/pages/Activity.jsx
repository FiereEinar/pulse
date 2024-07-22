import { fetchUserActivity, fetchUserByID } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import ActivityFeed from '@/components/ActivityFeed';

export default function Activity() {
	const [activities, setActivities] = useState([]);
	const [requests, setRequests] = useState([]);

	const currentUserID = localStorage.getItem('UserID');

	const {
		data: activityData,
		error: activityError,
		isLoading: activityLoading,
	} = useQuery({
		queryKey: [`user_activity_${currentUserID}`],
		queryFn: () => fetchUserActivity(currentUserID),
	});

	const {
		data: userData,
		error: userError,
		isLoading: userLoading,
		refetch,
	} = useQuery({
		queryKey: [`user_${currentUserID}`],
		queryFn: () => fetchUserByID(currentUserID),
	});

	useEffect(() => {
		if (activityData) {
			setActivities(activityData.filter((act) => act.type === 'post'));
		}
	}, [activityData]);

	useEffect(() => {
		if (userData) {
			if (userData.friendRequests) {
				const friendRequests = userData.friendRequests.map((user) => {
					return {
						_id: user._id,
						associatedID: user._id,
						message: `${user.firstname} sent you a friend request`,
						image: user.profile.url,
						type: 'user',
						seen: false,
					};
				});

				setRequests(friendRequests);
			}
		}
	}, [userData]);

	if (activityError || userError) {
		return <p>Failed to load activities</p>;
	}

	return (
		<section className='transition-all bg-card w-full sm:rounded-md p-3'>
			<Tabs defaultValue='activity' className='w-full'>
				<TabsList className='w-full flex'>
					<TabsTrigger className='relative flex-1' value='activity'>
						Activity
						{activities.filter((act) => !act.seen).length !== 0 && (
							<span className='absolute right-[6.5rem] flex h-3 w-3'>
								<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
								<span className='inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
							</span>
						)}
					</TabsTrigger>
					<TabsTrigger className='relative flex-1' value='requests'>
						Requests
						{requests.length !== 0 && (
							<span className='absolute right-[6rem] flex h-3 w-3'>
								<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
								<span className='inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
							</span>
						)}
					</TabsTrigger>
				</TabsList>
				<TabsContent value='activity'>
					<ActivityFeed
						isLoading={activityLoading || userLoading}
						activities={activities}
						refetch={refetch}
					/>
				</TabsContent>
				<TabsContent value='requests'>
					<ActivityFeed
						isLoading={activityLoading || userLoading}
						activities={requests}
						refetch={refetch}
					/>
				</TabsContent>
			</Tabs>
		</section>
	);
}
