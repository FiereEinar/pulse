import { fetchUserByID } from '@/api/user';
import CreatePostForm from '@/components/forms/CreatePostForm';
import { CreatePostLoading } from '@/components/LoadingCards';
import { FormError } from '@/components/ui/error';
import { useQuery } from '@tanstack/react-query';

export default function CreatePost() {
	const currentUserID = localStorage.getItem('UserID');

	const {
		data: userData,
		error,
		isLoading,
	} = useQuery({
		queryKey: [`user_${currentUserID}`],
		queryFn: () => fetchUserByID(currentUserID),
	});

	if (error) {
		return <FormError message='Error fetching user' />;
	}

	if (isLoading) {
		return <CreatePostLoading />;
	}

	return <CreatePostForm currentUser={userData} />;
}
