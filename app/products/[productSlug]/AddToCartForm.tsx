'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CartIconButton from '../../../components/CartButtonIcon';
import { createOrUpdateCookie } from '../../../util/cookies';

type Props = {
  id: number;
};

// Defines the schema for the validation with zod
const formSchema = z.object({
  amount: z.coerce
    .number({ message: 'Please input a valid amount' })
    .min(1, { message: 'Please input a minimum amount of 1' }),
});

export default function AddToCartForm(props: Props) {
  // Defines the variables needed to intialise the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  /* Gets triggered when the "Add to cart" button is clicked. It adds the product with
  the inputted amount to the cart cookie if it is not in the cart yet.
  Otherwise it updates the amount stored in the cookie. */
  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    await createOrUpdateCookie(props.id, values.amount);
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex gap-2 justify-start"
      >
        {/* Shows the input field for the quantity and the "Add to cart" button */}
        <input
          id="inputamount"
          data-test-id="product-quantity"
          className="w-[46px] h-[43px] border rounded-[5px] text-center"
          defaultValue="1"
          {...register('amount')}
        />
        <button
          className="flex p-2 justify-center gap-2 items-center text-[13px] font-semibold rounded-[5px] bg-primary w-[130px] text-white cursor-pointer hover:bg-[#00b755d6]"
          data-test-id="product-add-to-cart"
        >
          <CartIconButton className="" /> Add to Cart
        </button>
      </form>
      {/* Shows an error message if updating the quantity has failed. */}
      <p className="text-red-500 font-bold mt-1">{errors.amount?.message}</p>
    </>
  );
}
