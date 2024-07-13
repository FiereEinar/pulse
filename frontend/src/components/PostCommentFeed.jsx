import CommentCard from './CommentCard';

/* eslint-disable react/prop-types */
export default function PostCommentFeed({ comments, postID, refetch }) {
	const currentUserID = localStorage.getItem('UserID');

	return (
		<div>
			{comments.length === 0 && (
				<p className='text-muted-foreground italic text-xs'>No comments yet</p>
			)}
			{comments.map((comment, i) => (
				<CommentCard
					key={comment._id}
					isLiked={comment.likes.includes(currentUserID)}
					likes={comment.likes.length}
					postID={postID}
					refetch={refetch}
					commentID={comment._id}
					comment={comment.content}
					userID={comment.commenter._id}
					image={comment.image.url}
					profile={comment.commenter.profile.url}
					isLast={i === comments.length - 1}
					date={comment.dateCreated}
					isEdited={comment.edited}
					fullname={`${comment.commenter.firstname} ${comment.commenter.lastname}`}
				/>
			))}
		</div>
	);
}
