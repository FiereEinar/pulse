import PostActions from './PostActions';
import PostUserHeader from './PostUserHeader';
import CustomImageGallery from './CustomImageGallery';

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
	refetch,
	userID,
	isEdited,
}) {
	return (
		<article className='p-3 flex flex-col gap-2'>
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
			{postImage && <CustomImageGallery image={postImage} />}

			{/* <p className='text-xs text-muted-foreground italic'>{date}</p> */}

			{/* post actions */}
			<div className='mt-1'>
				<PostActions
					refetch={refetch}
					likes={likes}
					comments={comments}
					shares={shares}
					postID={postID}
					isLiked={isLiked}
				/>
			</div>
		</article>
	);
}
