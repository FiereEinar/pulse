import { getPosts } from '@/api/post';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useUserPosts() {
	const [userPosts, setUserPosts] = useState([]);

	// posts from all users
	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
	});

	useEffect(() => {
		if (data) {
			setUserPosts(data);
		}
	}, [data]);

	return {
		userPosts,
		userPostsLoading: isLoading,
		userPostsError: error,
		userPostsRefetch: refetch,
	};
}
