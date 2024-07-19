import SignupForm from '@/components/forms/SignupForm';
import { StrongHeaderText } from '@/components/ui/text';

export default function Signup() {
	return (
		<div className='relative'>
			<section className='absolute mt-[5rem] left-[50%] translate-x-[-50%] flex max-w-[30rem] w-[98%] sm:w-[30rem] m-auto z-50 p-3'>
				<div className='flex flex-col gap-3'>
					<StrongHeaderText>Sign up</StrongHeaderText>
					<SignupForm />
				</div>
			</section>
			<img
				className='absolute h-dvh object-cover z-0 w-full top-0'
				src='/circle-scatter-haikei.svg'
				alt=''
			/>
		</div>
	);
}
