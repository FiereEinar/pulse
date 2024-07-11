import GetIcon from './icons';

export default function PostActions() {
	return (
		<div className='flex gap-3 items-center'>
			<GetIcon iconKey='heart' fill={'none'} stroke={'red'} />
			<GetIcon iconKey='comment' width='22px' height='22px' />
			<GetIcon iconKey='share' />
		</div>
	);
}
