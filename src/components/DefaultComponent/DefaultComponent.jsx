
import PropTypes from 'prop-types';
import Header from '../share/Header';
import { useAuth } from '../../pages/authContext';

const DefaultComponent = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div>
      <Header user={user} onLogout={logout} />
      <main>{children}</main>
    </div>
  );
};

DefaultComponent.propTypes = {
  children: PropTypes.node, 
};

export default DefaultComponent;
