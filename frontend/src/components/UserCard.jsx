import { useNavigate } from 'react-router-dom';
import PostUserHeader from './PostUserHeader';

export default function UserCard({ profile, fullname, username, userID }) {
	const navigate = useNavigate();

	return (
		<button
			onClick={() => navigate(`/profile/${userID}`)}
			className='transition-all w-full flex gap-2 rounded-md p-3 hover:bg-secondary items-center justify-between'
		>
			<PostUserHeader
				fullname={fullname}
				username={username}
				creatorProfile={profile}
				userID={userID}
			/>
		</button>
	);
}
