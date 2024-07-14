import { fetchUserByID } from '@/api/user';
import EditProfileForm from '@/components/forms/EditProfileForm';
import { useQuery } from '@tanstack/react-query';

export default function EditProfile() {
	const currentUserID = localStorage.getItem('UserID');

	const {
		data: userData,
		error,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: [`user_${currentUserID}`],
		queryFn: () => fetchUserByID(currentUserID),
	});

	if (isLoading) {
		return (
			<div className='transition-all bg-card w-full rounded-md h-full text-muted-foreground p-3'>
				Loading...
			</div>
		);
	}

	if (error) {
		return (
			<div className='transition-all p-3 bg-card w-full rounded-md h-full text-destructive'>
				Failed to fetch user
			</div>
		);
	}

	return (
		<section className='transition-all bg-card w-full p-3 rounded-md flex flex-col'>
			<h1 className='transition-all text-popover-foreground text-xl font-semibold w-fit'>
				Edit Profile
			</h1>
			<EditProfileForm
				user={userData}
				userID={currentUserID}
				refetch={refetch}
			/>
		</section>
	);
}
