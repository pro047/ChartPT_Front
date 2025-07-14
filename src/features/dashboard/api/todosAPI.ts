import { Instance, TodoItem } from '@/shared';

export interface TodosResponse {
  todos: TodoItem[];
}

export const fetchTodos = async (): Promise<TodosResponse> => {
  try {
    const result = await Instance.get(`/dashboard/todos`);

    if (!result) {
      throw new Error('Not found Todos');
    }

    console.log('result. data', result.data);

    return result.data;
  } catch (err) {
    throw new Error(`fetchAllTodosByUserId error : ${err}`);
  }
};

export const saveTodo = async ({
  content,
}: {
  content: string;
}): Promise<number> => {
  try {
    const result = await Instance.post(`/dashboard/todos`, {
      content,
    });

    return result.data.todoId;
  } catch (err) {
    throw new Error(`save Todos error: ${err}`);
  }
};

export const updateTodo = async (
  todoId: number,
  content: string
): Promise<void> => {
  try {
    await Instance.put(`/dashboard/todos/${todoId}`, {
      content,
    });
  } catch (err) {
    throw new Error(`updateTodos error : ${err}`);
  }
};

export const deleteTodo = async (todoId: number): Promise<void> => {
  console.log(typeof todoId);

  try {
    await Instance.delete(`/dashboard/todos/${todoId}`);
  } catch (err) {
    throw new Error(`deleteTodos error : ${err}`);
  }
};
