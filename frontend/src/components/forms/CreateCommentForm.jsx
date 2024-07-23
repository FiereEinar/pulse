import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { createPostSchema } from '@/lib/validations/postSchema';
import { FormError } from '../ui/error';
import { createComment } from '@/api/post';
import ImagePreview from '../ImagePreview';
import AddPhotoIcon from '../icons/add-photo';
import EmojiPickerButton from '../buttons/EmojiPickerButton';

export default function CreateCommentForm({ postID, refetch }) {
	const currentUserID = localStorage.getItem('UserID');
	const { toast } = useToast();
	const [image, setImage] = useState(null);
	const [content, setContent] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(createPostSchema),
	});

	// eslint-disable-next-line no-unused-vars
	const onCommentSubmit = async (_data) => {
		try {
			const formData = new FormData();
			formData.append('content', content);
			formData.append('commenterID', currentUserID);
			if (image) formData.append('image', image);

			const result = await createComment(postID, formData);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to post your comment',
					description: 'An error occured while posting your comment',
				});
				return;
			}

			reset();
			setContent('');
			setImage(null);
			refetch();
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to post your comment',
				description: 'An error occured while posting your comment',
			});
		}
	};

	const addEmoji = (emoji) => {
		setContent(content + emoji.native);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onCommentSubmit)} className='flex px-3'>
				<div className='relative flex w-full'>
					<textarea
						disabled={isSubmitting}
						{...register('content')}
						// autoFocus
						className='transition-all w-full bg-card p-1 pr-[5rem] flex-shrink text-muted-foreground px-3 focus:outline-none border rounded-md'
						placeholder='Write a comment'
						name='content'
						id='content'
						value={content}
						onChange={(e) => setContent(e.target.value)}
						rows={1}
					/>

					{/* image and emoji container */}
					<div className='absolute right-0 flex flex-shrink-0 gap-1'>
						{/* add image */}
						<div className='flex'>
							<Button
								title='Add Image'
								variant='icon'
								size='sm'
								disabled={isSubmitting}
								type='button'
								className='p-0 flex justify-center flex-shrink-0'
							>
								<label
									className='z-50 p-1 cursor-pointer size-full flex items-center flex-shrink-0'
									htmlFor='image'
								>
									<AddPhotoIcon height='20px' width='20px' />
								</label>
							</Button>
							<input
								disabled={isSubmitting}
								onChange={(e) => setImage(e.target.files[0])}
								type='file'
								name='image'
								id='image'
								accept='image/*'
								hidden
							/>

							{/* emoji picker button */}
							<EmojiPickerButton
								onSelect={addEmoji}
								isSubmitting={isSubmitting}
								emojiContainerClass='right-[-0.2rem] top-[2.2rem]'
							/>
						</div>
					</div>
				</div>

				<Button size='sm' disabled={isSubmitting} className='p-3'>
					<p className='hidden sm:flex'>Comment</p>
					<img className='size-5 flex sm:hidden' src='/icons/send.svg' alt='' />
				</Button>
			</form>

			<div className='px-3'>
				{errors.content && <FormError message={errors.content.message} />}
			</div>
			{image && (
				<div className='w-[15rem] px-3'>
					<ImagePreview
						image={URL.createObjectURL(image)}
						isSubmitting={isSubmitting}
						onCancel={() => setImage(null)}
						imageClass={''}
					/>
				</div>
			)}
		</>
	);
}
