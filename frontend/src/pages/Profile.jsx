import { fetchUserPosts } from '@/api/post';
import { fetchUserByID } from '@/api/user';
import { PostFeedLoading } from '@/components/LoadingCards';
import PostsFeed from '@/components/PostsFeed';
import UserGrid from '@/components/UserGrid';
import UserProfile from '@/components/UserProfile';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Profile() {
	const currentUserID = localStorage.getItem('UserID');
	const navigate = useNavigate();
	const { userID } = useParams();

	const {
		data: userData,
		error: userError,
		isLoading: userLoading,
		refetch: userRefetch,
	} = useQuery({
		queryKey: [`user_${userID}`],
		queryFn: () => fetchUserByID(userID),
	});

	const {
		data: currentUserData,
		error: currentUserError,
		isLoading: currentUserLoading,
		refetch: currentUserRefetch,
	} = useQuery({
		queryKey: [`user_${currentUserID}`],
		queryFn: () => fetchUserByID(currentUserID),
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

	if (userLoading || currentUserLoading) {
		return <PostFeedLoading />;
	}

	if (userError || currentUserError) {
		return (
			<div className='transition-all bg-card w-full rounded-md h-full text-destructive'>
				Failed to fetch user
			</div>
		);
	}

	return (
		<section className='w-full h-full'>
			<UserProfile
				coverImage={userData.cover?.url}
				// the user being viewed
				friends={userData.friends}
				friendRequests={userData.friendRequests}
				// current user
				currentUserRequests={currentUserData.friendRequests}
				currentUserFriends={currentUserData.friends}
				fullname={`${userData.firstname} ${userData.lastname}`}
				username={userData.username}
				bio={userData.bio}
				refetch={() => {
					currentUserRefetch();
					userRefetch();
				}}
				profileImage={userData.profile?.url}
				userID={userData._id}
			/>

			{/* friends section */}
			<div className='mt-3'>
				<div className='flex justify-between items-center px-3'>
					<h2 className='text-lg text-muted-foreground'>Friends</h2>
					{userID === currentUserID && (
						<Link
							className='hover:underline text-muted-foreground text-sm'
							to='/search/users'
						>
							Find Friends
						</Link>
					)}
				</div>

				<div className='transition-all bg-card sm:rounded-md overflow-hidden'>
					<UserGrid type='Friends' users={userData.friends} />
					<button
						onClick={() => navigate(`/user/${userData._id}/friends`)}
						className='transition-all border-t hover:bg-secondary w-full p-2 text-muted-foreground'
					>
						View All Friends
					</button>
				</div>
			</div>

			{/* posts */}
			<div className='mt-3'>
				<h2 className='text-lg text-muted-foreground px-3'>Posts</h2>
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
