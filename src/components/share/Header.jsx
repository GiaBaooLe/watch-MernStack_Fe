import { Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../pages/authContext';


const menuItems = [
  {
    key: '1',
    label: <Link to="/brand/manage-brand">Brand</Link>,
  },
  {
    key: '2',
    label: <Link to="/watch/manage-watch">Watch</Link>,
  },
  {
    key: '3',
    label: <Link to="/account/manage-account">Account</Link>,
  },
];


const menu = (
  <Menu items={menuItems} className='bg-zinc-800 text-white' />
);

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-zinc-800 w-full h-20 flex items-center justify-between px-6">
      <div className='flex space-x-12 justify-items-center'>
        <div className="text-2xl font-bold font-mono text-white">Watch Shop</div>
        <Link to="/">
          <div className="text-white p-1">Home</div>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex space-x-4">
          {user ? (
            <>
              <div className="text-white p-1">Welcome, <span className='font-semibold'>{user.membername}</span></div>
              <Link to="/profile">
                <Button className="bg-zinc-800 text-white">Profile</Button>
              </Link>
              {user.isAdmin && (
                <Dropdown overlay={menu}>
                  <Button className="bg-zinc-800 text-white">Manage</Button>
                </Dropdown>
              )}
              <Button onClick={logout} className='bg-zinc-800 text-white'>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button className='bg-zinc-800 text-white'>Register</Button>
              </Link>
              <Link to="/login">
                <Button className='bg-zinc-800 text-white'>Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
