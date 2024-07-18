import { fetchNasaPosts } from '@/api/nasa';
import { getPosts } from '@/api/post';
import PostsFeed from '@/components/PostsFeed';
import { useToast } from '@/components/ui/use-toast';
import { nasaSearchQueries } from '@/constants';
import { getRandomElements } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
	const fetchAmount = 5;
	const { toast } = useToast();
	const [allPosts, setAllPosts] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	// posts from all users
	const {
		data: posts,
		error,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
	});

	// data from nasa, search queries are hardcoded to somewhat get a variety of content while scrolling
	const {
		data: nasaPosts,
		error: nasaError,
		isLoading: nasaIsLoading,
	} = useQuery({
		queryKey: ['nasaPosts'],
		queryFn: () =>
			fetchNasaPosts(
				nasaSearchQueries[Math.floor(Math.random() * nasaSearchQueries.length)]
			),
	});

	// convert nasa's array of data into array that is iterable by our PostFeed component and concat it to all posts
	const concatNasaPosts = useCallback((nasaItems) => {
		const formattedNasaPosts = nasaItems.map((post) => {
			return {
				_id: post.data[0].nasa_id,
				content: post.data[0].description,
				dateCreated: post.data[0].date_created,
				isDisabled: true,
				shares: [],
				likes: [],
				comments: [],
				image: {
					url: post.links[0].href,
				},
				creator: {
					firstname: 'Nasa',
					username: 'nasa',
					lastname: '',
					profile: {
						url: '/nasa_logo.png',
					},
				},
			};
		});

		setAllPosts((prevPosts) => [...prevPosts, ...formattedNasaPosts]);
	}, []);

	// append all users posts when done fetching
	useEffect(() => {
		if (posts) {
			setAllPosts(posts);
		}
	}, [posts]);

	// concat nasa data to all posts when done fetching
	useEffect(() => {
		if (nasaPosts) {
			const nasaItems = getRandomElements(
				nasaPosts.collection.items,
				fetchAmount
			);
			concatNasaPosts(nasaItems);
		}
	}, [nasaPosts, concatNasaPosts]);

	// function handler to fetch more posts
	const fetchMoreNasaPosts = async () => {
		try {
			setIsFetching(true);
			const result = await fetchNasaPosts(
				nasaSearchQueries[Math.floor(Math.random() * nasaSearchQueries.length)]
			);

			const nasaItems = getRandomElements(result.collection.items, fetchAmount);

			concatNasaPosts(nasaItems);
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to fetch more nasa posts',
			});
		} finally {
			setIsFetching(false);
		}
	};

	if (nasaError) {
		toast({
			variant: 'destructive',
			title: 'Failed to fetch nasa posts',
		});
	}

	return (
		<PostsFeed
			postsRefetcher={fetchMoreNasaPosts}
			posts={allPosts}
			isLoading={isLoading}
			error={error}
			refetch={refetch}
			isFetching={isFetching || nasaIsLoading}
		/>
	);
}
