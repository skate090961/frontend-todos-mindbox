import { useMemo } from 'react';
import { useTodos } from './use-todos';

export function useFilteredTodos() {
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
}
