/* eslint-disable react/prop-types */
import { useState } from 'react';
import DialogWrapper from './DialogWrapper';
import { Button } from './ui/button';
import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
} from './ui/menubar';
import { useToast } from './ui/use-toast';
import { deletePost, updatePost } from '@/api/post';

export default function PostController({ content, refetch, postID }) {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<Menubar className='w-fit'>
			<MenubarMenu>
				<MenubarTrigger disabled={isLoading}>
					<img className='size-6' src='/icons/3_dots.svg' alt='' />
				</MenubarTrigger>
				<MenubarContent className='text-muted-foreground flex flex-col rounded-md overflow-hidden'>
					<EditButton
						postID={postID}
						content={content}
						setIsLoading={setIsLoading}
						isLoading={isLoading}
						refetch={refetch}
					/>

					<DeleteButton
						postID={postID}
						refetch={refetch}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}

function EditButton({ content, setIsLoading, refetch, postID, isLoading }) {
	const { toast } = useToast();
	const [contentValue, setContentValue] = useState(content);

	const onEdit = async () => {
		try {
			setIsLoading(true);

			if (!contentValue) return;

			const result = await updatePost(postID, {
				content: contentValue,
			});

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to update the post',
				});
				return;
			}

			refetch();
			toast({
				title: 'Post updated successfully!',
			});
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to update the post',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DialogWrapper
			onConfirm={onEdit}
			title='Edit your post:'
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
					className='flex gap-2 justify-start rounded-none bg-secondary hover:bg-[#c2c6c7] text-muted-foreground'
				>
					<img className='size-5' src='/icons/edit.svg' alt='' />
					<p>Edit</p>
				</Button>
			}
		/>
	);
}

function DeleteButton({ setIsLoading, refetch, postID, isLoading }) {
	const { toast } = useToast();

	const onDelete = async () => {
		try {
			setIsLoading(true);

			const result = await deletePost(postID);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to delete the post',
				});
				return;
			}

			refetch();
			toast({
				title: 'Post deleted successfully!',
			});
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to delete the psot',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DialogWrapper
			onConfirm={onDelete}
			title='Are you sure you want to delete this post?'
			description='This action can not be undone'
			confirmBtnVariant='destructive'
			trigger={
				<Button
					disabled={isLoading}
					size='sm'
					className='flex gap-2 justify-start rounded-none bg-secondary hover:bg-[#c2c6c7] text-muted-foreground'
				>
					<img className='size-5' src='/icons/delete.svg' alt='' />
					<p>Delete</p>
				</Button>
			}
		/>
	);
}
