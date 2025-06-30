import { useEffect, useState } from 'react';

interface Item {
  id: number;
  text: string;
  confirm: boolean;
  done: boolean;
}

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<Item[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todoList');
    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos));
    }
    console.log(storedTodos);

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('todoList', JSON.stringify(todoList));
    console.log(
      '[Storage] 저장된 투두리스트 :',
      localStorage.getItem('todoList')
    );
  }, [todoList]);

  const onAddTodoList = () => {
    const lastItem = todoList[todoList.length - 1];
    if (lastItem && lastItem.text.trim() === '') {
      alert('할 일을 입력해주세요!');
      return;
    }
    const todoListObj = {
      id: Date.now(),
      text: '',
      done: false,
      confirm: false,
    };
    const newTodoList = [...todoList, todoListObj];
    console.log('[add] 추가된 투두리스트 :', newTodoList);

    setTodoList(newTodoList);
    // setNextId(nextId + 1);
  };

  const onDeleteTodoList = (removeInputId: number) => {
    const deletedTodoList = todoList.filter(
      (item: Item) => item.id !== removeInputId
    );
    setTodoList(deletedTodoList);
  };

  const onUpdateTodoList = (updatedInputId: number, newText: string) => {
    const updatedTodoList = todoList.map((item: Item) =>
      item.id === updatedInputId ? { ...item, text: newText } : item
    );
    setTodoList(updatedTodoList);
  };

  const onToggelDone = (toggleId: number) => {
    const updatedTodoList = todoList.map((item: Item) =>
      item.id === toggleId ? { ...item, done: !item.done } : item
    );
    setTodoList(updatedTodoList);
  };

  const onClickInputConfirm = (inputId: number) => {
    const confirmList = todoList.map((item: Item) =>
      item.id === inputId ? { ...item, confirm: true } : item
    );
    setTodoList(confirmList);
  };

  return {
    todoList,
    onAddTodoList,
    onUpdateTodoList,
    onDeleteTodoList,
    onToggelDone,
    onClickInputConfirm,
  };
};
