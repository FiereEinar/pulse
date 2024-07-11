import { format } from 'date-fns';
import PostCard from './PostCard';
import { useToast } from './ui/use-toast';
import { useEffect } from 'react';
import { FormError } from './ui/error';

/* eslint-disable react/prop-types */
export default function PostsFeed({ posts, error, isLoading }) {
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
			{error && (
				<FormError message='Error fetching posts' />
				// <p className='text-muted-foreground'>Error fetching posts...</p>
			)}
			{posts &&
				posts.map((post) => (
					<PostCard
						key={post._id}
						content={post.content}
						creatorProfile={post.creator.profile.url}
						fullname={`${post.creator.firstname} ${post.creator.lastname}`}
						postImage={post.image.url}
						username={post.creator.username}
						date={format(post.dateCreated, 'MMMM dd, yyyy')}
					/>
				))}
		</section>
	);
}
