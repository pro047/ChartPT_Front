'use client';

import { useAddTodo, useDeleteTodo, useTodoList } from '../hooks/useTodoList';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardLayout, TodoItem } from '@/shared';
import { useState } from 'react';

export const TodoForm = () => {
  const { data, isLoading, error, refetch } = useTodoList();

  const [localTodos, setLocalTodos] = useState<TodoItem[]>([]);

  const addTodo = useAddTodo();
  const deleteTodo = useDeleteTodo();

  console.log('data : ', data);
  console.log('data type is :', typeof data);

  const onAddInput = () => {
    const hasEmpty = localTodos.some(
      (i) => !i.confirm && i.content.trim() === ''
    );
    if (hasEmpty) {
      alert('할 일을 입력해주세요');
      return;
    }

    setLocalTodos([
      ...localTodos,
      { id: Date.now(), content: '', confirm: false },
    ]);
  };

  const onChangeText = (id: number, value: string) => {
    setLocalTodos((prev) =>
      prev.map((i) => (i.id === id ? { ...i, content: value } : i))
    );
  };

  const onConfirm = (id: number, content: string) => {
    if (!content.trim()) {
      alert('내용을 입력하세요');
      return;
    }

    setLocalTodos((prev) =>
      prev.map((i) => (i.id === id ? { ...i, confirm: true } : i))
    );

    addTodo.mutate(
      { content },
      {
        onSuccess: () => {
          setLocalTodos((prev) => prev.filter((i) => i.id !== id));
          refetch();
        },
      }
    );
  };

  const onDeleteLocal = (id: number) => {
    setLocalTodos((prev) => prev.filter((i) => i.id !== id));
  };

  const onDeleteServer = (id: number) => {
    deleteTodo.mutate(id, { onSuccess: () => refetch() });
  };

  const serverTodos = data?.todos ?? [];

  const isEmpty = serverTodos.length === 0 && localTodos.length === 0;

  if (isLoading) return <p>로딩 중...</p>; //todos : 스켈레톤 추가하기
  if (error) return <p>에러 발생</p>;

  return (
    <CardLayout>
      <CardHeader>
        <CardTitle className='text-xl'>해야 할 일</CardTitle>
        <p className='mt-2 mb-5 text-sm text-muted-foreground'>
          오늘 할 일을 추가해보세요
        </p>
        <Button className='w-30 mt-2' onClick={onAddInput}>
          추가하기
        </Button>
      </CardHeader>

      <div className='px-6 text-sm'>
        <ol className='my-4 [&>li]:mt-3'>
          {isEmpty ? (
            <div className='flex flex-col items-center justify-center'>
              <p className='text-sm text-muted-foreground ml-6'>
                등록된 할 일이 없습니다
              </p>
            </div>
          ) : (
            <>
              {[
                ...serverTodos.map((todo) => ({ ...todo, confirm: true })),
                ...localTodos,
              ].map((todo) => {
                return (
                  <li key={todo.id}>
                    {todo.confirm ? (
                      <div className='flex items-center justify-between gap-3 font-semibold'>
                        <div className='text-base'>{todo.content}</div>
                        <Button onClick={() => onDeleteServer(todo.id)}>
                          삭제
                        </Button>
                      </div>
                    ) : (
                      <div className='flex flex-row gap-3 '>
                        <Input
                          value={todo.content}
                          onChange={(e) =>
                            onChangeText(todo.id, e.target.value)
                          }
                          placeholder='할 일을 작성해보세요'
                        />
                        <Button
                          onClick={() => onConfirm(todo.id, todo.content)}
                        >
                          확인
                        </Button>
                        <Button onClick={() => onDeleteLocal(todo.id)}>
                          지우기
                        </Button>
                      </div>
                    )}
                  </li>
                );
              })}
            </>
          )}
        </ol>
      </div>
    </CardLayout>
  );
};
