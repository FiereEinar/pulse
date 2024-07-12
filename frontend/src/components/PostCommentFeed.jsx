import CommentCard from './CommentCard';

/* eslint-disable react/prop-types */
export default function PostCommentFeed({ comments }) {
	return (
		<div>
			{comments.length === 0 && (
				<p className='text-muted-foreground italic text-xs'>No comments yet</p>
			)}
			{comments.map((comment, i) => (
				<CommentCard
					key={comment._id}
					comment={comment.content}
					userID={comment.commenter._id}
					image={comment.image.url}
					profile={comment.commenter.profile.url}
					isLast={i === comments.length - 1}
					date={comment.dateCreated}
					fullname={`${comment.commenter.firstname} ${comment.commenter.lastname}`}
				/>
			))}
		</div>
	);
}
