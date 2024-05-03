import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../../features/auth/authSlice';
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [logout] = useLogoutMutation();

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log('hello wolrd');
    e.preventDefault();
    try {
      await logout();
      dispatch(clearCredentials());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className={styles.navbar}>
      <Link to="/">Home</Link>
      <Link to="/user">User</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      {token && (
        <div>
          <span>Logged as {user.email}</span>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
