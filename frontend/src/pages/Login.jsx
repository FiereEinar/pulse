import LoginForm from '@/components/forms/LoginForm';
import { MainContainer } from '@/components/ui/container';
import { StrongHeaderText } from '@/components/ui/text';

export default function Login() {
	return (
		<MainContainer>
			<section className='flex flex-col max-w-[30rem] w-[30rem] m-auto gap-3 pt-10 p-3'>
				<StrongHeaderText>Log in</StrongHeaderText>
				<LoginForm />
			</section>
		</MainContainer>
	);
}
