import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function Logout() {
	useEffect(() => {
		localStorage.removeItem('Token');
		localStorage.removeItem('UserID');
		document.querySelector('body').classList.add('dark');
	}, []);

	return <Navigate to='/login' />;
}
