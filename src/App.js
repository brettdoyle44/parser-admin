import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import Routes from './Routes';
import { NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    props.history.push('/');
  }

  return (
    !isAuthenticating && (
      <div>
        {isAuthenticated && <NavItem onClick={handleLogout}>Logout</NavItem>}
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </div>
    )
  );
}

export default withRouter(App);
