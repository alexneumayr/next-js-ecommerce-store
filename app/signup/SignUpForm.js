'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignUpForm() {
  const formSchema = z
    .object({
      username: z.string().min(1, { message: 'Please input a username' }),
      password: z
        .string()
        .min(1, { message: 'Please input a password' })
        .regex(/^(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/, {
          message:
            'Password must be at least 8 characters long and include a number and a special character',
        }),
      confirmPassword: z
        .string()
        .min(1, { message: 'Please confirm your password' }),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  async function handleFormSubmit(data) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    console.log('Sign up response', response);
  }

  const router = useRouter();

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <p className="error">{errors.username?.message}</p>
        <label htmlFor="username">Username</label>
        <input id="username" {...register('username')} />
      </div>
      <div>
        <p className="error">{errors.password?.message}</p>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
      </div>
      <div>
        <p className="error">{errors.confirmPassword?.message}</p>
        <label htmlFor="confirm-password">Password Again</label>
        <input
          id="confirm-password"
          type="password"
          {...register('confirmPassword')}
        />
      </div>
      <button>Sign Up</button>
      <button type="button" onClick={() => router.push('/login')}>
        Login
      </button>
    </form>
  );
}
