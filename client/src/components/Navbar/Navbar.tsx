import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <nav className={styles.navbar}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      {user && <span>Logged as {user}</span>}
    </nav>
  );
};

export default Navbar;
