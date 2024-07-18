import PostActions from './PostActions';
import PostUserHeader from './PostUserHeader';
import CustomImageGallery from './CustomImageGallery';
import SharePostButton from './buttons/SharePostButton';
import { truncateText } from '@/lib/utils';
import { useState } from 'react';

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
	refetch,
	userID,
	isEdited,
	isSharedByCurrentUser,
	isSharedByViewedUser,
	isSingular,
	disabled,
}) {
	const currentUserID = localStorage.getItem('UserID');
	const isSharedPost = isSharedByCurrentUser || isSharedByViewedUser;
	const [expanded, setExpanded] = useState(false);

	return (
		<article className='p-3 flex flex-col gap-2'>
			{/* the info that shows at the top if the post is shared by the user */}
			{isSharedPost && (
				<div className='flex'>
					<SharePostButton
						refetch={refetch}
						postID={postID}
						disabled={userID === currentUserID}
						isAlreadyShared={isSharedByCurrentUser}
					/>
					<p className='text-muted-foreground italic text-sm'>
						{isSharedByCurrentUser ? 'You' : 'This user'} shared this post
					</p>
				</div>
			)}

			{/* post header */}
			<div className={`${disabled && 'pointer-events-none'}`}>
				<PostUserHeader
					postID={postID}
					refetch={refetch}
					showActions={true}
					isEdited={isEdited}
					content={content}
					creatorProfile={creatorProfile}
					fullname={fullname}
					userID={userID}
					date={date}
					username={username}
				/>
			</div>

			{/* post content */}
			<div>
				{content.split(' ').length > 50 && !expanded ? (
					<>
						<p
							onClick={() => setExpanded(!expanded)}
							className='text-muted-foreground text-wrap cursor-pointer'
						>
							{truncateText(content, 50)}
						</p>
						<button
							onClick={() => setExpanded(!expanded)}
							className='text-sm text-muted-foreground underline'
						>
							See more...
						</button>
					</>
				) : (
					<>
						<p
							onClick={() => setExpanded(!expanded)}
							className='text-muted-foreground text-wrap cursor-pointer'
						>
							{content}
						</p>
						{content.split(' ').length > 50 && (
							<button
								onClick={() => setExpanded(!expanded)}
								className='text-sm text-muted-foreground underline'
							>
								See less...
							</button>
						)}
					</>
				)}
			</div>

			{/* post image */}
			{postImage && (
				<CustomImageGallery
					image={postImage}
					containerClass={isSingular && 'max-h-full'}
				/>
			)}

			<div className={`${disabled && 'hidden'}`}>
				{/* post actions */}
				<div className='mt-1'>
					<PostActions
						refetch={refetch}
						likes={likes}
						comments={comments}
						postCreatorID={userID}
						shares={shares}
						postID={postID}
						isLiked={isLiked}
						isAlreadyShared={isSharedByCurrentUser}
					/>
				</div>
			</div>
		</article>
	);
}
