import { useState } from 'react';
import TodoEditor from './TodoEditor';

interface ITodoItemProps {
	title: string;
	editTodo: (title: string) => void;
	markItemDone: () => void;
	removeItem: () => void;
}

const TodoItem = ({
	title,
	editTodo,
	markItemDone,
	removeItem,
}: ITodoItemProps) => {
	const [onEditTodo, setOnEditTodo] = useState<boolean>(false);

	const onClickEdit = () => {
		setOnEditTodo(true);
	};

	const onClickCancel = () => {
		setOnEditTodo(false);
	};

	const editTitle = (title: string) => {
		editTodo(title);
		setOnEditTodo(false);
	};

	return (
		<>
			{!onEditTodo && (
				<div className="container flex gap-2 w-full align-center my-2 ">
					<input
						className="flex-initial my-auto checked:bg-blue-500"
						type="radio"
						checked={false}
						onClick={markItemDone}
					/>
					<h4 className="flex-1 my-auto">{title}</h4>
					<button className="py-1 flex-initial" onClick={onClickEdit}>
						Edit
					</button>
					<button
						className="py-1 flex-initial bg-red-700"
						onClick={removeItem}
					>
						X
					</button>
				</div>
			)}

			{onEditTodo && (
				<TodoEditor
					title={title}
					editTodo={editTitle}
					onClickCancel={onClickCancel}
				/>
			)}
		</>
	);
};

export default TodoItem;
