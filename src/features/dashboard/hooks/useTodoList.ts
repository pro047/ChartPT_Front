import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, fetchTodos, saveTodo, updateTodo } from '../api';

export const useTodoList = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 0,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      updateTodo(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
