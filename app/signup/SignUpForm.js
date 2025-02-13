'use client';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log('Sign up response', response);
  }

  const router = useRouter();

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          required
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
          required
        />
      </div>
      <button>Sign Up</button>
      <button type="button" onClick={() => router.push('/login')}>
        Login
      </button>
    </form>
  );
}
