import { FormEvent, memo, useState } from 'react';
import { useTodos } from '../model/todo-context';
import { Button, TextField } from '@radix-ui/themes';

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
            <TextField.Root
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
            />
            <Button type="submit">Add</Button>
        </form>
    );
});
