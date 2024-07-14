/* eslint-disable react/prop-types */

export default function UserGrid({ users, type }) {
	return (
		<div className='transition-all bg-card min-h-[10rem] p-1 px-2 rounded-md'>
			{users.length === 0 && (
				<p className='text-muted-foreground italic text-sm'>No {type}</p>
			)}
			{users.map((user, i) => (
				<h1 key={i}>hello</h1>
			))}
		</div>
	);
}
