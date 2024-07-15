import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../../features/auth/authSlice';
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import Button from '../Button/Button';
import { resetApiState } from '../../app/api/apiSlice';
import { GiHamburgerMenu } from 'react-icons/gi';
import IconButton from '../IconButton/IconButton';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface NavLink {
  id: number;
  text: string;
  to?: string;
  type: 'link' | 'button' | 'span';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [logout] = useLogoutMutation();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsOpen(false);
    try {
      await logout({});
      dispatch(clearCredentials());
      dispatch(resetApiState());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const authLinks: NavLink[] = [
    { id: 0, text: 'Home', to: '/', type: 'link' },
    { id: 1, text: 'User', to: '/user', type: 'link' },
    { id: 2, text: `Logged as ${user?.email}`, type: 'span' },
    { id: 3, text: 'Logout', type: 'button', onClick: handleLogout },
  ];

  const unauthLinks: NavLink[] = [
    { id: 0, text: 'Home', to: '/', type: 'link' },
    { id: 1, text: 'Login', to: '/login', type: 'link' },
    { id: 2, text: 'Register', to: '/register', type: 'link' },
  ];

  const renderLinks = (links: NavLink[], isMobile = false) => {
    return links.map((link, index) => {
      if (link.type === 'link' && link.to) {
        return (
          <Link
            key={index}
            className={`bg-white ${isMobile ? 'text-center border p-4 w-full' : 'p-2 rounded-md shadow-md'}`}
            to={link.to}
            onClick={() => isMobile && setIsOpen(false)}
          >
            {link.text}
          </Link>
        );
      }
      if (link.type === 'button') {
        return (
          <Button
            key={index}
            className={`bg-red-500 text-white ${isMobile ? 'w-full p-4' : ''}`}
            onClick={link.onClick}
          >
            {link.text}
          </Button>
        );
      }
      if (link.type === 'span') {
        return (
          <span
            key={index}
            className={`${isMobile ? 'text-center border p-4 w-full font-semibold' : 'font-semibold'}`}
          >
            {link.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <div className=" text-black bg-cyan-300 shadow-md w-full flex justify-between items-center px-4 py-4 sticky top-0 z-50">
      <Link to="/">
        <div className="bg-orange-500 text-white rounded-md px-4 py-2 font-semibold">
          <h1 className=" text-3xl">habitTracker</h1>
        </div>
      </Link>

      <IconButton
        className="md:hidden"
        iconSize="large"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {!isOpen ? <GiHamburgerMenu /> : <IoCloseOutline />}
      </IconButton>
      {isOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full h-screen bg-white flex flex-col items-center">
          {user ? renderLinks(authLinks, true) : renderLinks(unauthLinks, true)}
        </nav>
      )}

      <nav className="hidden md:flex gap-5 items-center">
        {user ? renderLinks(authLinks, false) : renderLinks(unauthLinks, false)}
      </nav>
    </div>
  );
};

export default Navbar;
