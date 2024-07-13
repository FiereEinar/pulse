import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './pages/Logout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Profile from './pages/Profile';

export default function Route() {
	const route = createBrowserRouter([
		{
			path: '/',
			errorElement: <NotFound />,
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
				{
					path: '/create',
					element: <CreatePost />,
				},
				{
					path: '/profile/:userID',
					element: <Profile />,
				},
				{
					path: '/post/:postID',
					element: <Post />,
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
