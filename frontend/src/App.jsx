import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { MainContainer } from './components/ui/container';

function App() {
	return (
		<MainContainer>
			{/* 10dvh */}
			<Header />

			<div className='flex h-[90dvh]'>
				<Sidebar />

				<div className='flex flex-col h-full w-full p-3 overflow-auto'>
					<Outlet />
				</div>

				<aside className='w-[30rem] h-full border-l dark:border-gray-800'>
					<article></article>

					<article></article>
				</aside>
			</div>
		</MainContainer>
	);
}

export default App;
