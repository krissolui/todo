import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoEditor from './TodoEditor';

export enum STATUS {
	TODO = 'TODO',
	DONE = 'DONE',
}

export interface ITodoItem {
	title: string;
	status: STATUS;
}

export type ITodoList = { [id: string]: ITodoItem };

const isLocalStorageAvailable = () => {
	const test = 'test';
	try {
		window.localStorage.setItem(test, test);
		window.localStorage.removeItem(test);
		return true;
	} catch (e) {
		return false;
	}
};

const getStoredTodoList = (): ITodoList => {
	if (!isLocalStorageAvailable()) return {};
	const localList = window.localStorage.getItem('todolist');
	if (!localList) return {};
	return JSON.parse(localList);
};

const getStoredCounter = (): number => {
	const localCounter = window.localStorage.getItem('counter');
	if (!localCounter) return 0;
	return parseInt(localCounter);
};

const TodoList = () => {
	const [counter, setCounter] = useState<number>(getStoredCounter());
	const [todoList, setTodoList] = useState<ITodoList>(getStoredTodoList());
	const [onAddTodo, setOnAddTodo] = useState<boolean>(false);

	useEffect(() => {
		if (!isLocalStorageAvailable) return;
		window.localStorage.setItem('todolist', JSON.stringify(todoList));
	}, [todoList]);

	useEffect(() => {
		if (!isLocalStorageAvailable) return;
		window.localStorage.setItem('counter', JSON.stringify(counter));
	}, [counter]);

	const onClickAdd = () => {
		setOnAddTodo(true);
	};

	const onClickCancel = () => {
		setOnAddTodo(false);
	};

	const addTodo = (title: string) => {
		setTodoList(
			Object.assign({}, todoList, {
				[counter]: { title, status: STATUS.TODO },
			})
		);
		setCounter(counter + 1);
		setOnAddTodo(false);
	};

	const editTodo = (id: string) => (title: string) => {
		setTodoList(
			Object.assign({}, todoList, {
				[id]: { ...todoList[id], title },
			})
		);
	};

	const markItemDone = (id: string) => () => {
		setTodoList(
			Object.assign({}, todoList, {
				[id]: { ...todoList[id], status: STATUS.DONE },
			})
		);
	};

	const removeItem = (id: string) => () => {
		const newList = Object.assign({}, todoList);
		delete newList[id];
		setTodoList(newList);
	};

	const pendingTodo = Object.keys(todoList).filter(
		(id) => todoList[id].status == STATUS.TODO
	);

	return (
		<>
			{!onAddTodo && (
				<button
					className="w-full mr-100 mb-3 py-1 place-self-start bg-orange-600"
					onClick={onClickAdd}
				>
					Add
				</button>
			)}

			{onAddTodo && (
				<TodoEditor onClickCancel={onClickCancel} editTodo={addTodo} />
			)}

			{pendingTodo.length == 0 && <p>No todos found</p>}
			<div className="min-w-[400px]">
				{pendingTodo.map((id: string) => (
					<TodoItem
						id={id}
						title={todoList[id].title}
						editTodo={editTodo(id)}
						markItemDone={markItemDone(id)}
						removeItem={removeItem(id)}
					/>
				))}
			</div>
		</>
	);
};

export default TodoList;
