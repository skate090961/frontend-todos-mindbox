import { useContext } from 'react';
import { TodoContext } from '../model/todo-context';

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (context === null) {
        throw new Error('context not provided');
    }
    return context;
};
