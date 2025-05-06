import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDueDate, setEditDueDate] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editIsCompleted, setEditIsCompleted] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get('/api/todos');
            setTodos(res.data);
        } catch (error) {
            console.error('Error fetching todos:', error.response?.data || error.message);
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.post('/api/todos', {
                title,
                due_date: dueDate,
                description,
            });
            setTitle('');
            setDueDate('');
            setDescription('');
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error.response?.data || error.message);
        }
    };

    const handleEdit = (todo) => {
        setEditId(todo.id);
        setEditTitle(todo.title);
        setEditDueDate(todo.due_date ? format(parseISO(todo.due_date), 'yyyy-MM-dd HH:mm:ss') : '');
        setEditDescription(todo.description || '');
        setEditIsCompleted(todo.is_completed);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/api/todos/${editId}`, {
                title: editTitle,
                due_date: editDueDate || null,
                description: editDescription || null,
                is_completed: editIsCompleted,
            });
            console.log('Update response:', response.data);
            setEditId(null);
            setEditTitle('');
            setEditDueDate('');
            setEditDescription('');
            setEditIsCompleted(false);
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error.response?.data || error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/todos/${id}`);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error.response?.data || error.message);
            fetchTodos();
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '期限なし';
        try {
            return format(parseISO(dateStr), "yyyy年MM月dd日HH時mm分ss秒");
        } catch {
            return dateStr;
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                Nakamura ToDo
            </h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        marginRight: '10px',
                        width: '200px',
                    }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="タイトル"
                />
                <input
                    style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        marginRight: '10px',
                        width: '200px',
                    }}
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <textarea
                    style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        marginRight: '10px',
                        width: '200px',
                        height: '60px',
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="説明"
                />
                <button
                    style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={handleSubmit}
                >
                    Todo追加
                </button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ marginBottom: '10px' }}>
                        {editId === todo.id ? (
                            <div>
                                <input
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                        marginRight: '10px',
                                        width: '200px',
                                    }}
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <input
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                        marginRight: '10px',
                                        width: '200px',
                                    }}
                                    type="datetime-local"
                                    value={editDueDate}
                                    onChange={(e) => setEditDueDate(e.target.value)}
                                />
                                <textarea
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                        marginRight: '10px',
                                        width: '200px',
                                        height: '60px',
                                    }}
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                                <input
                                    type="checkbox"
                                    checked={editIsCompleted}
                                    onChange={(e) => setEditIsCompleted(e.target.checked)}
                                />
                                <button
                                    style={{
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        padding: '8px 16px',
                                        marginRight: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleUpdate}
                                >
                                    更新
                                </button>
                                <button
                                    style={{
                                        backgroundColor: '#6b7280',
                                        color: 'white',
                                        padding: '8px 16px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setEditId(null)}
                                >
                                    キャンセル
                                </button>
                            </div>
                        ) : (
                            <div>
                                {todo.title} - {formatDate(todo.due_date)} -{' '}
                                {todo.description || '説明なし'} -{' '}
                                {todo.is_completed ? '完了' : '未完了'} -{' '}
                                作成: {formatDate(todo.created_at)} -{' '}
                                更新: {formatDate(todo.updated_at)}
                                <button
                                    style={{
                                        backgroundColor: '#f59e0b',
                                        color: 'white',
                                        padding: '8px 16px',
                                        marginLeft: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleEdit(todo)}
                                >
                                    編集
                                </button>
                                <button
                                    style={{
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        padding: '8px 16px',
                                        marginLeft: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleDelete(todo.id)}
                                >
                                    削除
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;