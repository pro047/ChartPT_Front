export interface TodoItem {
  id: number;
  content: string;
  confirm: boolean;
}

export interface TodoStoreType {
  localTodos: TodoItem[];
  addLocalTodo: (todo: TodoItem) => void;
  updateLocalTodo: (id: number, content: string, confirm: boolean) => void;
  deleteLocalTodo: (id: number) => void;
  clearLocalTodos: () => void;
}
