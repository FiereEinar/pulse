import { Button } from './components/ui/button';

function App() {
	return (
		<main className='bg-gray-900 min-h-screen text-white'>
			<section className='flex items-center gap-5 p-5'>
				<h1>Hello</h1>
				<Button size='sm' variant='secondary'>
					Sign up
				</Button>
			</section>
		</main>
	);
}

export default App;
