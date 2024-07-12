/* eslint-disable react/prop-types */

import _ from 'lodash';
import { Link } from 'react-router-dom';
import GetIcon from './icons';
import CustomImageGallery from './CustomImageGallery';
import { format } from 'date-fns';

export default function CommentCard({
	profile,
	fullname,
	comment,
	userID,
	image,
	date,
	isLast,
}) {
	const textMutedForeground = '#64748b';

	return (
		<article className='flex gap-2'>
			<div className='flex flex-col items-end flex-shrink-0'>
				<Link to={`/profile/${userID}`}>
					<img
						className='!size-8 rounded-full object-cover object-center mt-1 flex-shrink-0'
						src={profile || '/default_user.jpg'}
						alt=''
					/>
				</Link>

				{!isLast ? (
					<div className='border-l-2 w-[50%] h-full' />
				) : (
					<div
						className={`border-l-2 border-b-2 rounded-bl-3xl w-[50%] ${
							image ? 'h-[50%]' : 'h-[28%]'
						}`}
					/>
				)}
			</div>

			<div className='flex-grow'>
				<div className='flex gap-3'>
					<Link to={`/profile/${userID}`}>
						<h4 className='text-popover-foreground font-medium text-wrap'>
							{_.startCase(fullname)}
						</h4>
					</Link>
				</div>
				<p className='text-muted-foreground text-xs italic'>
					{format(date, 'MMMM dd, yyyy')}
				</p>
				<p className='text-muted-foreground my-1 text-wrap'>{comment}</p>
				{image && (
					<CustomImageGallery image={image} containerClass='h-[10rem]' />
				)}

				<div className='h-3' />
			</div>

			<div>
				<button className='flex gap-1 mt-3 post-action active-heart disabled:opacity-70'>
					<GetIcon iconKey='heart' stroke={textMutedForeground} />
				</button>
			</div>
		</article>
	);
}
