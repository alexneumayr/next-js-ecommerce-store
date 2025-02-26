'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignUpForm() {
  const [signupFailed, setSignupFailed] = useState(false);

  // Defines the schema for the validation with zod
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

  // Defines the variables needed to intialise the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  /* When the "Sign up" button is clicked it calls the API function to create a new account
  and redirects to the Login page on success. */
  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });
    if (response.ok) {
      router.push('/login');
    } else {
      setSignupFailed(true);
    }
  }

  return (
    <>
      {/* Shows an error message if the signup has failed */}
      {signupFailed && (
        <p className="text-[15px] text-red-500 font-bold">
          Signup failed. Please try again with different values.
        </p>
      )}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Shows a form with input fields for username, password and
      password confirmation and a "Sign up" button */}
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
        {/* Shows the user what to do if he already has an account. */}
        <p>
          Already have an account?&nbsp;
          <Link
            className="text-primary underline hover:text-black dark:hover:text-[#00b755d6]"
            href="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
