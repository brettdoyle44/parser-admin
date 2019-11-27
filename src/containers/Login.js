import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
      props.history.push('/home');
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button
          block
          isLoading={isLoading}
          disabled={!validateForm()}
          type="submit"
        >
          {!isLoading ? 'Login' : 'Logging in...'}
        </Button>
      </form>
    </div>
  );
}
