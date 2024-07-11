import _ from 'lodash';
import PostActions from './PostActions';

/* eslint-disable react/prop-types */
export default function PostCard({
	creatorProfile,
	fullname,
	username,
	content,
	postImage,
	date,
}) {
	return (
		<article className='transition-all bg-card p-3 rounded-md flex flex-col gap-2 shadow-lg border'>
			{/* post header */}
			<div className='flex gap-2 items-center'>
				<img
					className='size-10 rounded-full object-cover object-center'
					src={creatorProfile ? creatorProfile : '/default_user.jpg'}
					alt=''
				/>
				<div className='flex flex-col justify-center'>
					<h4 className='font-semibold text-popover-foreground'>
						{_.startCase(fullname)}
					</h4>
					<p className='text-muted-foreground text-sm'>@{username}</p>
				</div>
			</div>

			{/* post content */}
			<div>
				<p className='text-muted-foreground'>{content}</p>
			</div>

			{/* post image */}
			{postImage && (
				<div>
					<img
						className='rounded-md object-cover object-center'
						src={postImage}
						alt='image'
					/>
				</div>
			)}

			<p className='text-xs text-muted-foreground italic'>{date}</p>

			{/* post actions */}
			<PostActions />
		</article>
	);
}
