import React, { useContext, useEffect, useState } from 'react';
import api from './api';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { username, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadPosts = async () => {
    try {
      const response = await api.get('/api/posts/');
      setPosts(response.data);
    } catch (err) {
      setError('Ошибка загрузки постов.');
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingPostId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingPostId) {
        await api.put(`/api/posts/${editingPostId}/`, {
          title,
          content,
        });
      } else {
        await api.post('/api/posts/', {
          title,
          content,
        });
      }
      await loadPosts();
      resetForm();
    } catch (err) {
      setError('Ошибка сохранения поста.');
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleDelete = async (id) => {
    setError(null);
    try {
      await api.delete(`/api/posts/${id}/`);
      await loadPosts();
    } catch (err) {
      setError('Ошибка удаления поста.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Личный кабинет</h2>
        <div>
          <span style={{ marginRight: '15px' }}>Вы вошли как: {username}</span>
          <button onClick={handleLogout}>Выход</button>
        </div>
      </div>

      <section style={{ marginBottom: '30px' }}>
        <h3>{editingPostId ? 'Редактирование поста' : 'Новый пост'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Заголовок:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '5px' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Текст:
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                style={{ width: '100%', padding: '5px' }}
              />
            </label>
          </div>
          <div>
            <button type="submit" style={{ padding: '8px 16px', marginRight: '10px' }}>
              {editingPostId ? 'Сохранить изменения' : 'Добавить пост'}
            </button>
            {editingPostId && (
              <button
                type="button"
                onClick={resetForm}
                style={{ padding: '8px 16px' }}
              >
                Отмена
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h3>Список постов</h3>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {posts.length === 0 ? (
          <p>Постов пока нет.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map((post) => (
              <li
                key={post.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '4px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: 0 }}>{post.title}</h4>
                  <span style={{ fontSize: '0.9em', color: '#555' }}>
                    Автор: {post.author_username}
                  </span>
                </div>
                <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
                <div style={{ fontSize: '0.8em', color: '#777' }}>
                  Создан: {new Date(post.created_at).toLocaleString()}
                </div>
                {post.author_username === username && (
                  <div style={{ marginTop: '10px' }}>
                    <button
                      onClick={() => handleEdit(post)}
                      style={{ marginRight: '10px' }}
                    >
                      Редактировать
                    </button>
                    <button onClick={() => handleDelete(post.id)}>Удалить</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
