import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <main className="flex-grow bg-white">{children}</main>
      <footer className="hidden md:block bg-gray-800 text-white p-4 text-center">
        Bartłomiej Banach@2024
      </footer>
    </div>
  );
};

export default Layout;
