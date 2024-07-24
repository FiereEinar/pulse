import axiosInstance from '@/api/axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { helix } from 'ldrs';
helix.register();

export default function Logout() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				await axiosInstance.get('/auth/logout');
			} catch (err) {
				console.error('Failed to logout');
			} finally {
				setIsLoading(false);
			}
		})();

		localStorage.removeItem('UserID');
		document.querySelector('body').classList.add('dark');
	}, []);

	if (isLoading) {
		return (
			<main className='w-full h-dvh bg-background flex flex-col items-center justify-center text-muted-foreground gap-3'>
				<l-helix size='80' speed='2.5' color='white'></l-helix>
				<h1 className='text-2xl font-bold'>Logging out...</h1>
			</main>
		);
	}

	return <Navigate to='/login' />;
}
