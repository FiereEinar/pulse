import { useState } from 'react';
import { InputField } from '../InputField';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userUpdateSchema } from '@/lib/validations/userSchema';
import { FormError } from '../ui/error';
import { useToast } from '../ui/use-toast';
import { updateUser } from '@/api/user';
import { useNavigate } from 'react-router-dom';

export default function EditProfileForm({ user, refetch }) {
	const { toast } = useToast();
	const navigate = useNavigate();
	const [profile, setProfile] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(userUpdateSchema),
		defaultValues: {
			firstname: user.firstname,
			lastname: user.lastname,
			username: user.username,
			bio: user.bio,
		},
	});

	const onUpdateSubmit = async (data) => {
		try {
			const formData = new FormData();

			formData.append('firstname', data.firstname);
			formData.append('lastname', data.lastname);
			formData.append('username', data.username);
			formData.append('bio', data.bio);
			if (profile) formData.append('image', profile);

			const result = await updateUser(user._id, formData);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to update your profile',
					description: 'An error occured while trying to update your profile',
				});
				return;
			}

			refetch();
			toast({
				title: 'Your profile has been updated successfully!',
			});
			navigate(`/profile/${user._id}`, { replace: true });
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to update your profile',
				description: 'An error occured while trying to update your profile',
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onUpdateSubmit)}
			className='w-full flex flex-col gap-2'
		>
			{/* profile picture */}
			<div className=' w-full flex justify-center border-b-2 py-5'>
				<div className='relative'>
					<img
						className='rounded-full size-[8rem] object-cover object-center shadow-md'
						src={
							profile
								? URL.createObjectURL(profile)
								: user.profile.url || '/default_user.jpg'
						}
						alt='profile'
					/>

					<label
						className='bg-[#55595a] cursor-pointer absolute bottom-0 right-0 p-2 rounded-full'
						htmlFor='profileImage'
					>
						<img className='size-5' src='/icons/camera.svg' alt='' />
					</label>

					<input
						disabled={isSubmitting}
						onChange={(e) => setProfile(e.target.files[0])}
						type='file'
						accept='image/*'
						hidden
						id='profileImage'
					/>
				</div>
			</div>

			{/* other fields */}
			<InputField
				error={errors.firstname}
				register={{ ...register('firstname') }}
				id='firstname'
				label='First name:'
				type='text'
			/>
			<InputField
				error={errors.lastname}
				register={{ ...register('lastname') }}
				id='lastname'
				label='Last name:'
				type='text'
			/>
			<InputField
				error={errors.username}
				register={{ ...register('username') }}
				id='username'
				label='Username:'
				type='text'
			/>
			<div className='flex flex-col w-full text-muted-foreground'>
				<label htmlFor='bio'>Bio:</label>
				<textarea
					{...register('bio')}
					className='transition-all border rounded-sm bg-card p-1 px-2'
					name='bio'
					rows={3}
					id='bio'
				/>
				{errors.bio && <FormError message={errors.bio.message} />}
			</div>

			<div className='w-full flex justify-end'>
				<Button disabled={isSubmitting} size='sm'>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
