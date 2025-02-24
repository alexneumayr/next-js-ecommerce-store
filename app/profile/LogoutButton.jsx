'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ className }) {
  const router = useRouter();

  return (
    <button
      className={
        className +
        ' flex p-2 justify-center gap-2 items-center text-[19px] font-semibold rounded-[5px] w-[135px]  bg-primary  text-white cursor-pointer mt-2 hover:bg-[#00b755d6]'
      }
      onClick={() => router.push('/logout')}
    >
      Logout
    </button>
  );
}
