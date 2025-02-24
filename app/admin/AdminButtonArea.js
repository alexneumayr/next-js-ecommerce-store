'use client';
import { useRouter } from 'next/navigation';
import AddButtonIcon from '../../components/AddButtonIcon';
import EditButtonIcon from '../../components/EditButtonIcon';

export default function AdminButtonArea() {
  const router = useRouter();

  return (
    <div>
      <button
        className="flex p-2 justify-start gap-2 items-center text-[19px] font-semibold rounded-[5px] bg-[#434343]  text-white cursor-pointer mt-2 hover:bg-black w-[292px]"
        onClick={() => router.push('/admin/addproduct')}
      >
        <AddButtonIcon className="w-[60px]" />
        Add new products
      </button>
      <button
        className="flex p-2 justify-start gap-2 items-center text-[19px] font-semibold rounded-[5px] bg-[#434343]  text-white cursor-pointer mt-2 hover:bg-black w-[292px]"
        onClick={() => router.push('/admin/products')}
      >
        <EditButtonIcon className="w-[60px]" />
        Edit existing products
      </button>
    </div>
  );
}
