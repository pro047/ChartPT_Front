import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../service/auth/auth';
import { therapistNameUpdate } from '../service/therapist/therapist';

const Therapist = () => {
  const [therapistName, setTherapistName] = useState('');
  const [todoList, setTodoList] = useState(() => {
    const getTodoList = localStorage.getItem('todoList');
    return getTodoList ? JSON.parse(getTodoList) : [];
  });
  const [nextId, setNextid] = useState(() => {
    const getNextId = localStorage.getItem('NextId');
    return getNextId !== null ? parseInt(getNextId, 10) : 1;
  });

  const navigate = useNavigate();

  const onClick = () => {
    logout();
    navigate('/');
  };

  const onAddTodoList = () => {
    const lastItem = todoList[todoList.length - 1];
    if (lastItem && lastItem.text.trim() === '') {
      alert('할 일을 입력해주세요!');
      return;
    }
    const todoListObj = {
      id: nextId,
      text: '',
      done: false,
      confirm: false,
    };
    const newTodoList = [...todoList, todoListObj];
    setTodoList(newTodoList);
    setNextid(nextId + 1);
  };

  const onDeleteTodoList = (removeInputId) => {
    const deletedTodoList = todoList.filter(
      (item) => item.id !== removeInputId
    );
    setTodoList(deletedTodoList);
    localStorage.setItem('todoList', JSON.stringify(deletedTodoList));
  };

  const onUpdateTodoList = (updatedInputId, newText) => {
    const updatedTodoList = todoList.map((item) =>
      item.id === updatedInputId ? { ...item, text: newText } : item
    );
    setTodoList(updatedTodoList);
  };

  const onToggelDone = (toggleId) => {
    const updatedTodoList = todoList.map((item) =>
      item.id === toggleId ? { ...item, done: !item.done } : item
    );
    setTodoList(updatedTodoList);
  };

  const onClickInputConfirm = (inputId) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === inputId ? { ...item, confirm: true } : item
      )
    );
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };

  useEffect(() => {
    therapistNameUpdate().then(setTherapistName).catch(console.error);
  }, []);

  useEffect(() => {
    const getTodoList = localStorage.getItem('todoList');
    if (getTodoList) {
      setTodoList(JSON.parse(getTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    console.log('nextId', localStorage.getItem('NextID'));
    localStorage.setItem('NextId', nextId.toString());
  }, [nextId]);

  return (
    <>
      <div>{therapistName} 치료사님 안녕하세요!</div>
      <button onClick={onClick}>logout</button>
      <div>오늘 해야 할 일은 어떤건가요?</div>
      <ol>
        <div>
          {todoList.map((item) => (
            <li key={item.id}>
              {item.confirm ? (
                <div>{item.text}</div>
              ) : (
                <>
                  <input
                    type='text'
                    placeholder='what to do?'
                    value={item.text}
                    onChange={(e) => onUpdateTodoList(item.id, e.target.value)}
                  />
                  <input
                    type='checkbox'
                    checked={item.done}
                    onChange={() => onToggelDone(item.id)}
                  />
                  <button onClick={() => onClickInputConfirm(item.id)}>
                    추가하기
                  </button>
                </>
              )}
              <button onClick={() => onDeleteTodoList(item.id)}>지우기</button>
            </li>
          ))}
        </div>
        <button onClick={onAddTodoList}>+</button>
      </ol>
    </>
  );
};

export default Therapist;
