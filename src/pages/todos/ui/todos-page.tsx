import { Badge, Card, Flex, Heading } from '@radix-ui/themes';
import { AddTodo, TodoFilter, TodoList } from '@/features/todos';
import { Layout } from './layout';

export function TodosPage() {
    return (
        <Layout>
            <Badge>test task for Mindbox</Badge>
            <Heading size="9" mt="2">
                TODOS
            </Heading>
            <Card size="2" mt="3">
                <Flex direction="column" gap="3">
                    <AddTodo />
                    <TodoList />
                    <TodoFilter />
                </Flex>
            </Card>
        </Layout>
    );
}
