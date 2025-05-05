import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get('/api/todos')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Todo取得エラー:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/todos', {
                title,
                due_date: dueDate,
                description,
            });
            setTodos([...todos, response.data]);
            setTitle('');
            setDueDate('');
            setDescription('');
        } catch (error) {
            console.error('Todo作成エラー:', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Nakamura ToDo</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', color: '#4a5568' }}>タイトル</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', color: '#4a5568' }}>期限</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        style={{ width: '100%', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', color: '#4a5568' }}>説明</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Todo追加
                </button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        style={{ marginBottom: '0.5rem', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    >
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;