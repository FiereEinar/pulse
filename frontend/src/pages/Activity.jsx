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
		data,
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
	} = useQuery({
		queryKey: [`user_${currentUserID}`],
		queryFn: () => fetchUserByID(currentUserID),
	});

	useEffect(() => {
		// activities
		if (data) {
			setActivities(data.filter((act) => act.type === 'post'));
		}
	}, [data]);

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

	if (activityLoading || userLoading) {
		return <p>Loading...</p>;
	}

	if (activityError || userError) {
		return <p>Failed to load activities</p>;
	}

	return (
		<section className='bg-card w-full h-full rounded-md p-3'>
			<Tabs defaultValue='activity' className='w-full'>
				<TabsList className='w-full flex'>
					<TabsTrigger className='flex-1' value='activity'>
						Activity
						{/* <p className='relative'>
							Activity
							<div className='absolute rounded-full top-0.5 -right-5 text-xs flex items-center justify-center size-4 bg-destructive text-destructive-foreground'>
								{activities.filter((act) => !act.seen).length}
							</div>
						</p> */}
					</TabsTrigger>
					<TabsTrigger className='flex-1' value='requests'>
						Requests
					</TabsTrigger>
				</TabsList>
				<TabsContent value='activity'>
					<ActivityFeed activities={activities} />
				</TabsContent>
				<TabsContent value='requests'>
					<ActivityFeed activities={requests} />
				</TabsContent>
			</Tabs>
		</section>
	);
}
