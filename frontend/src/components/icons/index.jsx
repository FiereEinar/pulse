import CommentIcon from './comment';
import HeartIcon from './heart';
import HomeIcon from './home';
import LogoutIcon from './logout';
import PlusSquareIcon from './plus';
import ProfileIcon from './profile';
import SearchIcon from './search';
import ShareIcon from './share';

// eslint-disable-next-line react/prop-types
export default function GetIcon({ iconKey, height, width, stroke, fill }) {
	switch (iconKey) {
		case 'home':
			return (
				<HomeIcon height={height} width={width} stroke={stroke} fill={fill} />
			);
		case 'comment':
			return (
				<CommentIcon
					height={height}
					width={width}
					stroke={stroke}
					fill={fill}
				/>
			);
		case 'plus':
			return (
				<PlusSquareIcon
					height={height}
					width={width}
					stroke={stroke}
					fill={fill}
				/>
			);
		case 'search':
			return (
				<SearchIcon height={height} width={width} stroke={stroke} fill={fill} />
			);
		case 'heart':
			return (
				<HeartIcon height={height} width={width} stroke={stroke} fill={fill} />
			);
		case 'logout':
			return (
				<LogoutIcon height={height} width={width} stroke={stroke} fill={fill} />
			);
		case 'profile':
			return (
				<ProfileIcon
					height={height}
					width={width}
					stroke={stroke}
					fill={fill}
				/>
			);
		case 'share':
			return (
				<ShareIcon height={height} width={width} stroke={stroke} fill={fill} />
			);
	}
}
