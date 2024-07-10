import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { MainContainer } from './components/ui/container';
import Bottombar from './components/Bottombar';

function App() {
	return (
		<MainContainer>
			{/* 10dvh */}
			<Header />

			<div className='flex flex-col md:flex-row h-[90dvh]'>
				<div className='hidden md:flex'>
					<Sidebar />
				</div>

				<div className='flex flex-col h-full w-full p-3 overflow-auto'>
					<Outlet />
				</div>

				<aside className='transition-all w-[30rem] hidden lg:flex flex-col h-full border-l dark:border-gray-800'>
					<article></article>

					<article></article>
				</aside>

				<div className='flex md:hidden'>
					<Bottombar />
				</div>
			</div>
		</MainContainer>
	);
}

export default App;
