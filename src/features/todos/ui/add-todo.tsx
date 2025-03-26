import { FormEvent, memo, useState } from 'react';
import { Button, Flex, TextField } from '@radix-ui/themes';
import { useTodos } from '../lib/use-todos';

export const AddTodo = memo(() => {
    const [text, setText] = useState('');
    const { addTodo } = useTodos();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex gap="3">
                <TextField.Root
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a new task..."
                    style={{ width: '100%' }}
                />
                <Button type="submit">Add</Button>
            </Flex>
        </form>
    );
});
