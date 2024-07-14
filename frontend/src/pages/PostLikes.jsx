import { fetchPostByID } from '@/api/post';
import UsersFeed from '@/components/UsersFeed';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function PostLikes() {
	const { postID } = useParams();

	const {
		data: postData,
		error,
		isLoading,
		// refetch,
	} = useQuery({
		queryKey: [`post_${postID}`],
		queryFn: () => fetchPostByID(postID),
	});

	return (
		<section className='bg-card rounded-md overflow-hidden w-full h-full'>
			<UsersFeed users={postData?.likes} error={error} isLoading={isLoading} />
		</section>
	);
}
