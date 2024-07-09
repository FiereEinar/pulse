import SignupForm from '@/components/forms/SignupForm';
import { MainContainer } from '@/components/ui/container';
import { StrongHeaderText } from '@/components/ui/text';

export default function Signup() {
	return (
		<MainContainer>
			<section className='flex flex-col max-w-[30rem] m-auto gap-3 pt-10 p-3'>
				<StrongHeaderText>Sign up</StrongHeaderText>
				<SignupForm />
			</section>
		</MainContainer>
	);
}
