'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
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
  } = useForm({
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
          <p className="text-red-500 font-bold text-xs">
            {errors.username?.message}
          </p>
          <label htmlFor="username" className="block text-[15px] font-semibold">
            Username
          </label>
          <input
            className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
            id="username"
            {...register('username')}
          />
        </div>
        <div>
          <p className="text-red-500 font-bold text-xs">
            {errors.password?.message}
          </p>
          <label
            htmlFor="password-password"
            className="block text-[15px] font-semibold"
          >
            Password
          </label>
          <input
            className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
            id="password"
            type="password"
            {...register('password')}
          />
        </div>
        <button className="flex p-2 justify-center gap-2 items-center text-[19px] font-semibold rounded-[5px] w-[135px]  bg-primary  text-white cursor-pointer mt-2 hover:bg-[#00b755d6]">
          Login
        </button>
        <hr className="my-4" />
        <p>
          Don't have an account?&nbsp;
          <Link
            className="text-primary underline hover:text-black"
            href="/signup"
          >
            Signup
          </Link>
        </p>
      </form>
    </>
  );
}
