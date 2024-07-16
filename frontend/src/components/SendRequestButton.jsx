import { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { sendFriendRequest } from '@/api/user';

export default function SendRequestButton({ userID, refetch }) {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const onClick = async () => {
		try {
			setIsLoading(true);

			const result = await sendFriendRequest(userID);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to send your request',
					description: 'An error occured while trying to send your request',
				});
				return;
			}

			refetch();
			toast({
				title: 'Request sent',
			});
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to send your request',
				description: 'An error occured while trying to send your request',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button onClick={onClick} disabled={isLoading} size='sm'>
			Send Request
		</Button>
	);
}
