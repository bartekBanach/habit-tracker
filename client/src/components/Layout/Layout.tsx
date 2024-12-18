import Navbar from '../Navbar/Navbar';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen  flex flex-col bg-gray-200">
      <Navbar />
      <main className="flex flex-col min-h-full h-full flex-grow bg-gray-100">
        {children}
      </main>
      <footer className="hidden md:block  bg-gray-700 text-white p-4 text-center font-semibold">
        Bartłomiej Banach@2024
      </footer>
    </div>
  );
};

export default Layout;
