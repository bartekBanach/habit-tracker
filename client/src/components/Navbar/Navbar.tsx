import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useContext } from 'react';
import { userContext } from '../../context/userContext';

const Navbar = () => {
  const { user } = useContext(userContext);
  return (
    <nav className={styles.navbar}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      {user && <span>Logged as {user.username}</span>}
    </nav>
  );
};

export default Navbar;
