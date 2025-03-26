import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { LS_TODOS_KEY, TodoContext } from '../model/todo-context';
import { FilterType, Todo } from '../model/types';

const defaultTodos = () => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(LS_TODOS_KEY);
        return saved ? JSON.parse(saved) : [];
    }
    return [];
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>(defaultTodos);
    const [filter, setFilter] = useState<FilterType>('all');

    useEffect(() => {
        localStorage.setItem(LS_TODOS_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = useCallback((text: string) => {
        setTodos((prev) => [
            ...prev,
            {
                id: Date.now(),
                text,
                completed: false,
            },
        ]);
    }, []);

    const toggleTodo = useCallback((id: number) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        );
    }, []);

    const clearCompleted = useCallback(() => {
        setTodos((prev) => prev.filter((todo) => !todo.completed));
    }, []);

    const activeCount = todos.filter((todo) => !todo.completed).length;

    const defaultContextProps = useMemo(
        () => ({
            todos,
            filter,
            addTodo,
            toggleTodo,
            setFilter,
            clearCompleted,
            activeCount,
        }),
        [todos, filter],
    );

    return (
        <TodoContext.Provider value={defaultContextProps}>
            {children}
        </TodoContext.Provider>
    );
};
