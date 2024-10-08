import { fetchPostByID, getPosts } from '@/api/post';
import CreateCommentForm from '@/components/forms/CreateCommentForm';
import { PostCardLoading } from '@/components/LoadingCards';
import PostCard from '@/components/PostCard';
import PostCommentFeed from '@/components/PostCommentFeed';
import { PostCardContainer } from '@/components/ui/container';
import { FormError } from '@/components/ui/error';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';

export default function Post() {
	const currentUserID = localStorage.getItem('UserID');
	const { postID } = useParams();

	const {
		data: postData,
		error,
		isLoading,
		refetch: refetchPost,
	} = useQuery({
		queryKey: [`post_${postID}`],
		queryFn: () => fetchPostByID(postID),
	});

	const { refetch: refetchAllPosts } = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
		retry: false,
	});

	// refetch both the single post and all posts so that when the user goes back to homepage, the posts are up to date
	const refetch = () => {
		refetchPost();
		refetchAllPosts();
	};

	return (
		<PostCardContainer>
			{isLoading && <PostCardLoading />}
			{error && <FormError message='Error fetching post' />}
			{postData && (
				<>
					<PostCard
						isEdited={postData.edited}
						likes={postData.likes.length}
						comments={postData.comments.length}
						shares={postData.shares.length}
						postID={postData._id}
						isLiked={postData.likes.some((user) => user._id === currentUserID)}
						isSingular={true}
						key={postData._id}
						content={postData.content}
						creatorProfile={postData.creator.profile.url}
						fullname={`${postData.creator.firstname} ${postData.creator.lastname}`}
						postImage={postData.image.url}
						userID={postData.creator._id}
						username={postData.creator.username}
						refetch={refetch}
						date={format(postData.dateCreated, 'MMMM dd, yyyy')}
					/>

					<Link
						to={`/post/${postID}/likes`}
						className='text-muted-foreground text-sm ml-3 italic  hover:underline'
					>
						View all likes and shares
					</Link>

					<CreateCommentForm postID={postID} refetch={refetch} />

					<h1 className='transition-all p-3 italic text-popover-foreground text-lg'>
						Comments
					</h1>

					<div className='px-3 pb-3'>
						<PostCommentFeed
							postID={postData._id}
							comments={postData.comments}
							refetch={refetch}
						/>
					</div>
				</>
			)}
		</PostCardContainer>
	);
}
