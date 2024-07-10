import SignupForm from '@/components/forms/SignupForm';
import { Button } from '@/components/ui/button';
import { MainContainer } from '@/components/ui/container';
import { StrongHeaderText } from '@/components/ui/text';

export default function Signup() {
	return (
		<MainContainer>
			<section className='flex flex-col max-w-[30rem] w-[30rem] m-auto gap-3 pt-10 p-3'>
				<StrongHeaderText>Sign up</StrongHeaderText>
				<SignupForm />

				<div className='flex w-full items-center gap-3 text-muted-foreground text-xs'>
					<hr className='transition-all flex-grow' />
					<p>or continue</p>
					<hr className='transition-all flex-grow' />
				</div>

				<div className='flex w-full gap-2'>
					<Button className='flex flex-1 gap-2'>
						<img className='size-6 rounded-full border' src='' alt='' />
						<p>as Guest</p>
					</Button>

					<Button className='flex flex-1 gap-2'>
						<img className='size-6 rounded-full border' src='' alt='' />
						<p>with Google</p>
					</Button>

					<Button className='flex flex-1 gap-2'>
						<img className='size-6 rounded-full border' src='' alt='' />
						<p>with Github</p>
					</Button>
				</div>
			</section>
		</MainContainer>
	);
}
