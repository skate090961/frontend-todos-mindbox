import { Todo } from '@/entities/todo/model/types';
import { Card, Checkbox, Flex, Text } from '@radix-ui/themes';
import { memo } from 'react';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
}

export const TodoItem = memo(({ todo, onToggle }: TodoItemProps) => {
    return (
        <Card>
            <Flex align={'center'} gap={'2'}>
                <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => onToggle(todo.id)}
                />
                <Text as={'p'}>{todo.text}</Text>
            </Flex>
        </Card>
    );
});
