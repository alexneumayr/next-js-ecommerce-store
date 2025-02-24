'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CartIconButton from '../../../components/CartIconButton';
import { createOrUpdateCookie } from '../../../util/cookies';

type Props = {
  id: number;
};

const formSchema = z.object({
  amount: z.coerce
    .number({ message: 'Please input a valid amount' })
    .min(1, { message: 'Please input a minimum amount of 1' }),
});

export default function AddToCartForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await createOrUpdateCookie(props.id, values.amount);
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex gap-2 justify-start"
      >
        <input
          id="inputamount"
          data-test-id="product-quantity"
          className="w-[46px] h-[43px] border rounded-[5px] text-center"
          defaultValue="1"
          {...register('amount')}
        />
        <button className="flex p-2 justify-center gap-2 items-center text-[13px] font-semibold rounded-[5px] bg-primary w-[130px] text-white cursor-pointer hover:bg-[#00b755d6]">
          <CartIconButton className="" /> Add to Cart
        </button>
      </form>
      <p className="text-red-500 font-bold mt-1">{errors.amount?.message}</p>
    </>
  );
}
