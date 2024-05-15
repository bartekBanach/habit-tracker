import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-200">
      <Navbar />

      <main className="bg-white">{children}</main>
      <footer>Bartłomiej Banach@2024</footer>
    </div>
  );
};

export default Layout;
