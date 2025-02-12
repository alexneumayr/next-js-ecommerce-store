'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false,
    });
    if (!response?.error) {
      router.push('/');
      router.refresh();
    } else {
      setLoginFailed(true);
    }
  }

  return (
    <>
      {loginFailed && (
        <p style={{ color: 'red' }}>
          Login failed. Please check username and password.
        </p>
      )}
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
        <button>Login</button>
        <button type="button" onClick={() => router.push('/signup')}>
          Sign Up
        </button>
      </form>
    </>
  );
}
