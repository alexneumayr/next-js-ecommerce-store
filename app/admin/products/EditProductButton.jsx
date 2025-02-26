'use client';
import { useRouter } from 'next/navigation';
import EditButtonIcon from '../../../components/EditButtonIcon';

export default function EditProductButton({ slug }) {
  const router = useRouter();
  /* Returns an "Edit" button that redirects to "products/<slug>" when clicked */
  return (
    <button
      className="flex p-2 justify-start items-center text-[13px] font-semibold rounded-[5px] bg-[#434343] w-[130px] text-white cursor-pointer hover:bg-black dark:hover:bg-[#00b755d6]"
      onClick={() => router.push(`products/${slug}`)}
    >
      <EditButtonIcon className="w-[60px]" /> Edit
    </button>
  );
}
