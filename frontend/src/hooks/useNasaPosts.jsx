import { fetchNasaPosts } from '@/api/nasa';
import { nasaSearchQueries } from '@/constants';
import { getRandomElements, selectRandom } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useNasaPosts() {
	const occuredPosts = useMemo(() => new Set(), []);
	const fetchAmount = 3;
	const [isFetching, setIsFetching] = useState(false);
	const [nasaPosts, setNasaPosts] = useState([]);

	// data from nasa, search queries are hardcoded to somewhat get a variety of content while scrolling
	const { data, error, isLoading } = useQuery({
		queryKey: ['nasaPosts'],
		queryFn: () => fetchNasaPosts(selectRandom(nasaSearchQueries)),
	});

	const formatData = (datas) => {
		const formattedData = datas.map((post) => {
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

		return formattedData;
	};

	const removeDuplicate = useCallback(
		(datas) => {
			const filtered = datas.filter((data) => {
				if (occuredPosts.has(data._id)) return false;

				occuredPosts.add(data._id);
				return true;
			});

			return filtered;
		},
		[occuredPosts]
	);

	// add nasa data to posts when done fetching
	useEffect(() => {
		if (data) {
			const nasaItems = getRandomElements(data.collection.items, fetchAmount);

			// format to iterable object
			const formatted = removeDuplicate(formatData(nasaItems));

			// add items to nasaPosts
			setNasaPosts(formatted);
		}
	}, [data, fetchAmount, removeDuplicate]);

	// function handler to fetch more posts
	const fetchMoreNasaPosts = async () => {
		try {
			setIsFetching(true);
			const result = await fetchNasaPosts(selectRandom(nasaSearchQueries));

			const nasaItems = getRandomElements(result.collection.items, fetchAmount);

			// format to iterable object
			const formatted = removeDuplicate(formatData(nasaItems));

			setNasaPosts(formatted);
		} catch (err) {
			console.error(err);
		} finally {
			setIsFetching(false);
		}
	};

	return {
		nasaPosts,
		nasaError: error,
		nasaLoading: isLoading,
		isFetching,
		fetchMoreNasaPosts,
	};
}
