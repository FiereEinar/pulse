import { AdviceSlipLoading } from './LoadingCards';
import PostUserHeader from './PostUserHeader';
import { PostCardContainer } from './ui/container';
import { fetchAdvice } from '@/api/adviceslip';
import { useQuery } from '@tanstack/react-query';
import { FormError } from './ui/error';

export default function AdviceSlip() {
	const {
		data: advice,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['advice_slip'],
		queryFn: fetchAdvice,
	});

	return (
		<PostCardContainer>
			<article className='p-3 flex flex-col gap-2'>
				{isLoading && <AdviceSlipLoading />}
				{error && <FormError message='Failed to fetch some advice :((' />}
				{advice && (
					<>
						<div className='pointer-events-none'>
							<PostUserHeader
								postID={advice.slip.id}
								creatorProfile={''}
								fullname={'AdviceSlip'}
								username={'randomadviceslip'}
							/>
						</div>

						<div className='text-muted-foreground text-wrap  text-sm'>
							<p>{advice.slip.advice}</p>
						</div>
					</>
				)}
			</article>
		</PostCardContainer>
	);
}
