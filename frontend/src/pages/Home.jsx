import PostsFeed from '@/components/PostsFeed';
import useNasaPosts from '@/hooks/useNasaPosts';
import useUselessFacts from '@/hooks/useUselessFacts';
import useUserPosts from '@/hooks/useUserPosts';
import { useEffect, useState } from 'react';

export default function Home() {
	const [allPosts, setAllPosts] = useState([]);
	const [extraPosts, setExtraPosts] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const { getNasaPosts } = useNasaPosts();
	const { getUselessFacts } = useUselessFacts();

	const { userPosts, userPostsError, userPostsLoading, userPostsRefetch } =
		useUserPosts();

	useEffect(() => {
		if (userPosts) {
			setAllPosts([...userPosts, ...extraPosts]);
		}
	}, [userPosts, extraPosts]);

	const refetcherHandler = async () => {
		try {
			setIsFetching(true);

			const result = await Promise.all([getNasaPosts(), getUselessFacts()]);
			const posts = result.flat();

			setAllPosts((prevPosts) => [...prevPosts, ...posts]);
			setExtraPosts((prevPosts) => [...prevPosts, ...posts]);
		} catch (err) {
			console.error('Failed to fetch extra posts', err);
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<PostsFeed
			postsRefetcher={refetcherHandler}
			posts={allPosts}
			isLoading={userPostsLoading}
			error={userPostsError}
			refetch={userPostsRefetch}
			isFetching={isFetching}
		/>
	);
}
