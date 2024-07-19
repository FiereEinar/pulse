import { fetchUselessFact } from '@/api/uselesspacts';
import { useToast } from '@/components/ui/use-toast';
import { randInt, randomDate } from '@/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useUselessFacts() {
	const { toast } = useToast();
	const occuredPosts = useMemo(() => new Set(), []);
	const [uselessFacts, setUselessFacts] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

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

	useEffect(() => {
		const fetch = async () => {
			const posts = await fetchPostsHandler();

			setUselessFacts(posts);
		};

		fetch();
	}, [fetchPostsHandler]);

	// function handler to fetch more posts
	const fetchMoreUselessFacts = async () => {
		try {
			setIsFetching(true);

			const posts = await fetchPostsHandler();

			setUselessFacts(posts);
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to fetch more useless facts posts',
			});
		} finally {
			setIsFetching(false);
		}
	};

	return { uselessFacts, isFetching, fetchMoreUselessFacts };
}
