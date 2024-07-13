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

export default function PostController({ content, refetch }) {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<Menubar className='w-fit'>
			<MenubarMenu>
				<MenubarTrigger disabled={isLoading}>
					<img className='size-6' src='/icons/3_dots.svg' alt='' />
				</MenubarTrigger>
				<MenubarContent className='text-muted-foreground flex flex-col rounded-md overflow-hidden'>
					<EditButton
						content={content}
						setIsLoading={setIsLoading}
						refetch={refetch}
					/>

					{/* delete */}
					<DialogWrapper
						// onConfirm={onDelete}
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
	);
}

function EditButton({ content, setIsLoading, refetch }) {
	const { toast } = useToast();
	const [contentValue, setContentValue] = useState(content);

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
