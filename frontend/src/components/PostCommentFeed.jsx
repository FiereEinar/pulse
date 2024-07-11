/* eslint-disable react/prop-types */
export default function PostCommentFeed({ comments }) {
	return (
		<div>
			{comments.length === 0 && (
				<p className='text-muted-foreground italic text-xs'>No comments yet</p>
			)}
		</div>
	);
}
