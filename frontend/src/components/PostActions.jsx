import GetIcon from './icons';

export default function PostActions() {
	const textMutedForeground = '#64748b';

	return (
		<div className='flex gap-3 items-center'>
			<button className='post-action active-heart'>
				<GetIcon iconKey='heart' fill={'red'} stroke={'red'} />
			</button>
			<button>
				<GetIcon iconKey='comment' width='22px' height='22px' />
			</button>
			<button>
				<GetIcon iconKey='share' />
			</button>
		</div>
	);
}
