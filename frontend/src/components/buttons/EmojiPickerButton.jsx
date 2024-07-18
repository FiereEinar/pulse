import { useState } from 'react';
import { Button } from '../ui/button';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export default function EmojiPickerButton({
	emojiContainerClass,
	onSelect,
	isSubmitting,
}) {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const onEmojiSelect = (emoji) => {
		onSelect(emoji);
		// setShowEmojiPicker(!showEmojiPicker);
	};

	return (
		<div>
			<Button
				title='Add Emoji'
				variant='icon'
				disabled={isSubmitting}
				type='button'
				size='sm'
				className='p-0 px-3 flex justify-center flex-shrink-0'
				onClick={() => setShowEmojiPicker(!showEmojiPicker)}
			>
				<img
					className='size-5'
					src={showEmojiPicker ? '/icons/close.svg' : '/icons/emoji.svg'}
					alt='Add Emoji'
				/>
			</Button>

			{showEmojiPicker && (
				<div
					className={`absolute top-[4rem] right-[1rem] z-50 ${emojiContainerClass}`}
				>
					<Picker perLine={7} data={data} onEmojiSelect={onEmojiSelect} />
				</div>
			)}
		</div>
	);
}
