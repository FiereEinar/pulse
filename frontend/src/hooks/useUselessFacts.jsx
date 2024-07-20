import { fetchUselessFact } from '@/api/uselesspacts';
import { randInt, randomDate } from '@/lib/utils';
import { useCallback, useMemo } from 'react';

export default function useUselessFacts() {
	const occuredPosts = useMemo(() => new Set(), []);

	const formatData = (datas) => {
		const formattedData = datas.map((post) => {
			return {
				_id: post.id,
				content: post.text,
				dateCreated: randomDate(),
				isDisabled: true,
				shares: [],
				likes: [],
				comments: [],
				image: {
					url: '',
				},
				creator: {
					firstname: 'Useless Facts',
					username: 'uselessfacts',
					lastname: '',
					profile: {
						url: '',
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

	const fetchPostsHandler = useCallback(async () => {
		const fetchAmount = Array(randInt(5)).fill(0);
		// eslint-disable-next-line no-unused-vars
		const promises = fetchAmount.map(async (_) => {
			return await fetchUselessFact();
		});

		const results = await Promise.all(promises);

		const formatted = removeDuplicate(formatData(results));

		return formatted;
	}, [removeDuplicate]);

	// function handler to fetch more posts
	const getUselessFacts = async () => {
		try {
			const posts = await fetchPostsHandler();

			return posts;
		} catch (err) {
			console.error('Error fetching useless facts', err);
		}
	};

	return { getUselessFacts };
}
