import { Button } from './components/ui/button';
import { MainContainer } from './components/ui/container';

function App() {
	return (
		<MainContainer>
			<section className='flex items-center gap-5 p-5'>
				<h1 className=''>Hello</h1>
				<Button size='sm' variant='secondary'>
					Sign up
				</Button>
			</section>
		</MainContainer>
	);
}

export default App;
