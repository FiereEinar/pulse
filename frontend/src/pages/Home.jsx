import { getPosts } from '@/api/post';
import PostsFeed from '@/components/PostsFeed';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
	const {
		data: posts,
		error,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
	});

	return (
		<PostsFeed
			posts={posts}
			isLoading={isLoading}
			error={error}
			refetch={refetch}
		/>
	);
}
