import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { FormError } from '../ui/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/authSchema';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { postLogin } from '@/api/auth';
import EnterAsGuestButton from '../buttons/EnterAsGuestButton';
import { useState } from 'react';

export default function LoginForm() {
	const { toast } = useToast();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(loginSchema) });

	const onLoginSubmit = async (data) => {
		try {
			const result = await postLogin(data);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to log in',
					description: result.error,
				});
				setError('root', { message: result.error });
				return;
			}

			const { userID } = result.data;

			localStorage.setItem('UserID', userID);

			toast({
				title: 'Logged in successfully!',
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
		<form
			onSubmit={handleSubmit(onLoginSubmit)}
			className='flex flex-col gap-3'
		>
			{/* input fields */}
			<InputField
				register={{ ...register('username') }}
				error={errors.username}
				label='Username:'
				id='username'
				type='text'
			/>
			<InputField
				register={{ ...register('password') }}
				error={errors.password}
				label='Password:'
				id='password'
				type='password'
			/>

			{errors.root && <FormError message={errors.root.message} />}

			<p className='text-xs italic text-muted-foreground'>
				Don&apos;t have an account?{' '}
				<Link to='/signup' className='underline'>
					Sign up
				</Link>
			</p>

			{/* submit button */}
			<div className='flex justify-end'>
				<EnterAsGuestButton isLoading={isLoading} setIsLoading={setIsLoading} />
				<Button disabled={isSubmitting || isLoading}>Submit</Button>
			</div>
		</form>
	);
}
