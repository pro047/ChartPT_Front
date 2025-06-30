'use client';

import { useTodoList } from '../hooks/useTodoList';
import { Item } from '../types/types';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { CardLayout } from '@/shared';

export const TodoForm = () => {
  const {
    todoList,
    onAddTodoList,
    onUpdateTodoList,
    onDeleteTodoList,
    onToggelDone,
    onClickInputConfirm,
  } = useTodoList();

  return (
    <>
      <CardLayout>
        <CardHeader>
          <CardTitle className='text-xl'>해야 할 일</CardTitle>
          <p className='mt-2 mb-5 text-sm text-muted-foreground'>
            오늘 할 일을 추가해보세요
          </p>
          <Button className='w-30 mt-2' onClick={onAddTodoList}>
            추가하기
          </Button>
        </CardHeader>
        <div className='pr-5 text-sm'>
          <ol className='my-4 ml-6 [&>li]:mt-2'>
            {todoList.map((item: Item) => (
              <li key={item.id}>
                <div className='flex mb-2 items-center justify-between font-semibold text-lg'>
                  {item.confirm ? (
                    <>
                      <div className='flex items-center gap-4'>
                        <Checkbox
                          checked={item.done}
                          onCheckedChange={() => onToggelDone(item.id)}
                        />
                        {item.text}
                      </div>
                      <Button
                        className='w-18 ml-2'
                        onClick={() => onDeleteTodoList(item.id)}
                      >
                        삭제
                      </Button>
                    </>
                  ) : (
                    <div className='flex w-full items-center gap-2'>
                      <Input
                        type='text'
                        placeholder='What to do?'
                        value={item.text}
                        onChange={(e) =>
                          onUpdateTodoList(item.id, e.target.value)
                        }
                      />
                      <Checkbox
                        checked={item.done}
                        onCheckedChange={() => onToggelDone(item.id)}
                      />
                      <Button onClick={() => onClickInputConfirm(item.id)}>
                        확인
                      </Button>
                      <Button
                        className='w-18 ml-2'
                        onClick={() => onDeleteTodoList(item.id)}
                      >
                        지우기
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </CardLayout>
    </>
  );
};
