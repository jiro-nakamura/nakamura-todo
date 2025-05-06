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
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/sanctum/csrf-cookie').then(() => {
            if (token) {
                console.log('Token set:', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                fetchTodos();
            }
        }).catch(error => {
            console.error('CSRF fetch error:', error);
            setMessage('認証の初期化に失敗しました。');
        });
    }, [token]);

    const fetchTodos = async () => {
        try {
            console.log('Fetching todos with token:', token);
            const res = await axios.get('/api/todos');
            setTodos(res.data);
        } catch (error) {
            console.error('Error fetching todos:', error.response?.data);
            setMessage('Todo の取得に失敗しました。');
        }
    };

    const handleAuth = async () => {
        try {
            setMessage('');
            if (isLogin) {
                if (!email || !password) {
                    setMessage('メールアドレスとパスワードを入力してください。');
                    return;
                }
            } else {
                if (!name || !email || !password) {
                    setMessage('名前、メールアドレス、パスワードを入力してください。');
                    return;
                }
            }
            console.log('Auth attempt:', { isLogin, email, name });
            const endpoint = isLogin ? '/login' : '/register';
            const data = isLogin
                ? { email, password }
                : { name, email, password, password_confirmation: password };
            const res = await axios.post(`/api${endpoint}`, data);
            const newToken = res.data.token;
            console.log('Auth success, new token:', newToken);
            setToken(newToken);
            localStorage.setItem('token', newToken);
            setName('');
            setEmail('');
            setPassword('');
            if (!isLogin) {
                setMessage('登録が完了しました！ログインしてください。');
                setIsLogin(true);
            }
        } catch (error) {
            console.error('Auth error:', error.response?.data);
            const errorMsg = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join(' ')
                : '認証に失敗しました。';
            setMessage(errorMsg);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            setToken('');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setTodos([]);
        } catch (error) {
            console.error('Logout error:', error);
            setMessage('ログアウトに失敗しました。');
        }
    };

    const handleSubmit = async () => {
        try {
            setMessage('');
            if (!title) {
                setMessage('タイトルを入力してください。');
                return;
            }
            console.log('Submitting todo:', { title, dueDate, description });
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
            console.error('Error adding todo:', error.response?.data);
            setMessage('Todo の追加に失敗しました。');
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
            setMessage('');
            if (!editTitle) {
                setMessage('タイトルを入力してください。');
                return;
            }
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
            console.error('Error updating todo:', error.response?.data);
            setMessage('Todo の更新に失敗しました。');
        }
    };

    const handleDelete = async (id) => {
        try {
            setMessage('');
            await axios.delete(`/api/todos/${id}`);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error.response?.data);
            setMessage('Todo の削除に失敗しました。');
            fetchTodos();
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '期限なし';
        try {
            return format(parseISO(dateStr), 'yyyy年MM月dd日HH時mm分ss秒');
        } catch {
            return dateStr;
        }
    };

    if (!token) {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                    Nakamura ToDo - {isLogin ? 'ログイン' : '登録'}
                </h1>
                {message && (
                    <div
                        style={{
                            color: message.includes('失敗') ? 'red' : 'green',
                            marginBottom: '10px',
                        }}
                    >
                        {message}
                    </div>
                )}
                {!isLogin && (
                    <input
                        style={{
                            border: '1px solid #ccc',
                            padding: '8px',
                            marginBottom: '10px',
                            width: '100%',
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="名前"
                    />
                )}
                <input
                    style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        marginBottom: '10px',
                        width: '100%',
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレス"
                    onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                />
                <input
                    style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        marginBottom: '10px',
                        width: '100%',
                    }}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                    onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                />
                <button
                    style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '8px 16px',
                        marginBottom: '10px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={handleAuth}
                >
                    {isLogin ? 'ログイン' : '登録'}
                </button>
                <button
                    style={{
                        color: '#3b82f6',
                        textDecoration: 'underline',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setMessage('');
                    }}
                >
                    {isLogin ? '登録する' : 'ログインする'}
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                Nakamura ToDo
            </h1>
            {message && (
                <div
                    style={{
                        color: message.includes('失敗') ? 'red' : 'green',
                        marginBottom: '10px',
                    }}
                >
                    {message}
                </div>
            )}
            <button
                style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '8px 16px',
                    marginBottom: '20px',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={handleLogout}
            >
                ログアウト
            </button>
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