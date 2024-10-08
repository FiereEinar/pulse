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
import EditProfile from './pages/EditProfile';
import PostLikes from './pages/PostLikes';
import SearchUsers from './pages/SearchUsers';
import Activity from './pages/Activity';
import UserFriends from './pages/UserFriends';

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
					path: '/activity',
					element: <Activity />,
				},
				{
					path: '/profile/:userID',
					element: <Profile />,
				},
				{
					path: '/user/:userID/friends',
					element: <UserFriends />,
				},
				{
					path: '/post/:postID',
					element: <Post />,
				},
				{
					path: '/post/:postID/likes',
					element: <PostLikes />,
				},
				{
					path: '/user/edit',
					element: <EditProfile />,
				},
				{
					path: '/search/users',
					element: <SearchUsers />,
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
