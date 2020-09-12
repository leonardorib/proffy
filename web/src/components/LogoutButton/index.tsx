import React, { useCallback } from 'react';
import logoutIcon from '../../assets/images/icons/logout.svg';
import { useHistory } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const history = useHistory();
  const handleLogout = useCallback(() => {
    localStorage.removeItem('proffy-token');
    history.push('/login');
  }, [history]);
  return (
    <button
      className='logout-button'
      type='button'
      style={{ background: 'none', textDecoration: 'none', border: 'none' }}
      onClick={handleLogout}
    >
      <img src={logoutIcon} alt='Sair' />
    </button>
  );
};

export default LogoutButton;
