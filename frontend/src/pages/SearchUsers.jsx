import { fetchUsers } from '@/api/user';
import UsersFeed from '@/components/UsersFeed';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function SearchUsers() {
	const [search, setSearch] = useState('');
	const [users, setUsers] = useState([]);

	const { data, error, isLoading } = useQuery({
		queryKey: ['users'],
		queryFn: fetchUsers,
	});

	const handleSearch = (e) => {
		const searchTerm = e.target.value;

		setSearch(searchTerm);

		if (searchTerm.length === 0 || !data) return;

		const filteredUsers = data?.filter((user) => {
			const fullname = `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`;

			if (
				fullname.includes(searchTerm) ||
				user.username.toLowerCase().includes(searchTerm)
			)
				return true;
			return false;
		});

		setUsers(filteredUsers);
	};

	return (
		<section className='w-full h-full bg-card rounded-md p-3 flex flex-col gap-1'>
			<h1 className='text-popover-foreground text-xl font-semibold'>
				Search Users:
			</h1>
			<input
				value={search}
				onChange={handleSearch}
				className='bg-secondary text-muted-foreground p-1 px-2 rounded-md w-full'
				type='text'
			/>
			<UsersFeed
				users={search ? users : data}
				error={error}
				isLoading={isLoading}
			/>
		</section>
	);
}
