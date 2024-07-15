export default function ImagePreview({
	image,
	onCancel,
	isSubmitting,
	imageClass,
}) {
	return (
		<div className='relative pt-1'>
			<img
				className={`object-cover object-center rounded-md w-full ${imageClass}`}
				src={image}
				alt='image preview'
			/>
			<button
				disabled={isSubmitting}
				type='button'
				onClick={onCancel}
				className='absolute size-5 p-1 bg-card rounded-full top-2 right-2 disabled:opacity-70'
			>
				<img src='/icons/close.svg' alt='' />
			</button>
		</div>
	);
}
