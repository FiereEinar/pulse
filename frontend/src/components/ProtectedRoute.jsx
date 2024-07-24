import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { helix } from 'ldrs';
import axiosInstance from '@/api/axios';

helix.register();

export default function ProtectedRoute({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await axiosInstance.get('/auth/check_auth');

				const userID = localStorage.getItem('UserID');
				if (!userID) return navigate('/login');

				setIsAuthenticated(true);
			} catch (error) {
				setIsAuthenticated(false);
				navigate('/login');
			}
		};

		checkAuth();
	}, [navigate]);

	if (!isAuthenticated) {
		return (
			<main className='w-full h-dvh bg-background flex flex-col items-center justify-center text-muted-foreground gap-3'>
				<l-helix size='80' speed='2.5' color='white'></l-helix>
				<h1 className='text-2xl font-bold'>Authenticating...</h1>
			</main>
		);
	}

	return children;
}
