/* eslint-disable react/prop-types */
import { useState } from 'react';
import { togglePostLike } from '@/api/post';
import { useToast } from './ui/use-toast';
import { Link } from 'react-router-dom';
import CommentIcon from './icons/comment';
import ShareIcon from './icons/share';
import HeartButton from './HeartButton';

export default function PostActions({
	postID,
	isLiked,
	likes,
	comments,
	shares,
	refetch,
}) {
	const { toast } = useToast();
	const currentUserID = localStorage.getItem('UserID');

	const [liked, setLiked] = useState(isLiked);
	const [isLoading, setIsLoading] = useState(false);

	const onLikeClick = async () => {
		try {
			setIsLoading(true);
			setLiked(!liked);

			const result = await togglePostLike(postID, currentUserID, liked);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to like the post',
				});
				return;
			}

			refetch();
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to like the post',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex gap-3 items-center'>
			<HeartButton
				isLiked={liked}
				isLoading={isLoading}
				likes={likes}
				onClick={onLikeClick}
			/>

			<Link to={`/post/${postID}`}>
				<button className='postActionContainer heartIcon flex gap-1'>
					<CommentIcon width='22px' height='22px' />
					<p className='text-muted-foreground'>{comments}</p>
				</button>
			</Link>

			<button className='postActionContainer flex gap-1'>
				<ShareIcon />
				<p className='text-muted-foreground'>{shares}</p>
			</button>
		</div>
	);
}
