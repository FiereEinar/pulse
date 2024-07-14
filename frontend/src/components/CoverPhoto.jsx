import CustomImageGallery from './CustomImageGallery';

/* eslint-disable react/prop-types */
export default function CoverPhoto({ image, userID }) {
	const currentUserID = localStorage.getItem('UserID');

	return (
		<div className='relative'>
			<CustomImageGallery image={image || '/default_cover.svg'} />

			{currentUserID === userID && (
				<div className='absolute bg-[#55595a] rounded-full p-2 right-1 bottom-1'>
					<label className='cursor-pointer' htmlFor='image'>
						<img className='size-5' src='/icons/camera.svg' alt='' />
					</label>
					<input hidden id='image' type='file' accept='image/*' />
				</div>
			)}
		</div>
	);
}
