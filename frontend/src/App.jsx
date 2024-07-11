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

			<div className='flex flex-col bg-background md:flex-row h-[90dvh]'>
				<div className='hidden md:flex'>
					<Sidebar />
				</div>

				<div className='transition-all flex flex-col h-full w-full md:max-w-[40rem] p-2 sm:p-5 overflow-y-scroll bg-background'>
					<Outlet />
				</div>

				<aside className='transition-all bg-background w-[30rem] hidden lg:flex flex-col gap-5 h-full p-2 sm:p-5'>
					<article className='bg-card w-full h-full rounded-md border'></article>
					<article className='bg-card w-full h-full rounded-md border'></article>
				</aside>

				<div className='flex md:hidden'>
					<Bottombar />
				</div>
			</div>
		</MainContainer>
	);
}

export default App;
