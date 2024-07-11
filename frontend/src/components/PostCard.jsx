import PostActions from './PostActions';
import PostUserHeader from './PostUserHeader';

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
	return (
		<article className='transition-all bg-card p-3 rounded-md flex flex-col gap-2 shadow-lg border'>
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
				<div>
					<img
						className='rounded-md object-cover object-center w-full'
						src={postImage}
						alt='image'
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
