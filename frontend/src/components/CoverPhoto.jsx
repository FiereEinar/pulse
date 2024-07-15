import { updateUserCover } from '@/api/user';
import CustomImageGallery from './CustomImageGallery';
import { useToast } from './ui/use-toast';
import { useState } from 'react';

export default function CoverPhoto({ image, userID, refetch }) {
	const { toast } = useToast();
	const currentUserID = localStorage.getItem('UserID');
	const [isLoading, setIsLoading] = useState(false);

	const onCoverChangeHandler = async (e) => {
		try {
			setIsLoading(true);
			const image = e.target.files[0];

			const formData = new FormData();
			if (image) formData.append('image', image);

			const result = await updateUserCover(currentUserID, formData);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to update your cover photo',
					description:
						'An error occured while trying to update your cover photo',
				});
				return;
			}

			refetch();
			toast({
				title: 'Your cover photo has been updated successfully!',
			});
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to update your cover photo',
				description: 'An error occured while trying to update your cover photo',
			});
		} finally {
			setIsLoading(false);
		}
	};

	// camera bg - bg-[#55595a]

	return (
		<div className='relative'>
			<CustomImageGallery image={image || '/default_cover.svg'} />

			{currentUserID === userID && (
				<div className='absolute rounded-full p-2 right-1 bottom-1'>
					<label
						disabled={isLoading}
						className='cursor-pointer disabled:opacity-70'
						htmlFor='coverPhoto'
					>
						<img className='size-5' src='/icons/camera.svg' alt='' />
					</label>
					<input
						disabled={isLoading}
						onChange={onCoverChangeHandler}
						hidden
						id='coverPhoto'
						type='file'
						accept='image/*'
					/>
				</div>
			)}
		</div>
	);
}
