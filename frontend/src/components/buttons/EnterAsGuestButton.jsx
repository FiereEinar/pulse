import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { postLogin } from '@/api/auth';

export default function EnterAsGuestButton() {
	const { toast } = useToast();
	const navigate = useNavigate();

	const onGuestLogin = async () => {
		try {
			const result = await postLogin({
				username: '',
				password: '',
			});

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to log in',
					description: result.error,
				});
				return;
			}

			const { token, userID } = result.data;

			localStorage.setItem('Token', `Bearer ${token}`);
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
		}
	};

	return (
		<Button onClick={onGuestLogin} type='button' variant='link'>
			Enter as Guest
		</Button>
	);
}
