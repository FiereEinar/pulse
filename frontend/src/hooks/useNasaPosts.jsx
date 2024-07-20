import { fetchNasaPosts } from '@/api/nasa';
import { nasaSearchQueries } from '@/constants';
import { getRandomElements, selectRandom } from '@/lib/utils';

export default function useNasaPosts() {
	const occuredPosts = new Set();
	const fetchAmount = 2;

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

	const removeDuplicate = (datas) => {
		const filtered = datas.filter((data) => {
			if (occuredPosts.has(data._id)) return false;

			occuredPosts.add(data._id);
			return true;
		});

		return filtered;
	};

	// function handler to fetch more posts
	const getNasaPosts = async () => {
		try {
			const result = await fetchNasaPosts(selectRandom(nasaSearchQueries));

			const nasaItems = getRandomElements(result.collection.items, fetchAmount);

			// format to iterable object
			const formatted = removeDuplicate(formatData(nasaItems));

			return formatted;
		} catch (err) {
			console.error(err);
		}
	};

	return {
		getNasaPosts,
	};
}
