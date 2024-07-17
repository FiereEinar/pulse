import { useState } from 'react';
import { postLikeToggle } from '@/api/post';
import { useToast } from './ui/use-toast';
import { Link } from 'react-router-dom';
import CommentIcon from './icons/comment';
import HeartButton from './buttons/HeartButton';
import SharePostButton from './buttons/SharePostButton';

export default function PostActions({
	postID,
	isLiked,
	likes,
	comments,
	shares,
	postCreatorID,
	refetch,
	isAlreadyShared,
}) {
	const { toast } = useToast();
	const currentUserID = localStorage.getItem('UserID');

	const [liked, setLiked] = useState(isLiked);
	const [isLoading, setIsLoading] = useState(false);

	const onLikeClick = async () => {
		try {
			setIsLoading(true);
			setLiked(!liked);

			const result = await postLikeToggle(postID);

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

			<SharePostButton
				refetch={refetch}
				shareCount={shares}
				postID={postID}
				disabled={postCreatorID === currentUserID}
				isAlreadyShared={isAlreadyShared}
			/>
		</div>
	);
}
