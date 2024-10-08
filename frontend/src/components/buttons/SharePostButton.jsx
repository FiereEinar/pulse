import { useState } from 'react';
import DialogWrapper from '../DialogWrapper';
import ShareIcon from '../icons/share';
import { useToast } from '../ui/use-toast';
import { sharePostToggle } from '@/api/post';

export default function SharePostButton({
	shareCount,
	postID,
	refetch,
	disabled,
	isAlreadyShared,
}) {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const onShareHandler = async () => {
		try {
			setIsLoading(true);

			const result = await sharePostToggle(postID);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to share the post',
					description: 'An error occured while trying to share the post',
				});
				return;
			}

			toast({
				title: isAlreadyShared ? 'Shared post removed' : 'Post shared',
			});
			refetch();
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to share the post',
				description: 'An error occured while trying to share the post',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DialogWrapper
			description={
				isAlreadyShared
					? 'Unshare this post?'
					: disabled
					? 'You cant share your own post'
					: 'Share this post?'
			}
			customConfirmBtn={
				isAlreadyShared ? 'Unshare' : disabled ? 'Back' : 'Share'
			}
			onConfirm={disabled ? () => {} : onShareHandler}
			trigger={
				<button
					disabled={isLoading}
					className='postActionContainer flex gap-1 disabled:pointer-events-none'
				>
					<ShareIcon />
					<p className='text-muted-foreground'>{shareCount}</p>
				</button>
			}
		/>
	);
}
