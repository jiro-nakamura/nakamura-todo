import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

function Todo({ todos = [] }) {
    console.log('Todos:', todos); // デバッグ用
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', { title }); // デバッグ用
        Inertia.post('/todos', { title });
        setTitle('');
    };

    return (
        <div>
            <h1>Todo App</h1>
            <p>Todos length: {todos.length}</p> {/* デバッグ用 */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="新しいタスク"
                />
                <button type="submit">追加</button>
            </form>
            {todos.length === 0 ? (
                <p>タスクがありません</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            {todo.title} {todo.is_completed ? '(完了)' : ''}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

  export default Todo;
