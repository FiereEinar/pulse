/* eslint-disable react/prop-types */
import _ from 'lodash';
import { Link } from 'react-router-dom';
import CustomImageGallery from './CustomImageGallery';
import { format } from 'date-fns';
import CommentActions from './CommentActions';

export default function CommentCard({
	profile,
	fullname,
	comment,
	userID,
	image,
	date,
	isLast,
	commentID,
	postID,
	refetch,
	likes,
	isLiked,
	isEdited,
}) {
	return (
		<article className='flex gap-2'>
			<div className='flex flex-col items-end flex-shrink-0'>
				{/* user profile */}
				<Link to={`/profile/${userID}`}>
					<img
						className='!size-8 rounded-full shadow-md object-cover object-center mt-1 flex-shrink-0'
						src={profile || '/default_user.jpg'}
						alt=''
					/>
				</Link>

				{/* this is just a line */}
				{!isLast ? (
					<div className='border-l border-muted-foreground w-[50%] h-full' />
				) : (
					<div
						className={`border-l border-b border-muted-foreground rounded-bl-3xl w-[50%] ${
							image ? 'h-[50%]' : 'h-[28%]'
						}`}
					/>
				)}
			</div>

			<div className='flex-grow'>
				<div className='flex justify-between items-center'>
					<div>
						{/* user full name */}
						<div className='flex gap-3 items-center'>
							<Link to={`/profile/${userID}`}>
								<h4 className='text-popover-foreground font-medium text-wrap'>
									{_.startCase(fullname)}
								</h4>
							</Link>
							{isEdited && (
								<p className='text-xs italic text-muted-foreground'>- Edited</p>
							)}
						</div>

						{/* date */}
						<p className='text-muted-foreground text-xs italic'>
							{format(date, 'MMMM dd, yyyy')}
						</p>
					</div>

					<CommentActions
						comment={comment}
						commentID={commentID}
						isLiked={isLiked}
						likes={likes}
						postID={postID}
						refetch={refetch}
						userID={userID}
					/>
				</div>

				{/* comment and image */}
				<p className='text-muted-foreground my-1 text-wrap'>{comment}</p>
				{image && (
					<CustomImageGallery image={image} containerClass='h-[10rem]' />
				)}

				{/* spacing */}
				<div className='h-3' />
			</div>
		</article>
	);
}
