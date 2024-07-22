import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { MainContainer } from './components/ui/container';
import Bottombar from './components/Bottombar';
import AdviceSlip from './components/AdviceSlip';
import WhatsNew from './components/WhatsNew';
import Socials from './components/Socials';
import { useEffect, useRef } from 'react';

function App() {
	const mainContentRef = useRef(null);
	const location = useLocation();

	// remove some previous data saved
	useEffect(() => {
		localStorage.removeItem('extra_posts');
		localStorage.removeItem('scroll_position_/');
	}, []);

	// save the current scroll position when scrolling so that when the user goes back, the scroll position is preserved
	useEffect(() => {
		const mainContentRefCurrent = mainContentRef.current;

		const saveScrollPosition = () => {
			if (mainContentRefCurrent) {
				localStorage.setItem(
					`scroll_position_${location.pathname}`,
					mainContentRefCurrent.scrollTop
				);
			}
		};

		mainContentRefCurrent.addEventListener('scroll', saveScrollPosition);
		return () => {
			mainContentRefCurrent.removeEventListener('scroll', saveScrollPosition);
		};
	}, [location.pathname]);

	// get the previous scroll position if there are any
	useEffect(() => {
		if (mainContentRef.current) {
			const scrollValue = localStorage.getItem(
				`scroll_position_${location.pathname}`
			);

			// this is weird, it needs setTimeout or else it won't work, im guessing the posts needs time to render considering it it being fetched, although it is queried so it shouldnt take too much time to load
			setTimeout(() => {
				mainContentRef.current.scrollBy({
					top: parseInt(scrollValue),
					left: 0,
				});
			}, 20);
		}
	}, [location.pathname]);

	return (
		<MainContainer>
			{/* 10dvh */}
			<Header />

			<div className='flex flex-col bg-background md:flex-row h-[90dvh]'>
				<div className='hidden md:flex'>
					<Sidebar />
				</div>

				<div
					ref={mainContentRef}
					className='transition-all flex flex-col py-2 flex-1 w-full md:max-w-[45rem] md:min-w-[30rem] sm:p-5 overflow-y-scroll bg-background'
				>
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
