/* eslint-disable react/prop-types */
import { useRef } from 'react';
import ImageGallery from 'react-image-gallery';

export default function CustomImageGallery({ image, containerClass }) {
	const imageGalleryRef = useRef(null);

	const onImageClick = () => {
		imageGalleryRef.current.toggleFullScreen();
	};

	return (
		<div
			className={`relative max-h-[15rem] overflow-hidden rounded-md ${containerClass}`}
		>
			<button className='absolute z-50 top-2 right-2' onClick={onImageClick}>
				<img className='size-6' src='/icons/fullscreen.svg' alt='fullscreen' />
			</button>
			<ImageGallery
				showThumbnails={false}
				showFullscreenButton={false}
				showPlayButton={false}
				showBullets={false}
				ref={imageGalleryRef}
				onClick={onImageClick}
				items={[
					{
						original: image,
					},
				]}
			/>
		</div>
	);
}
