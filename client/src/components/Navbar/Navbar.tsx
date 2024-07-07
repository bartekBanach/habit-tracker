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
  let navlinks;
  let navlinksMobile;
  if (user) {
    navlinks = (
      <>
        <Link className="bg-white p-2 rounded-md shadow-md" to="/">
          Home
        </Link>
        <Link className="bg-white p-2 rounded-md shadow-md" to="/user">
          User
        </Link>
        <span>
          Logged as {user.email} id: {user._id}
        </span>
        <Button className="bg-red-500 text-white" onClick={handleLogout}>
          Logout
        </Button>
      </>
    );

    navlinksMobile = (
      <>
        <span className="bg-white text-center border p-4 w-full font-semibold">
          Logged as {user.email} id: {user._id}
        </span>
        <Link
          className="bg-white text-center border p-4 w-full"
          to="/"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          className="bg-white text-center border p-4 w-full"
          to="/user"
          onClick={() => setIsOpen(false)}
        >
          User
        </Link>
        <Button
          className="text-black bg-white w-full p-4"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </>
    );
  } else {
    navlinks = (
      <>
        <Link className="bg-white p-2 rounded-md shadow-md" to="/">
          Home
        </Link>
        <Link className="bg-white p-2 rounded-md shadow-md" to="/login">
          Login
        </Link>
        <Link className="bg-white p-2 rounded-md shadow-md" to="/register">
          Register
        </Link>
      </>
    );
    navlinksMobile = (
      <>
        <Link
          className="bg-white text-center border p-4 w-full"
          to="/"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <>
          <Link
            className="bg-white text-center border p-4 w-full"
            to="/login"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            className="bg-white text-center border p-4 w-full"
            onClick={() => setIsOpen(false)}
            to="/register"
          >
            Register
          </Link>
        </>
      </>
    );
  }

  return (
    <div className=" text-black bg-gray-300 w-full flex justify-between items-center px-4 py-4 sticky top-0 z-50">
      <Link to="/">
        <div className="bg-yellow-300 text-black rounded-md px-4 py-2 shadow-md">
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
          {navlinksMobile}
        </nav>
      )}

      <nav className="hidden md:flex gap-5 items-center">{navlinks}</nav>
    </div>
  );
};

export default Navbar;
