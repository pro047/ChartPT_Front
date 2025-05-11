'use client';

import { useUserStore } from '@/shared';
import { useTodoList } from '../hooks/useTodoList';
import { Item } from '../types/types';

export const TherapistForm = () => {
  const {
    todoList,
    onAddTodoList,
    onUpdateTodoList,
    onDeleteTodoList,
    onToggelDone,
    onClickInputConfirm,
  } = useTodoList();

  const name = useUserStore((state) => state.name);
  console.log('theraname:', name);

  return (
    <>
      <div>{name} 치료사님 안녕하세요!</div>
      <div>오늘 해야 할 일은 어떤건가요?</div>
      <ol>
        <div>
          {todoList.map((item: Item) => (
            <li key={item.id}>
              {item.confirm ? (
                <div>
                  {item.text}
                  <input
                    type='checkbox'
                    checked={item.done}
                    onChange={() => onToggelDone(item.id)}
                  />
                </div>
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
