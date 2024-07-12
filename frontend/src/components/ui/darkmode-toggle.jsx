import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

// temporary
export default function DarkModeToggle() {
	const [isDarkMode, setDarkMode] = useState(true);

	const toggleDarkMode = () => {
		const body = document.querySelector('body');

		if (body.classList.contains('dark')) {
			body.classList.remove('dark');
			setDarkMode(false);
		} else {
			body.classList.add('dark');
			setDarkMode(true);
		}
	};
	return (
		<DarkModeSwitch size={20} checked={isDarkMode} onChange={toggleDarkMode} />
	);
}
