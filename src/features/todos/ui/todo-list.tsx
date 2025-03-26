import { Flex } from '@radix-ui/themes';
import { memo } from 'react';
import { useFilteredTodos } from '../lib/use-filtered-todos';
import { useTodos } from '../lib/use-todos';
import { TodoItem } from './todo-item/todo-item';

export const TodoList = memo(() => {
    const filteredTodos = useFilteredTodos();
    const { toggleTodo } = useTodos();

    return (
        <Flex direction="column" gap="3">
            {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
            ))}
        </Flex>
    );
});
