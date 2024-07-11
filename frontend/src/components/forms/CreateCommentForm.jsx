import { Button } from '../ui/button';

export default function CreateCommentForm({}) {
	return (
		<form className='flex border-y'>
			<input
				// disabled={isSubmitting}
				// {...register('content')}
				autoFocus
				className='w-full bg-card p-1 text-muted-foreground px-3 focus:outline-none'
				placeholder='Write a comment'
				name='content'
				id='content'
			/>
			<Button>Comment</Button>
		</form>
	);
}
