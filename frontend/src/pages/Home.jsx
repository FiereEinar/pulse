import PostsFeed from '@/components/PostsFeed';
import useNasaPosts from '@/hooks/useNasaPosts';
import useUselessFacts from '@/hooks/useUselessFacts';
import useUserPosts from '@/hooks/useUserPosts';
import { useEffect, useState } from 'react';

// extraPosts are posts from external source (nasa, uselessfacts)

export default function Home() {
	// the extraPosts and userPosts are separated so that the userPosts can be refetched without affecting the extra posts
	const [allPosts, setAllPosts] = useState([]);
	const [extraPosts, setExtraPosts] = useState(
		() => JSON.parse(localStorage.getItem('extra_posts')) || []
	);
	const { userPosts, userPostsError, userPostsLoading, userPostsRefetch } =
		useUserPosts();

	const [isFetching, setIsFetching] = useState(false);
	const { getNasaPosts } = useNasaPosts();
	const { getUselessFacts } = useUselessFacts();

	useEffect(() => {
		if (userPosts) {
			setAllPosts([...userPosts, ...extraPosts]);
		}
	}, [userPosts, extraPosts]);

	// save the extra posts in the localstorage so that we don't have to refetch it
	useEffect(() => {
		if (extraPosts) {
			localStorage.setItem('extra_posts', JSON.stringify(extraPosts));
		}
	}, [extraPosts]);

	const refetcherHandler = async () => {
		try {
			setIsFetching(true);

			const result = await Promise.all([getNasaPosts(), getUselessFacts()]);
			const posts = result.flat();

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
