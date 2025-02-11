'use client';
import { getServerSession } from 'next-auth';
import { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log('Register response', response);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="password-password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </div>
      <button>Register</button>
    </form>
  );
}
