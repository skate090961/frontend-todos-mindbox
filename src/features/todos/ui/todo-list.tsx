import { useFilteredTodos } from '../lib/use-filtered-todos';
import { useTodos } from '../model/todo-context';
import { TodoItem } from './todo-item';
import { Flex } from '@radix-ui/themes';
import { memo } from 'react';

export const TodoList = memo(() => {
    const filteredTodos = useFilteredTodos();
    const { toggleTodo } = useTodos();

    return (
        <Flex direction={'column'} gap={'2'}>
            {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
            ))}
        </Flex>
    );
});
