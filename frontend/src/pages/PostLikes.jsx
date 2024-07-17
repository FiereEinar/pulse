import { fetchPostByID } from '@/api/post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsersFeed from '@/components/UsersFeed';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function PostLikes() {
	const { postID } = useParams();

	const {
		data: postData,
		error,
		isLoading,
		// refetch,
	} = useQuery({
		queryKey: [`post_${postID}`],
		queryFn: () => fetchPostByID(postID),
	});

	return (
		<section className='bg-card rounded-md w-full p-3'>
			<Tabs defaultValue='likes' className='w-full'>
				<TabsList className='w-full flex'>
					<TabsTrigger className='flex-1' value='likes'>
						{postData.likes.length} Likes
					</TabsTrigger>
					<TabsTrigger className='flex-1' value='shares'>
						{postData.shares.length} Shares
					</TabsTrigger>
				</TabsList>
				<TabsContent value='likes'>
					<UsersFeed
						users={postData?.likes}
						error={error}
						isLoading={isLoading}
					/>
				</TabsContent>
				<TabsContent value='shares'>
					<UsersFeed
						users={postData?.shares}
						error={error}
						isLoading={isLoading}
					/>
				</TabsContent>
			</Tabs>
		</section>
	);
}
