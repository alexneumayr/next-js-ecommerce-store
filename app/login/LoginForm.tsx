'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginForm() {
  const router = useRouter();
  const [loginFailed, setLoginFailed] = useState(false);

  const formSchema = z.object({
    username: z.string().min(1, { message: 'Please input a username' }),
    password: z.string().min(1, { message: 'Please input a password' }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    const response = await signIn('credentials', {
      username: values.username,
      password: values.password,
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
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <p className="error">{errors.username?.message}</p>
          <label htmlFor="username">Username</label>
          <input id="username" {...register('username')} />
        </div>
        <div>
          <p className="error">{errors.password?.message}</p>
          <label htmlFor="password-password">Password</label>
          <input id="password" type="password" {...register('password')} />
        </div>
        <button>Login</button>
        <button type="button" onClick={() => router.push('/signup')}>
          Sign Up
        </button>
      </form>
    </>
  );
}
