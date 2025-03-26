import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { TodoProvider } from './todo-provider';
import { useTodos } from '../lib/use-todos';
import { LS_TODOS_KEY } from './todo-context';
import { setupLocalStorageMock } from '../../../../vitest/mocks/localStorage';

describe('TodoProvider', () => {
    beforeEach(() => {
        setupLocalStorageMock();
        window.localStorage.clear();
    });

    describe('Initialization', () => {
        it('should initialize with empty todos when no data in localStorage', () => {
            const { result } = renderHook(() => useTodos(), {
                wrapper: TodoProvider,
            });

            expect(result.current.todos).toEqual([]);
        });

        it('should load todos from localStorage when available', () => {
            const testTodos = [{ id: 1, text: 'Test todo', completed: false }];
            window.localStorage.setItem(
                LS_TODOS_KEY,
                JSON.stringify(testTodos),
            );

            const { result } = renderHook(() => useTodos(), {
                wrapper: TodoProvider,
            });

            expect(result.current.todos).toEqual(testTodos);
        });
    });

    describe('Todo Operations', () => {
        it('should add a new todo with correct properties', () => {
            const { result } = renderHook(() => useTodos(), {
                wrapper: TodoProvider,
            });

            act(() => {
                result.current.addTodo('New todo');
            });

            const [todo] = result.current.todos;
            expect(todo).toMatchObject({
                text: 'New todo',
                completed: false,
            });
            expect(typeof todo.id).toBe('number');
        });

        it('should toggle todo completion status', () => {
            const testTodos = [{ id: 1, text: 'Test todo', completed: false }];
            window.localStorage.setItem(
                LS_TODOS_KEY,
                JSON.stringify(testTodos),
            );

            const { result } = renderHook(() => useTodos(), {
                wrapper: TodoProvider,
            });

            // Toggle to completed
            act(() => {
                result.current.toggleTodo(1);
            });
            expect(result.current.todos[0].completed).toBe(true);

            // Toggle back to active
            act(() => {
                result.current.toggleTodo(1);
            });
            expect(result.current.todos[0].completed).toBe(false);
        });

        it('should remove completed todos while keeping active ones', () => {
            const testTodos = [
                { id: 1, text: 'Todo 1', completed: true },
                { id: 2, text: 'Todo 2', completed: false },
            ];
            window.localStorage.setItem(
                LS_TODOS_KEY,
                JSON.stringify(testTodos),
            );

            const { result } = renderHook(() => useTodos(), {
                wrapper: TodoProvider,
            });

            act(() => {
                result.current.clearCompleted();
            });

            expect(result.current.todos).toEqual([
                { id: 2, text: 'Todo 2', completed: false },
            ]);
        });
    });

    describe('Persistence', () => {
        it('should update localStorage when todos change', () => {
            const { result } = renderHook(() => useTodos(), {
                wrapper: TodoProvider,
            });

            act(() => {
                result.current.addTodo('New todo');
            });

            const storedTodos = JSON.parse(
                window.localStorage.getItem(LS_TODOS_KEY)!,
            );
            expect(storedTodos).toEqual(result.current.todos);
        });
    });

    describe('Filtering', () => {
        it('should calculate activeCount correctly', () => {
            const testTodos = [
                { id: 1, text: 'Todo 1', completed: true },
                { id: 2, text: 'Todo 2', completed: false },
                { id: 3, text: 'Todo 3', completed: false },
            ];
            window.localStorage.setItem(
                LS_TODOS_KEY,
                JSON.stringify(testTodos),
            );

            const { result } = renderHook(() => useTodos(), {
                wrapper: TodoProvider,
            });

            expect(result.current.activeCount).toBe(2);
        });

        it('should update filter correctly', () => {
            const { result } = renderHook(() => useTodos(), {
                wrapper: TodoProvider,
            });

            act(() => {
                result.current.setFilter('active');
            });

            expect(result.current.filter).toBe('active');
        });
    });
});
