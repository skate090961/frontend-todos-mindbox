import { createContext } from 'react';
import { FilterType, Todo } from '../model/types';

interface TodoContextType {
    todos: Todo[];
    filter: FilterType;
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
    setFilter: (filter: FilterType) => void;
    clearCompleted: () => void;
    activeCount: number;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export const LS_TODOS_KEY = 'todos-app-data';
