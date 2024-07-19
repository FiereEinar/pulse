import { format } from 'date-fns';
import PostCard from './PostCard';
import { useToast } from './ui/use-toast';
import { useEffect, useRef } from 'react';
import { FormError } from './ui/error';
import { PostCardContainer } from './ui/container';
import { useParams } from 'react-router-dom';
import { PostCardLoading, PostFeedLoading } from './LoadingCards';

export default function PostsFeed({
	posts,
	error,
	isLoading,
	refetch,
	postsRefetcher,
	isFetching,
}) {
	const bottomRef = useRef(null);
	const { userID } = useParams();
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

	useEffect(() => {
		const bottomRefCurrent = bottomRef.current;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					if (postsRefetcher) postsRefetcher();
				}
			},
			{
				root: null, // use the viewport as the container
				rootMargin: '0px',
				threshold: 1.0, // trigger when 100% of the target is visible
			}
		);

		if (bottomRef.current) {
			observer.observe(bottomRef.current);
		}

		return () => {
			if (bottomRefCurrent) {
				observer.unobserve(bottomRefCurrent);
			}
		};
	}, [postsRefetcher]);

	return (
		<section className='flex flex-col gap-3'>
			{isLoading && <PostFeedLoading />}
			{error && <FormError message='Failed to fetch posts' />}
			{posts && posts.length === 0 && !isLoading && (
				<p className='transition-all h-full w-full bg-card p-3 rounded-md text-muted-foreground italic text-sm'>
					No posts yet
				</p>
			)}
			{posts &&
				!isLoading &&
				!error &&
				posts.map((post) => (
					<PostCardContainer key={post._id}>
						<PostCard
							isEdited={post.edited}
							likes={post.likes.length}
							comments={post.comments.length}
							shares={post.shares.length}
							isSharedByCurrentUser={post.shares.includes(currentUserID)}
							isSharedByViewedUser={post.shares.includes(userID)}
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
							disabled={post.isDisabled}
						/>
					</PostCardContainer>
				))}

			<div ref={bottomRef} />

			{isFetching && <PostCardLoading />}
		</section>
	);
}
