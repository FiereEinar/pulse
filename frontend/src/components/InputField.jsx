import { FormError } from './ui/error';

export function InputField({
	id = '',
	label = 'Enter text here:',
	type = 'text',
	error,
	register,
	labelClass = '',
	inputClass = '',
	...rest
}) {
	return (
		<div className='flex-1 flex flex-col flex-shrink'>
			<label
				className={`w-fit text-muted-foreground ${labelClass}`}
				htmlFor={id}
			>
				{label}
			</label>
			<input
				autoComplete='true'
				{...register}
				{...rest}
				id={id}
				className={`transition-all text-muted-foreground p-1 px-2 border w-full min-w-[10rem] rounded-sm bg-dark-200 text-lg bg-transparent ${inputClass}`}
				type={type}
			/>
			{error && <FormError message={error.message} />}
		</div>
	);
}
