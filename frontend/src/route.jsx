import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './pages/Logout';
import Home from './pages/Home';

export default function Route() {
	const route = createBrowserRouter([
		{
			path: '/',
			element: (
				<ProtectedRoute>
					<App />
				</ProtectedRoute>
			),
			children: [
				{
					index: true,
					element: <Home />,
				},
			],
		},
		{
			path: '/signup',
			element: <Signup />,
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/logout',
			element: <Logout />,
		},
	]);

	return <RouterProvider router={route} />;
}
