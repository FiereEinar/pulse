import _ from 'lodash';

/* eslint-disable react/prop-types */
export default function PostUserHeader({ creatorProfile, fullname, username }) {
	return (
		<div className='flex gap-2 items-center'>
			<img
				className='size-10 rounded-full object-cover object-center'
				src={creatorProfile ? creatorProfile : '/default_user.jpg'}
				alt=''
			/>
			<div className='flex flex-col justify-center'>
				<h4 className='font-semibold text-popover-foreground border text-wrap'>
					{_.startCase(fullname)}
				</h4>
				<p className='text-muted-foreground text-sm text-wrap'>@{username}</p>
			</div>
		</div>
	);
}
