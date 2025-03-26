import { Box, Button, Flex, SegmentedControl, Text } from '@radix-ui/themes';
import { memo } from 'react';
import { useTodos } from '../lib/use-todos';

export const TodoFilter = memo(() => {
    const { setFilter, clearCompleted, activeCount } = useTodos();

    return (
        <Box>
            <Flex justify="between" align="center" gap="4" wrap="wrap">
                <Text as="p">{activeCount} items left</Text>
                <Box>
                    <SegmentedControl.Root defaultValue="all">
                        <SegmentedControl.Item
                            value="all"
                            onClick={() => setFilter('all')}
                        >
                            All
                        </SegmentedControl.Item>
                        <SegmentedControl.Item
                            value="active"
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </SegmentedControl.Item>
                        <SegmentedControl.Item
                            value="completed"
                            onClick={() => setFilter('completed')}
                        >
                            Completed
                        </SegmentedControl.Item>
                    </SegmentedControl.Root>
                </Box>
                <Button variant="outline" onClick={clearCompleted}>
                    Clear completed
                </Button>
            </Flex>
        </Box>
    );
});
