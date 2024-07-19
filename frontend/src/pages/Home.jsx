import PostsFeed from '@/components/PostsFeed';
import useNasaPosts from '@/hooks/useNasaPosts';
import useUselessFacts from '@/hooks/useUselessFacts';
import useUserPosts from '@/hooks/useUserPosts';
import { useEffect, useState } from 'react';

export default function Home() {
	const { nasaPosts, fetchMoreNasaPosts, isFetching, nasaError, nasaLoading } =
		useNasaPosts();

	const { userPosts, userPostsError, userPostsLoading, userPostsRefetch } =
		useUserPosts();

	const {
		uselessFacts,
		fetchMoreUselessFacts,
		isFetching: uselessFactsFetching,
	} = useUselessFacts();
	const [allPosts, setAllPosts] = useState([]);

	// append all users posts when done fetching
	useEffect(() => {
		if (userPosts) {
			setAllPosts((prevPosts) => [...userPosts, ...prevPosts]);
		}
	}, [userPosts]);

	// append all NASA posts when done fetching
	useEffect(() => {
		if (nasaPosts) {
			setAllPosts((prevPosts) => [...prevPosts, ...nasaPosts]);
		}
	}, [nasaPosts]);

	// append all uselessfacts posts when done fetching
	useEffect(() => {
		if (uselessFacts) {
			setAllPosts((prevPosts) => [...prevPosts, ...uselessFacts]);
		}
	}, [uselessFacts]);

	if (nasaError) {
		console.error(nasaError);
	}

	return (
		<PostsFeed
			postsRefetcher={() => {
				fetchMoreNasaPosts();
				fetchMoreUselessFacts();
			}}
			posts={allPosts}
			isLoading={userPostsLoading}
			error={userPostsError}
			refetch={userPostsRefetch}
			isFetching={isFetching || nasaLoading || uselessFactsFetching}
		/>
	);
}
