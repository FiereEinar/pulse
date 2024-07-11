import { useRef } from 'react';
import PostActions from './PostActions';
import PostUserHeader from './PostUserHeader';
import ImageGallery from 'react-image-gallery';

/* eslint-disable react/prop-types */
export default function PostCard({
	creatorProfile,
	fullname,
	username,
	content,
	postImage,
	date,
	isLiked,
	postID,
	likes,
	comments,
	shares,
}) {
	const imageGalleryRef = useRef(null);

	const onImageClick = () => {
		imageGalleryRef.current.toggleFullScreen();
	};

	return (
		<article className='p-3 flex flex-col gap-2'>
			{/* post header */}
			<PostUserHeader
				creatorProfile={creatorProfile}
				fullname={fullname}
				username={username}
			/>

			{/* post content */}
			<div>
				<p className='text-muted-foreground'>{content}</p>
			</div>

			{/* post image */}
			{postImage && (
				<div className='relative max-h-[15rem] overflow-hidden rounded-md'>
					<button
						className='absolute z-50 top-2 right-2'
						onClick={onImageClick}
					>
						<img
							className='size-6'
							src='/icons/fullscreen.svg'
							alt='fullscreen'
						/>
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
								original: postImage,
								thumbnail: postImage,
							},
						]}
					/>
				</div>
			)}

			<p className='text-xs text-muted-foreground italic'>{date}</p>

			{/* post actions */}
			<PostActions
				likes={likes}
				comments={comments}
				shares={shares}
				postID={postID}
				isLiked={isLiked}
			/>
		</article>
	);
}
