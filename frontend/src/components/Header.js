import React, { useContext,useState,useEffect } from 'react';
import ProfileButton from './ProfileButton';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { AccountContext } from '../providers/AccountProvider';

function getInitials(fullName) {
    if (!fullName)return;
    const names = fullName.split(" ");
    let initials = "";
    for (let i = 0; i < 2; i++) {
      const name = names[i];
      if (name) {
        initials += name[0].toUpperCase();
      }
    }
    return initials;
  }

function Header() {
  const location = useLocation();
  const pathname = location.pathname.split('/')[2];

  const { user } = useContext(AccountContext);
 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="header flex space-between">
      <h3>{pathname.charAt(0).toUpperCase() + pathname.slice(1)}</h3>
      <div className="flex" style={{ gap: '16px' }}>
          <Button
            text="Add an appointement"
            width="200px"
            handleClick={() =>window.open('/booking/'+user.id,'_blank')}
          />
           
        <ProfileButton  text={getInitials(user.fullName)} />
      </div>
    </div>
  );
}

export default Header;