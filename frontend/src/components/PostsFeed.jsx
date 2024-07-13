import { format } from 'date-fns';
import PostCard from './PostCard';
import { useToast } from './ui/use-toast';
import { useEffect } from 'react';
import { FormError } from './ui/error';
import { PostCardContainer } from './ui/container';

/* eslint-disable react/prop-types */
export default function PostsFeed({ posts, error, isLoading, refetch }) {
	const currentUserID = localStorage.getItem('UserID');
	const { toast } = useToast();

	useEffect(() => {
		if (error) {
			toast({
				variant: 'destructive',
				title: 'Error fetching posts',
			});
		}
	}, [error, toast]);

	return (
		<section className='flex flex-col gap-3'>
			{isLoading && <p className='text-muted-foreground'>Loading...</p>}
			{error && <FormError message='Error fetching posts' />}
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
