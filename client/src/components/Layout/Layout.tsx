import Navbar from '../Navbar/Navbar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.content}>
        {children} {/* This will render the child components */}
      </main>
      <footer>{/* Your footer content goes here */}</footer>
    </div>
  );
};

export default Layout;
