import { Flex } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { TodoProvider } from '@/features/todos';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <TodoProvider>
            <Flex
                direction="column"
                align="center"
                justify="center"
                style={{ height: 'calc(100vh - var(--footer-height))' }}
            >
                {children}
            </Flex>
        </TodoProvider>
    );
};
