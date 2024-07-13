import { fetchUserPosts } from '@/api/post';
import { fetchUserByID } from '@/api/user';
import CoverPhoto from '@/components/CoverPhoto';
import PostsFeed from '@/components/PostsFeed';
import { Button } from '@/components/ui/button';
import UserGrid from '@/components/UserGrid';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { Link, useParams } from 'react-router-dom';

export default function Profile() {
	const currentUserID = localStorage.getItem('UserID');
	const { userID } = useParams();

	const {
		data: userData,
		error: userError,
		isLoading: userLoading,
	} = useQuery({
		queryKey: [`user_${userID}`],
		queryFn: () => fetchUserByID(userID),
	});

	const {
		data: userPosts,
		error: postsError,
		isLoading: postsLoading,
		refetch: postsRefetch,
	} = useQuery({
		queryKey: [`user_posts_${userID}`],
		queryFn: () => fetchUserPosts(userID),
	});

	if (userLoading) {
		return (
			<div className='bg-card w-full rounded-md h-full text-muted-foreground'>
				Loading...
			</div>
		);
	}

	if (userError) {
		return (
			<div className='bg-card w-full rounded-md h-full text-destructive'>
				Failed to fetch user
			</div>
		);
	}

	return (
		<section className='w-full h-full'>
			{/* user profile */}
			<div className='bg-card w-full rounded-md h-fit p-3'>
				<div className='relative'>
					<CoverPhoto image={userData.cover?.url} userID={userData._id} />

					{/* spacing */}
					<div className='w-full h-8' />

					{/* user profile picture */}
					<img
						className='absolute bottom-0 left-3 size-[5rem] rounded-full object-cover object-center'
						src={userData.profile?.url || '/default_user.jpg'}
						alt='profile'
					/>
				</div>

				<div className='mt-3 flex items-start justify-between'>
					<div>
						<h1 className='text-xl font-semibold text-popover-foreground'>
							{_.startCase(`${userData.firstname} ${userData.lastname}`)}
						</h1>
						<p className='text-muted-foreground'>@{userData.username}</p>
					</div>

					{userID !== currentUserID &&
						!userData.friends.some(
							(friend) => friend._id === currentUserID
						) && <Button size='sm'>Send Request</Button>}

					{userID === currentUserID && <Button size='sm'>Edit Profile</Button>}
				</div>
			</div>

			{/* friends section */}
			<div className='mt-3'>
				<div className='flex justify-between items-center'>
					<h2 className='text-lg text-muted-foreground'>Friends</h2>
					{userID === currentUserID ? (
						<Link
							className='hover:underline text-muted-foreground text-sm'
							to='/users'
						>
							Find Friends
						</Link>
					) : (
						<Link
							className='hover:underline text-muted-foreground text-sm'
							to='/users/:userID/friends'
						>
							View Friends
						</Link>
					)}
				</div>
				<UserGrid type='Friends' users={userData.friends} />
			</div>

			{/* posts */}
			<div className='mt-3'>
				<h2 className='text-lg text-muted-foreground'>Posts</h2>
				<PostsFeed
					error={postsError}
					isLoading={postsLoading}
					posts={userPosts}
					refetch={postsRefetch}
				/>
			</div>
		</section>
	);
}
