/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from '../ui/button';
import PostUserHeader from '../PostUserHeader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema } from '@/lib/validations/postSchema';
import { FormError } from '../ui/error';
import { useToast } from '../ui/use-toast';
import { createPost } from '@/api/post';
import { useNavigate } from 'react-router-dom';

export default function CreatePostForm({ currentUser }) {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [image, setImage] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(createPostSchema),
	});

	const onPostSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append('content', data.content);
			formData.append('creatorID', currentUser._id);
			if (image) formData.append('image', image);

			const result = await createPost(formData);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to create your post',
					description: 'An error occured while creating your post',
				});
				return;
			}

			toast({
				title: 'Your post has been created!',
			});
			navigate('/');
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to create your post',
				description: 'An error occured while creating your post',
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onPostSubmit)}
			className='bg-card w-full rounded-md border'
		>
			<div className='p-3 flex justify-between gap-2'>
				<PostUserHeader
					creatorProfile={currentUser.profile.url}
					fullname={`${currentUser.firstname} ${currentUser.lastname}`}
					username={currentUser.username}
				/>

				<div className='flex gap-2 items-center'>
					{/* add image */}
					<div className='flex'>
						<Button
							title='Add Image'
							disabled={isSubmitting}
							type='button'
							size='sm'
							className='p-0 flex justify-center flex-shrink-0'
						>
							<label
								className='z-50 cursor-pointer size-full flex items-center px-3 flex-shrink-0'
								htmlFor='image'
							>
								<img
									className='size-5 sm:mr-1'
									src='/icons/add-photo.svg'
									alt=''
								/>
								<p className='hidden sm:flex'>
									{image ? 'Change Image' : 'Add Image'}
								</p>
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

					{/* submit button */}
					<Button
						title='Create Post'
						disabled={isSubmitting}
						className='flex-shrink-0'
						size='sm'
					>
						<img className='size-5 sm:mr-1' src='/icons/add.svg' alt='' />

						<p className='hidden sm:flex'>Create Post</p>
					</Button>
				</div>
			</div>

			{/* content */}
			<div>
				<textarea
					disabled={isSubmitting}
					{...register('content')}
					className='w-full bg-card p-1 text-muted-foreground'
					placeholder='Write about something...'
					name='content'
					id='content'
					rows={4}
				/>
				{errors.content && <FormError message={errors.content.message} />}
			</div>

			{/* image preview */}
			{image && (
				<div className='relative pt-1'>
					<img
						className='object-cover object-center rounded-md w-full'
						src={URL.createObjectURL(image)}
						alt='image preview'
					/>
					<button
						disabled={isSubmitting}
						type='button'
						onClick={() => setImage(null)}
						className='absolute size-5 p-1 bg-card rounded-full top-2 right-2 disabled:opacity-70'
					>
						<img src='/icons/close.svg' alt='' />
					</button>
				</div>
			)}
		</form>
	);
}
