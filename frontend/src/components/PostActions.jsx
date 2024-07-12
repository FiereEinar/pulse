/* eslint-disable react/prop-types */
import { useState } from 'react';
import { togglePostLike } from '@/api/post';
import { useToast } from './ui/use-toast';
import { Link } from 'react-router-dom';
import HeartIcon from './icons/heart';
import CommentIcon from './icons/comment';
import ShareIcon from './icons/share';

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
	const textMutedForeground = '#64748b';

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
			<button
				disabled={isLoading}
				onClick={onLikeClick}
				className={`flex gap-1 post-action active-heart disabled:opacity-70 ${
					!liked && 'postActionContainer'
				}`}
			>
				<HeartIcon
					fill={liked ? 'red' : 'none'}
					stroke={liked ? 'red' : textMutedForeground}
				/>
				<p className='text-muted-foreground'>{likes}</p>
			</button>

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
