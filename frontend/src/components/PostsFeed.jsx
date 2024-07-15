import { format } from 'date-fns';
import PostCard from './PostCard';
import { useToast } from './ui/use-toast';
import { useEffect } from 'react';
import { FormError } from './ui/error';
import { PostCardContainer } from './ui/container';

export default function PostsFeed({ posts, error, isLoading, refetch }) {
	const currentUserID = localStorage.getItem('UserID');
	const { toast } = useToast();

	useEffect(() => {
		if (error) {
			toast({
				variant: 'destructive',
				title: 'Failed to fetch posts',
			});
		}
	}, [error, toast]);

	return (
		<section className='flex flex-col gap-3'>
			{isLoading && <p className='text-muted-foreground'>Loading...</p>}
			{error && <FormError message='Failed to fetch posts' />}
			{posts && posts.length === 0 && (
				<p className='transition-all h-full w-full bg-card p-3 rounded-md text-muted-foreground italic text-sm'>
					No posts yet
				</p>
			)}
			{posts &&
				posts.map((post) => (
					<PostCardContainer key={post._id}>
						<PostCard
							isEdited={post.edited}
							likes={post.likes.length}
							comments={post.comments.length}
							shares={post.shares.length}
							postID={post._id}
							isLiked={post.likes.includes(currentUserID)}
							content={post.content}
							creatorProfile={post.creator.profile.url}
							fullname={`${post.creator.firstname} ${post.creator.lastname}`}
							postImage={post.image.url}
							refetch={refetch}
							userID={post.creator._id}
							username={post.creator.username}
							date={format(post.dateCreated, 'MMMM dd, yyyy')}
						/>
					</PostCardContainer>
				))}
		</section>
	);
}
