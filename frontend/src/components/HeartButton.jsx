import HeartIcon from './icons/heart';

export default function HeartButton({ isLoading, onClick, isLiked, likes }) {
	const textMutedForeground = '#64748b';

	return (
		<button
			disabled={isLoading}
			onClick={onClick}
			className={`flex gap-1 post-action active-heart disabled:opacity-70 ${
				!isLiked && 'postActionContainer'
			}`}
		>
			<HeartIcon
				fill={isLiked ? 'red' : 'none'}
				stroke={isLiked ? 'red' : textMutedForeground}
			/>
			<p className='text-muted-foreground'>{likes}</p>
		</button>
	);
}
