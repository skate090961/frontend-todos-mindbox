import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { LS_TODOS_KEY, TodoContext } from '../model/todo-context';
import { FilterType, Todo } from '../model/types';

const getInitialTodos = (): Todo[] => {
    if (typeof window === 'undefined') return [];

    try {
        const saved = localStorage.getItem(LS_TODOS_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Failed to parse saved todos', error);
        return [];
    }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>(getInitialTodos);
    const [filter, setFilter] = useState<FilterType>('all');

    useEffect(() => {
        try {
            localStorage.setItem(LS_TODOS_KEY, JSON.stringify(todos));
        } catch (error) {
            console.error('Failed to save todos to localStorage', error);
        }
    }, [todos]);

    const addTodo = useCallback((text: string) => {
        setTodos((prev) => [
            ...prev,
            {
                id: Date.now(),
                text: text.trim(),
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

    const updateFilter = useCallback((newFilter: FilterType) => {
        setFilter(newFilter);
    }, []);

    const activeCount = useMemo(
        () => todos.filter((todo) => !todo.completed).length,
        [todos],
    );

    const contextValue = useMemo(
        () => ({
            todos,
            filter,
            addTodo,
            toggleTodo,
            setFilter: updateFilter,
            clearCompleted,
            activeCount,
        }),
        [
            todos,
            filter,
            addTodo,
            toggleTodo,
            updateFilter,
            clearCompleted,
            activeCount,
        ],
    );

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    );
};
