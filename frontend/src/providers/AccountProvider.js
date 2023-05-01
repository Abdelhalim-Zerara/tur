import React, { useEffect, useState } from 'react';
import Account from '../components/Account';
import { useNavigate } from 'react-router-dom';

export const AccountContext = React.createContext();

function AccountProvider() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token =  localStorage.getItem('turToken');
    console.log(token);
      fetch('/api/users/me', {
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setUser(data)
            if(!data.id) {
                navigate("/");
            }
        });

  }, [navigate]);

  
  return (
    <AccountContext.Provider value={{ user }}>
      <Account />
    </AccountContext.Provider>
  );
}

export default AccountProvider;