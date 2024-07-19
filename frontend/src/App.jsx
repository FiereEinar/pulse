import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { MainContainer } from './components/ui/container';
import Bottombar from './components/Bottombar';
import AdviceSlip from './components/AdviceSlip';
import WhatsNew from './components/WhatsNew';
import Socials from './components/Socials';

function App() {
	return (
		<MainContainer>
			{/* 10dvh */}
			<Header />

			<div className='flex flex-col bg-background md:flex-row h-[90dvh]'>
				<div className='hidden md:flex'>
					<Sidebar />
				</div>

				<div className='transition-all flex flex-col py-2 flex-1 w-full md:max-w-[45rem] md:min-w-[30rem] sm:p-5 overflow-y-scroll bg-background'>
					<Outlet />
				</div>

				<aside className='transition-all w-[25rem] bg-background hidden lg:flex flex-col gap-5 h-full p-2 sm:p-5 overflow-y-scroll'>
					<AdviceSlip />
					<WhatsNew />
					<Socials />
				</aside>
				<div className='flex md:hidden'>
					<Bottombar />
				</div>
			</div>
		</MainContainer>
	);
}

export default App;
