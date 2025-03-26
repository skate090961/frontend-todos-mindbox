import { Container } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface BaseLayoutProps {
    main: ReactNode;
    footer: ReactNode;
}

export const BaseLayout = ({ footer, main }: BaseLayoutProps) => {
    return (
        <>
            <Container px="3">{main}</Container>
            {footer}
        </>
    );
};
