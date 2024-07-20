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
import ImagePreview from '../ImagePreview';
import EmojiPickerButton from '../buttons/EmojiPickerButton';
import AddPhotoIcon from '../icons/add-photo';

export default function CreatePostForm({ currentUser }) {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [image, setImage] = useState(null);
	const [content, setContent] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(createPostSchema),
	});

	// eslint-disable-next-line no-unused-vars
	const onPostSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append('content', content);
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

	const addEmoji = (emoji) => {
		setContent(content + emoji.native);
	};

	return (
		<form
			onSubmit={handleSubmit(onPostSubmit)}
			className='transition-all relative bg-card w-full sm:rounded-md'
		>
			<div className='p-3 flex justify-between gap-2'>
				<PostUserHeader
					userID={currentUser._id}
					creatorProfile={currentUser.profile.url}
					fullname={`${currentUser.firstname} ${currentUser.lastname}`}
					username={currentUser.username}
				/>

				<div className='flex items-center'>
					{/* add image */}
					<div className='flex'>
						<Button
							title='Add Image'
							variant='icon'
							disabled={isSubmitting}
							type='button'
							size='sm'
							className='p-0 flex justify-center flex-shrink-0'
						>
							<label
								className='z-50 cursor-pointer size-full flex items-center px-3 flex-shrink-0'
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
					</div>

					{/* emoji picker button */}
					<EmojiPickerButton onSelect={addEmoji} isSubmitting={isSubmitting} />
				</div>
			</div>

			{/* content */}
			<div>
				<textarea
					disabled={isSubmitting}
					{...register('content')}
					className='transition-all w-full bg-card p-1 text-muted-foreground focus:outline-none px-3'
					placeholder='Write about something...'
					name='content'
					id='content'
					// autoFocus
					rows={4}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<div className='px-3'>
					{errors.content && <FormError message={errors.content.message} />}
				</div>
			</div>

			{/* image preview */}
			{image && (
				<ImagePreview
					image={URL.createObjectURL(image)}
					isSubmitting={isSubmitting}
					onCancel={() => setImage(null)}
					imageClass={''}
				/>
			)}

			{/* submit button */}
			<div className='flex justify-end p-3'>
				<Button
					title='Create Post'
					disabled={isSubmitting}
					className='flex-shrink-0 gap-1'
					size='sm'
				>
					<img className='size-5' src='/icons/add.svg' alt='' />

					<p className='hidden sm:flex'>Create Post</p>
					<p className='sm:hidden'>Post</p>
				</Button>
			</div>
		</form>
	);
}
