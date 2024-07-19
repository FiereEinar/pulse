import LoginForm from '@/components/forms/LoginForm';
import { StrongHeaderText } from '@/components/ui/text';

export default function Login() {
	return (
		<div className='relative'>
			<section className='absolute mt-[9rem] left-[50%] translate-x-[-50%] z-50 flex flex-col max-w-[30rem] w-[98%] sm:w-[30rem] m-auto gap-3 p-3'>
				<StrongHeaderText>Log in</StrongHeaderText>
				<LoginForm />
			</section>

			<img
				className='absolute h-dvh object-cover z-0 w-full top-0'
				src='/circle-scatter-haikei.svg'
				alt=''
			/>
		</div>
	);
}
