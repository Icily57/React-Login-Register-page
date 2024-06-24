import React, { useState } from 'react';
import LoginForm from './Components/loginForm';
import RegisterForm from './Components/registerForm';

const App: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  return (
    <div>
      <h1>My App</h1>
      {isRegistering ? (
        <RegisterForm />
      ) : (
        <LoginForm />
      )}
      <p onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </p>
    </div>
  );
};

export default App;
