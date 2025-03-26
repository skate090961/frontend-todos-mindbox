import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import App from './app/app';
import './app/styles/index.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Theme accentColor="green" appearance="dark">
            <App />
        </Theme>
    </StrictMode>,
);
