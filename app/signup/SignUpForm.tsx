'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
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

  const router = useRouter();

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });
    console.log('Sign up response', response);
    router.push('/login');
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <p className="text-red-500 font-bold text-xs">
          {errors.username?.message}
        </p>
        <label className="block text-[15px] font-semibold" htmlFor="username">
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
        <label className="block text-[15px] font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
          id="password"
          type="password"
          {...register('password')}
        />
      </div>
      <div>
        <p className="text-red-500 font-bold text-xs">
          {errors.confirmPassword?.message}
        </p>
        <label
          className="block text-[15px] font-semibold"
          htmlFor="confirm-password"
        >
          Password Again
        </label>
        <input
          className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
          id="confirm-password"
          type="password"
          {...register('confirmPassword')}
        />
      </div>
      <button className="flex p-2 justify-center gap-2 items-center text-[19px] font-semibold rounded-[5px] w-[135px]  bg-primary  text-white cursor-pointer mt-2 hover:bg-[#00b755d6]">
        Sign up
      </button>
      <hr className="my-4" />
      <p>
        Already have an account?&nbsp;
        <Link className="text-primary underline hover:text-black" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
