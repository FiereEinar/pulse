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
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className='flex gap-2 flex-shrink-0'>
			<Menubar className='w-fit'>
				<MenubarMenu>
					<MenubarTrigger disabled={isLoading}>
						<img className='size-6' src='/icons/3_dots.svg' alt='' />
					</MenubarTrigger>
					<MenubarContent className='text-muted-foreground flex flex-col rounded-md overflow-hidden'>
						<EditButton
							commentID={commentID}
							isLoading={isLoading}
							postID={postID}
							refetch={refetch}
							setIsLoading={setIsLoading}
							comment={comment}
						/>

						<DeleteButton
							commentID={commentID}
							isLoading={isLoading}
							postID={postID}
							refetch={refetch}
							setIsLoading={setIsLoading}
						/>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>

			{/* like */}
			<HeartButtonAction
				refetch={refetch}
				commentID={commentID}
				postID={postID}
				isLiked={isLiked}
				isLoading={isLoading}
				likes={likes}
				setIsLoading={setIsLoading}
			/>
		</div>
	);
}

function HeartButtonAction({
	isLoading,
	setIsLoading,
	likes,
	isLiked,
	postID,
	commentID,
	refetch,
}) {
	const currentUserID = localStorage.getItem('UserID');
	const { toast } = useToast();
	const [liked, setLiked] = useState(isLiked);

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

	return (
		<HeartButton
			isLiked={liked}
			isLoading={isLoading}
			likes={likes}
			onClick={onLike}
		/>
	);
}

function EditButton({
	postID,
	commentID,
	isLoading,
	setIsLoading,
	refetch,
	comment,
}) {
	const currentUserID = localStorage.getItem('UserID');
	const { toast } = useToast();
	const [contentValue, setContentValue] = useState(comment);

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
			toast({
				title: 'Your comment has been updated',
			});
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to update the comment',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
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
					disabled={isLoading}
					size='sm'
					className='flex gap-2 justify-start rounded-none bg-[#242526] hover:bg-[#3a3b3c] text-muted-foreground'
				>
					<img className='size-5' src='/icons/edit.svg' alt='' />
					<p>Edit</p>
				</Button>
			}
		/>
	);
}

function DeleteButton({ postID, commentID, isLoading, setIsLoading, refetch }) {
	const { toast } = useToast();

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
			toast({
				title: 'Your comment has been deleted',
			});
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
		<DialogWrapper
			onConfirm={onDelete}
			title='Are you sure you want to delete this comment?'
			description='This action can not be undone'
			confirmBtnVariant='destructive'
			trigger={
				<Button
					disabled={isLoading}
					size='sm'
					className='flex gap-2 justify-start rounded-none bg-[#242526] hover:bg-[#3a3b3c] text-muted-foreground'
				>
					<img className='size-5' src='/icons/delete.svg' alt='' />
					<p>Delete</p>
				</Button>
			}
		/>
	);
}
