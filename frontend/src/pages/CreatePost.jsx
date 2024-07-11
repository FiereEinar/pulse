import { fetchUserByID } from '@/api/user';
import CreatePostForm from '@/components/forms/CreatePostForm';
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
		return <p className='text-muted-foreground'>Loading...</p>;
	}

	return <CreatePostForm currentUser={userData} />;
}
