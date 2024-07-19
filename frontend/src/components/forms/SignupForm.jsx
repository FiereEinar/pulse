import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/lib/validations/authSchema';
import { FormError } from '../ui/error';
import { useToast } from '../ui/use-toast';
import { postSignin } from '@/api/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupForm() {
	const { toast } = useToast();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(signupSchema) });

	const onSigninSubmit = async (data) => {
		try {
			const result = await postSignin(data);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to sign in',
					description: result.error,
				});
				setError('root', { message: result.error });
				return;
			}

			toast({
				title: 'Signed up successfully!',
				description: 'Proceed to log in with your account to continue',
			});
			navigate('/login');
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to sign in',
				description: 'An error has occured while trying to sign you up',
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSigninSubmit)}
			className='flex flex-col gap-3'
		>
			{/* input fields */}
			<div className='flex flex-wrap gap-3'>
				<InputField
					register={{ ...register('firstname') }}
					error={errors.firstname}
					label='First name:'
					id='firstname'
					type='text'
				/>
				<InputField
					register={{ ...register('lastname') }}
					error={errors.lastname}
					label='Last name:'
					id='lastname'
					type='text'
				/>
			</div>
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
			<InputField
				register={{ ...register('confirmPassword') }}
				error={errors.confirmPassword}
				label='Confirm Password:'
				id='confirmPassword'
				type='password'
			/>

			{errors.root && <FormError message={errors.root.message} />}

			<p className='text-xs italic text-muted-foreground'>
				Already have an account?{' '}
				<Link to='/login' className='underline'>
					Log in
				</Link>
			</p>

			{/* submit button */}
			<div className='flex justify-end'>
				<Button type='button' variant='link'>
					Enter as Guest
				</Button>
				<Button disabled={isSubmitting}>Submit</Button>
			</div>
		</form>
	);
}
