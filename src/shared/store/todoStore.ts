import { create } from 'zustand';
import { TodoStoreType } from '../types';
import { persist } from 'zustand/middleware';
import { encryptedStorage } from '../utils';

export const useTodoStore = create<TodoStoreType>()(
  persist(
    (set) => ({
      localTodos: [],
      addLocalTodo: (todo) =>
        set((state) => ({ localTodos: [...state.localTodos, todo] })),
      updateLocalTodo: (id, content, confirm = false) =>
        set((state) => ({
          localTodos: state.localTodos.map((i) =>
            i.id === id ? { ...i, content, confirm } : i
          ),
        })),
      deleteLocalTodo: (id) =>
        set((state) => ({
          localTodos: state.localTodos.filter((i) => i.id !== id),
        })),
      clearLocalTodos: () => set({ localTodos: [] }),
    }),
    { name: 'todoStorage', storage: encryptedStorage }
  )
);
