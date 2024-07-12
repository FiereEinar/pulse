/* eslint-disable react/prop-types */
import { useState } from 'react';
import HeartButton from './HeartButton';
import { useToast } from './ui/use-toast';
import { toggleCommentLike } from '@/api/post';

export default function CommentActions({
	refetch,
	isLiked,
	commentID,
	postID,
	likes,
}) {
	const { toast } = useToast();
	const currentUserID = localStorage.getItem('UserID');

	const [liked, setLiked] = useState(isLiked);
	const [isLoading, setIsLoading] = useState(false);

	const onLikeClick = async () => {
		try {
			setIsLoading(true);
			setLiked(!liked);

			const result = await toggleCommentLike(
				postID,
				commentID,
				currentUserID,
				liked
			);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to like the comment',
				});
				return;
			}

			refetch();
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to like the comment',
			});
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className='mt-3'>
			<HeartButton
				isLiked={liked}
				isLoading={isLoading}
				likes={likes}
				onClick={onLikeClick}
			/>
		</div>
	);
}
