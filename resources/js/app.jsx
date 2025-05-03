import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

console.log('Starting Inertia App');

createInertiaApp({
    title: (title) => `${title} - ${import.meta.env.VITE_APP_NAME}`,
    resolve: (name) => {
        console.log('Resolving component:', name);
        return resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));
    },
    setup: ({ el, App, props }) => {
        console.log('Setting up Inertia:', { el, App, props });
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});
