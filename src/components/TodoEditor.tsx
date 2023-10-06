import { useState } from 'react';

interface ITodoEditorProps {
	title?: string;
	editTodo: (title: string) => void;
	onClickCancel: () => void;
}

const TodoEditor = ({ title, editTodo, onClickCancel }: ITodoEditorProps) => {
	const [currentTitle, setCurrentTitle] = useState<string>(title ?? '');

	const handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
		setCurrentTitle(e.currentTarget.value);
	};

	const onClickSubmit = () => {
		if (currentTitle === '') {
			alert('Todo title must NOT be empty!');
			return;
		}

		editTodo(currentTitle);
	};

	return (
		<div className="my-4">
			<div>
				<input
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					type="text"
					name="title"
					value={currentTitle}
					placeholder="What's your next task?"
					onChange={handleChangeTitle}
				/>
			</div>
			<div className="flex justify-end gap-2 mt-2">
				<button
					className="py-1 bg-blue-500 leading-5"
					type="submit"
					onClick={onClickSubmit}
				>
					Submit
				</button>
				<button
					className="py-1 bg-red-700"
					type="button"
					onClick={onClickCancel}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default TodoEditor;
