import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { postLogin } from '@/api/auth';

export default function EnterAsGuestButton({ isLoading, setIsLoading }) {
	const { toast } = useToast();
	const navigate = useNavigate();

	const onGuestLogin = async () => {
		try {
			setIsLoading(true);

			const result = await postLogin({
				username: import.meta.env.VITE_GUEST_USERNAME,
				password: import.meta.env.VITE_GUEST_PASSWORD,
			});

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to log in',
					description: result.error,
				});
				return;
			}

			const { userID } = result.data;

			localStorage.setItem('UserID', userID);

			toast({
				title: 'Logged in as guest',
			});
			navigate('/');
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to log in',
				description: 'An error has occured while trying to log you in',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			disabled={isLoading}
			onClick={onGuestLogin}
			type='button'
			variant='link'
		>
			Enter as Guest
		</Button>
	);
}
