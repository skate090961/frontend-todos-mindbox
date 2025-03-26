import { useContext } from 'react';
import { TodoContext } from '../model/todo-context';

/**
 * Hook to access todos context
 * @throws {Error} If used outside of TodoProvider
 * @returns Todos context value
 */

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (context === null) {
        throw new Error('context not provided');
    }
    return context;
};
