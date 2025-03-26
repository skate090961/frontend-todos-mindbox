import { useMemo } from 'react';
import { useTodos } from './use-todos';
import { Todo } from '../model/types';

/**
 * Hook to get todos filtered according to current filter
 * @returns Todo[]
 */

export const useFilteredTodos = (): Todo[] => {
    const { todos, filter } = useTodos();

    return useMemo(() => {
        switch (filter) {
            case 'active':
                return todos.filter((todo) => !todo.completed);
            case 'completed':
                return todos.filter((todo) => todo.completed);
            default:
                return todos;
        }
    }, [todos, filter]);
};
