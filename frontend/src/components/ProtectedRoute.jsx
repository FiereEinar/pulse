import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('Token');
		if (!token) return navigate('/login');

		const userID = localStorage.getItem('UserID');
		if (!userID) return navigate('/login');
	}, [navigate]);

	return children;
}
