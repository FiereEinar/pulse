/* eslint-disable react/prop-types */
import { useState } from 'react';
import HeartButton from './HeartButton';
import { useToast } from './ui/use-toast';
import { toggleCommentLike } from '@/api/post';
import { Button } from './ui/button';
import DialogWrapper from './DialogWrapper';
import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
} from '@radix-ui/react-menubar';

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
		<div className='mt-1 flex gap-2 flex-shrink-0'>
			<Menubar className='w-fit'>
				<MenubarMenu>
					<MenubarTrigger>
						<img className='size-6' src='/icons/3_dots.svg' alt='' />
					</MenubarTrigger>
					<MenubarContent className='text-muted-foreground flex flex-col rounded-md overflow-hidden'>
						{/* edit */}
						<DialogWrapper
							title='Are you sure you want to delete this comment?'
							description='This action can not be undone'
							trigger={
								<Button
									size='sm'
									className='flex gap-2 justify-start rounded-none bg-[#242526] hover:bg-[#3a3b3c] text-muted-foreground'
								>
									<img className='size-5' src='/icons/edit.svg' alt='' />
									<p>Edit</p>
								</Button>
							}
						/>

						{/* delete */}
						<DialogWrapper
							title='Are you sure you want to delete this comment?'
							description='This action can not be undone'
							confirmBtnVariant='destructive'
							trigger={
								<Button
									size='sm'
									className='flex gap-2 justify-start rounded-none bg-[#242526] hover:bg-[#3a3b3c] text-muted-foreground'
								>
									<img className='size-5' src='/icons/delete.svg' alt='' />
									<p>Delete</p>
								</Button>
							}
						/>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>

			{/* like */}
			<HeartButton
				isLiked={liked}
				isLoading={isLoading}
				likes={likes}
				onClick={onLikeClick}
			/>
		</div>
	);
}
