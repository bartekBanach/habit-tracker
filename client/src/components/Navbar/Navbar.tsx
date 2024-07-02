import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../../features/auth/authSlice';
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import Button from '../Button/Button';
import { resetApiState } from '../../app/api/apiSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [logout] = useLogoutMutation();

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await logout({});
      dispatch(clearCredentials());
      dispatch(resetApiState());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="text-black bg-gray-300 flex justify-between items-center px-4 py-4 sticky top-0 z-50">
      <Link to="/">
        <div className="bg-yellow-300 text-black rounded-md px-4 py-2 shadow-md">
          <h1 className=" text-3xl">habitTracker</h1>
        </div>
      </Link>

      <div className="flex gap-5 items-center">
        <Link className="bg-white p-2 rounded-md shadow-md" to="/">
          Home
        </Link>
        <Link className="bg-white p-2 rounded-md shadow-md" to="/user">
          User
        </Link>
        <Link className="bg-white p-2 rounded-md shadow-md" to="/login">
          Login
        </Link>
        <Link className="bg-white p-2 rounded-md shadow-md" to="/register">
          Register
        </Link>
        {token && (
          <div>
            <span>
              Logged as {user.email} id: {user._id}
            </span>
            <Button className="bg-red-500 text-white" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
