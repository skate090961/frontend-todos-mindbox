import { AddTodo, TodoList, TodoFilter, TodoProvider } from '@/features/todos';
import { Badge, Box, Card, Flex, Heading } from '@radix-ui/themes';

export function TodosPage() {
    return (
        <TodoProvider>
            <Box>
                <Badge>Bage for TODOS</Badge>
                <Heading size={'9'}>TODOS</Heading>
                <Card size={'2'}>
                    <Flex direction={'column'} gap={'3'}>
                        <AddTodo />
                        <TodoList />
                        <TodoFilter />
                    </Flex>
                </Card>
            </Box>
        </TodoProvider>
    );
}
