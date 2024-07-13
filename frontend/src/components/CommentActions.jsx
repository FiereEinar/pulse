/* eslint-disable react/prop-types */
import { useState } from 'react';
import HeartButton from './HeartButton';
import { useToast } from './ui/use-toast';
import { deleteComment, toggleCommentLike, updateComment } from '@/api/post';
import { Button } from './ui/button';
import DialogWrapper from './DialogWrapper';
import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
} from './ui/menubar';

export default function CommentActions({
	refetch,
	isLiked,
	commentID,
	postID,
	likes,
	comment,
}) {
	const { toast } = useToast();
	const currentUserID = localStorage.getItem('UserID');
	const [isLoading, setIsLoading] = useState(false);

	// for like
	const [liked, setLiked] = useState(isLiked);

	// for edit
	const [contentValue, setContentValue] = useState(comment);

	// like handler
	const onLike = async () => {
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

	// edit handler
	const onEdit = async () => {
		try {
			setIsLoading(true);

			if (!contentValue) return;

			const result = await updateComment(postID, commentID, {
				commenterID: currentUserID,
				content: contentValue,
			});

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to update the comment',
				});
				return;
			}

			refetch();
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to update the comment',
			});
		} finally {
			setIsLoading(false);
		}
	};

	// delete handler
	const onDelete = async () => {
		try {
			setIsLoading(true);

			const result = await deleteComment(postID, commentID);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to delete the comment',
				});
				return;
			}

			refetch();
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to delete the comment',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex gap-2 flex-shrink-0'>
			<Menubar className='w-fit'>
				<MenubarMenu>
					<MenubarTrigger disabled={isLoading}>
						<img className='size-6' src='/icons/3_dots.svg' alt='' />
					</MenubarTrigger>
					<MenubarContent className='text-muted-foreground flex flex-col rounded-md overflow-hidden'>
						{/* edit */}
						<DialogWrapper
							onConfirm={onEdit}
							title='Edit your comment:'
							body={
								<textarea
									value={contentValue}
									onChange={(e) => setContentValue(e.target.value)}
									className='w-full bg-card p-1 rounded-md focus:outline-none text-muted-foreground'
									rows={3}
								/>
							}
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
							onConfirm={onDelete}
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
				onClick={onLike}
			/>
		</div>
	);
}
