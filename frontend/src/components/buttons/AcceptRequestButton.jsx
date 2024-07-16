import { useState } from 'react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { acceptFriendRequest } from '@/api/user';

export default function AcceptRequestButton({ userID, refetch }) {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const onClick = async () => {
		try {
			setIsLoading(true);

			const result = await acceptFriendRequest(userID);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to accept request',
					description: 'An error occured while trying to accept request',
				});
				return;
			}

			refetch();
			toast({
				title: 'Friend request accepted',
			});
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to accept request',
				description: 'An error occured while trying to accept request',
			});
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button onClick={onClick} disabled={isLoading} size='sm'>
			<span>Accept</span>
			<span className='ml-1 hidden sm:flex'>Request</span>
		</Button>
	);
}
