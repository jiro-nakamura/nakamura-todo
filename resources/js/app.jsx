import React from 'react';
import { createRoot } from 'react-dom/client';
import Todo from './Pages/Todo';

const root = createRoot(document.getElementById('app'));
root.render(<Todo />);