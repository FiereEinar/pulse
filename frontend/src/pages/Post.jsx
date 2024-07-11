import { fetchPostByID } from '@/api/post';
import CreateCommentForm from '@/components/forms/CreateCommentForm';
import PostCard from '@/components/PostCard';
import PostCommentFeed from '@/components/PostCommentFeed';
import { PostCardContainer } from '@/components/ui/container';
import { FormError } from '@/components/ui/error';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

export default function Post() {
	const currentUserID = localStorage.getItem('UserID');
	const { postID } = useParams();

	const {
		data: postData,
		error,
		isLoading,
	} = useQuery({
		queryKey: [`post_${postID}`],
		queryFn: () => fetchPostByID(postID),
	});

	console.log(postData);

	return (
		<PostCardContainer>
			{isLoading && <p className='text-muted-foreground'>Loading...</p>}
			{error && <FormError message='Error fetching post' />}
			{postData && (
				<>
					<PostCard
						likes={postData.likes.length}
						comments={postData.comments.length}
						shares={postData.shares.length}
						postID={postData._id}
						isLiked={postData.likes.some((user) => user._id === currentUserID)}
						key={postData._id}
						content={postData.content}
						creatorProfile={postData.creator.profile.url}
						fullname={`${postData.creator.firstname} ${postData.creator.lastname}`}
						postImage={postData.image.url}
						username={postData.creator.username}
						date={format(postData.dateCreated, 'MMMM dd, yyyy')}
					/>

					<CreateCommentForm />

					<h1 className='p-3 italic text-popover-foreground text-lg'>
						Comments
					</h1>

					<div className='px-3 pb-3'>
						<PostCommentFeed comments={postData.comments} />
					</div>
				</>
			)}
		</PostCardContainer>
	);
}
