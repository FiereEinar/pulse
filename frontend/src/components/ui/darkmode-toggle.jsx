import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

// temporary
export default function DarkModeToggle() {
	const [isDarkMode, setDarkMode] = useState(
		document.querySelector('body').classList.contains('dark')
	);

	const toggleDarkMode = () => {
		setDarkMode(!isDarkMode);
		document.querySelector('body').classList.toggle('dark');
	};

	return (
		<DarkModeSwitch size={20} checked={isDarkMode} onChange={toggleDarkMode} />
	);
}
