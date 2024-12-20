import Navbar from '../Navbar/Navbar';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col min-h-full h-full flex-grow">
        {children}
      </main>
      {/*<footer className="hidden md:block p-4 text-center font-light text-xl text-gray-400">
        Bartłomiej Banach@2024
      </footer>*/}
    </div>
  );
};

export default Layout;
