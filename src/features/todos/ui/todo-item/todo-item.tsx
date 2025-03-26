import { Card, Checkbox, Flex, Text } from '@radix-ui/themes';
import { memo } from 'react';
import clsx from 'clsx';
import { Todo } from '../../model/types';
import styles from './todo-item.module.scss';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
}

export const TodoItem = memo(({ todo, onToggle }: TodoItemProps) => {
    return (
        <Card>
            <Flex align="center" gap="2">
                <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => onToggle(todo.id)}
                />
                <Text
                    as="p"
                    className={clsx(todo.completed && styles.completed)}
                >
                    {todo.text}
                </Text>
            </Flex>
        </Card>
    );
});
