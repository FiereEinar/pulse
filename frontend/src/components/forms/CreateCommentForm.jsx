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

export default function CreateCommentForm({ postID, refetch }) {
	const currentUserID = localStorage.getItem('UserID');
	const { toast } = useToast();
	const [image, setImage] = useState(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(createPostSchema),
	});

	const onCommentSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append('content', data.content);
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

	return (
		<>
			<form onSubmit={handleSubmit(onCommentSubmit)} className='flex px-3'>
				<input
					disabled={isSubmitting}
					{...register('content')}
					autoFocus
					className='transition-all w-full bg-card p-1 flex-shrink text-muted-foreground px-3 focus:outline-none border rounded-md'
					placeholder='Write a comment'
					name='content'
					id='content'
				/>
				{errors.content && <FormError message={errors.content.message} />}

				<div className='flex flex-shrink-0 gap-1'>
					{/* add image */}
					<div className='flex'>
						<Button
							title='Add Image'
							disabled={isSubmitting}
							type='button'
							className='p-0 flex justify-center flex-shrink-0'
						>
							<label
								className='z-50 p-3 cursor-pointer size-full flex items-center flex-shrink-0'
								htmlFor='image'
							>
								<AddPhotoIcon height='20px' width='20px' stroke='#FFFFFF' />
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
					</div>

					<Button disabled={isSubmitting} className='p-3'>
						<p className='hidden sm:flex'>Comment</p>
						<img
							className='size-5 flex sm:hidden'
							src='/icons/send.svg'
							alt=''
						/>
					</Button>
				</div>
			</form>
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
