import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
    useCallback,
} from 'react';
import { Todo, FilterType } from '@/entities/todo/model/types';

const LOCAL_STORAGE_KEY = 'todos-app-data';

interface TodoContextType {
    todos: Todo[];
    filter: FilterType;
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
    setFilter: (filter: FilterType) => void;
    clearCompleted: () => void;
    activeCount: number;
}

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });
    const [filter, setFilter] = useState<FilterType>('all');

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
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

    return (
        <TodoContext.Provider
            value={{
                todos,
                filter,
                addTodo,
                toggleTodo,
                setFilter,
                clearCompleted,
                activeCount,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}

export function useTodos() {
    const context = useContext(TodoContext);
    if (context === null) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
}
