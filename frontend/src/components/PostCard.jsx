import PostActions from './PostActions';
import PostUserHeader from './PostUserHeader';
import CustomImageGallery from './CustomImageGallery';
import ShareIcon from './icons/share';
import SharePostButton from './buttons/SharePostButton';

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
}) {
	const currentUserID = localStorage.getItem('UserID');
	const isSharedPost = isSharedByCurrentUser || isSharedByViewedUser;

	return (
		<article className='p-3 flex flex-col gap-2'>
			{isSharedPost && (
				<div className='flex'>
					{/* <ShareIcon /> */}
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

			{/* post content */}
			<div>
				<p className='text-muted-foreground text-wrap'>{content}</p>
			</div>

			{/* post image */}
			{postImage && (
				<CustomImageGallery
					image={postImage}
					containerClass={isSingular && 'max-h-full'}
				/>
			)}

			{/* <p className='text-xs text-muted-foreground italic'>{date}</p> */}

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
		</article>
	);
}
