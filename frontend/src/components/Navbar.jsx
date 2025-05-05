import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../redux/api/user/userApiSlice';
import { logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userLogout] = useLogoutMutation();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await userLogout();
      dispatch(logout());
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || 'Logout failed');
    }
  };

  // Utility: Get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.trim().split(' ');
    return names.length > 1
      ? names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase()
      : names[0][0].toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <NavLink to="/" className="navbar-brand">ELM</NavLink>

        <ul className="navbar-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/courses" className={({ isActive }) => isActive ? 'active' : ''}>Courses</NavLink></li>
          <li><NavLink to="/progress" className={({ isActive }) => isActive ? 'active' : ''}>Progression Graph</NavLink></li>
          <li><NavLink to="/leaderboard" className={({ isActive }) => isActive ? 'active' : ''}>Leaderboard</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
        </ul>

        <div className="navbar-end">
          {userInfo ? (
            <div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-lg">
                    {getInitials(userInfo.name)}
                  </div>
                </div>

                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow bg-black text-white">
                  {userInfo.isAdmin ? (
                    <>
                      <li className='hover:bg-red-500 hover:scale-95 ease-in-out duration-300 rounded-md'><Link to="/admin/create-questions">Create Questions</Link></li>
                      <li className='hover:bg-red-500 hover:scale-95 ease-in-out duration-300 rounded-md'><Link to="/admin/userlist">UserList</Link></li>
                      <li className='hover:bg-red-500 hover:scale-95 ease-in-out duration-300 rounded-md'><Link to="/admin/manage-questions">Manage Questions</Link></li>
                      <li className='hover:bg-red-500 hover:scale-95 ease-in-out duration-300 rounded-md'><button onClick={logoutHandler}>Logout</button></li>
                    </>
                  ) : (
                    <>
                      <li className='hover:bg-red-500 hover:scale-95 ease-in-out duration-300 rounded-md'><button onClick={logoutHandler}>Logout</button></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className="login-signup-container gap-3">
              <NavLink to="/login">
                <button className="login-button">Login</button>
              </NavLink>
              <NavLink to="/signup">
                <button className="signup-button">Sign Up</button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
