'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false,
    });
    console.log('Response Login', response);
    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
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
      <button>Login</button>
    </form>
  );
}
