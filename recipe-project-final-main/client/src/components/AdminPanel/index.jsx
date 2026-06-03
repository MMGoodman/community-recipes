import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DataContext from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import style from './style.module.css';

function AdminPanel() {
  const { curentUser, isLoading } = useContext(DataContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isLoading) return;
    if (!curentUser?.admin) {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [curentUser, isLoading]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/all-users`);
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const setRole = async (userId, role, name) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/user/${userId}/set-role`, { role });
      const roleLabel = role === 'admin' ? 'מנהל' : role === 'editor' ? 'עורך' : 'משתמש';
      setMessage(`✅ ${name} עודכן ל${roleLabel}`);
      setTimeout(() => setMessage(''), 3000);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage('❌ שגיאה בעדכון');
    }
  };

  const getRole = (user) => {
    if (user.admin) return 'admin';
    if (user.editor) return 'editor';
    return 'user';
  };

  const adminCount = users.filter(u => u.admin).length;
  const editorCount = users.filter(u => u.editor && !u.admin).length;
  const userCount = users.filter(u => !u.admin && !u.editor).length;

  if (loading) return <div className={style.loading}>טוען...</div>;

  return (
    <div className={style.container}>
      <Link to="/" className={style.backLink}>חזרה</Link>
      <h1 className={style.title}>לוח ניהול</h1>

      {message && <div className={style.message}>{message}</div>}

      <div className={style.stats}>
        <div className={style.statCard}>
          <span className={style.statNumber}>{users.length}</span>
          <span className={style.statLabel}>סה"כ משתמשים</span>
        </div>
        <div className={`${style.statCard} ${style.statAdmin}`}>
          <span className={style.statNumber}>{adminCount}</span>
          <span className={style.statLabel}>מנהלים</span>
        </div>
        <div className={`${style.statCard} ${style.statEditor}`}>
          <span className={style.statNumber}>{editorCount}</span>
          <span className={style.statLabel}>עורכים</span>
        </div>
        <div className={`${style.statCard} ${style.statUser}`}>
          <span className={style.statNumber}>{userCount}</span>
          <span className={style.statLabel}>משתמשים רגילים</span>
        </div>
      </div>

      <div className={style.quickLinks}>
        <Link to="/deleteRecipe" className={style.quickLink}>
          📋 מתכונים לאישור
        </Link>
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>שם</th>
              <th>אימייל</th>
              <th>תפקיד</th>
              <th>שינוי הרשאה</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const role = getRole(user);
              const fullName = `${user.fName} ${user.lName}`;
              const isSelf = user._id === curentUser?._id;
              return (
                <tr key={user._id} className={isSelf ? style.selfRow : ''}>
                  <td>{fullName} {isSelf && <span className={style.youTag}>אתה</span>}</td>
                  <td className={style.email}>{user.email}</td>
                  <td>
                    <span className={`${style.badge} ${style[role]}`}>
                      {role === 'admin' ? 'מנהל' : role === 'editor' ? 'עורך' : 'משתמש'}
                    </span>
                  </td>
                  <td className={style.actions}>
                    {!isSelf && (
                      <>
                        {role !== 'admin' && (
                          <button
                            className={`${style.btn} ${style.btnAdmin}`}
                            onClick={() => setRole(user._id, 'admin', fullName)}
                          >
                            הפוך למנהל
                          </button>
                        )}
                        {role !== 'editor' && (
                          <button
                            className={`${style.btn} ${style.btnEditor}`}
                            onClick={() => setRole(user._id, 'editor', fullName)}
                          >
                            הפוך לעורך
                          </button>
                        )}
                        {role !== 'user' && (
                          <button
                            className={`${style.btn} ${style.btnUser}`}
                            onClick={() => setRole(user._id, 'user', fullName)}
                          >
                            הסר הרשאה
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
