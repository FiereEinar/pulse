import { Button } from '../ui/button';

export default function CreateCommentForm({}) {
	return (
		<form className='flex px-3'>
			<input
				// disabled={isSubmitting}
				// {...register('content')}
				autoFocus
				className='w-full bg-card p-1 text-muted-foreground px-3 focus:outline-none border rounded-md'
				placeholder='Write a comment'
				name='content'
				id='content'
			/>
			<Button className=''>Comment</Button>
		</form>
	);
}
