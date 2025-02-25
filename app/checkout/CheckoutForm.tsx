'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { removeCookie } from '../../util/cookies';

type Props = {
  total: number;
};

export default function CheckoutForm(props: Props) {
  const router = useRouter();

  // Creates the schema for the checkout form for the validation with zod
  const formSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: 'Please input a first name' })
      .regex(/^\D+$/, { message: 'Please input a correct first name.' }),
    lastName: z
      .string()
      .min(1, { message: 'Please input a last name' })
      .regex(/^\D+$/, { message: 'Please input a correct last name.' }),
    email: z
      .string()
      .min(1, { message: 'Please input an email address' })
      .email({ message: 'Please input a correct email address' }),
    address: z.string().min(1, { message: 'Please input an address' }),
    postalCode: z.string().min(1, { message: 'Please input a postal code' }),
    city: z
      .string()
      .min(1, { message: 'Please input a city name' })
      .regex(/^\D+$/, { message: 'Please input a correct city name' }),
    country: z
      .string()
      .min(1, { message: 'Please input a country name' })
      .regex(/^\D+$/, { message: 'Please input a correct country name' }),
    creditcardName: z
      .string()
      .min(1, { message: 'Please input the correct name' })
      .regex(/^\D+$/, { message: 'Please input a correct first name.' }),
    creditcardNumber: z
      .string()
      .min(1, { message: 'Please input a credit card number' })
      .regex(/^\d{13,19}$/, {
        message: 'Please input a correct credit card number',
      }),
    expirationDate: z
      .string()
      .min(1, { message: 'Please input the expiration date' })
      .regex(/^\d{2}\/\d{2}$/, {
        message: 'Please input the correct expiration date (MM/YY)',
      }),
    securityCode: z
      .string()
      .min(1, { message: 'Please input the security code' })
      .regex(/^\d{3,4}$/, {
        message: 'Please input the correct security code',
      }),
  });

  // Defines the variables needed to intialise the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  // Removes the cookie and redirects to "/thankyou" when the "Buy now" button is clicked
  async function handleFormSubmit() {
    await removeCookie();
    router.push('/thankyou');
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex mx-10 my-5 justify-around gap-4"
    >
      <div className="flex-1 max-w-[500px] min-w-[300px]">
        {/* Contains all input field on the left side */}
        <div className="flex gap-2">
          <div className="flex-1 flex flex-col">
            <p className="text-red-500 font-bold text-xs">
              {errors.firstName?.message}
            </p>
            <label
              className="text-[15px] font-semibold block mt-auto"
              htmlFor="first-name-input"
            >
              First name:
            </label>
            <input
              className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
              id="first-name-input"
              {...register('firstName')}
              data-test-id="checkout-first-name"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <p className="text-red-500 font-bold text-xs">
              {errors.lastName?.message}
            </p>
            <label
              className="text-[15px] font-semibold block mt-auto"
              htmlFor="last-name-input"
            >
              Last name:
            </label>
            <input
              className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
              id="last-name-input"
              {...register('lastName')}
              data-test-id="checkout-last-name"
            />
          </div>
        </div>
        <div>
          <p className="text-red-500 font-bold text-xs">
            {errors.email?.message}
          </p>
          <label
            className="text-[15px] font-semibold block"
            htmlFor="email-input"
          >
            Email:
          </label>
          <input
            className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
            id="email-input"
            type="email"
            {...register('email')}
            data-test-id="checkout-email"
          />
        </div>
        <div>
          <p className="text-red-500 font-bold text-xs">
            {errors.address?.message}
          </p>
          <label
            className="text-[15px] font-semibold block"
            htmlFor="address-input"
          >
            Address:
          </label>
          <input
            className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
            id="address-input"
            {...register('address')}
            data-test-id="checkout-address"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex flex-col">
            <p className="text-red-500 font-bold text-xs mt-auto">
              {errors.postalCode?.message}
            </p>
            <label
              className="text-[15px] font-semibold block"
              htmlFor="postal-code-input"
            >
              Postal code:
            </label>
            <input
              className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
              id="postal-code-input"
              {...register('postalCode')}
              data-test-id="checkout-postal-code"
            />
          </div>
          <div className="flex-2 flex flex-col">
            <p className="text-red-500 font-bold text-xs mt-auto">
              {errors.city?.message}
            </p>
            <label
              className="text-[15px] font-semibold block"
              htmlFor="city-input"
            >
              City:
            </label>
            <input
              className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
              id="city-input"
              {...register('city')}
              data-test-id="checkout-city"
            />
          </div>
        </div>
        <div>
          <p className="text-red-500 font-bold text-xs">
            {errors.country?.message}
          </p>
          <label
            className="text-[15px] font-semibold block"
            htmlFor="country-input"
          >
            Country:
          </label>
          <input
            className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
            id="country-input"
            {...register('country')}
            data-test-id="checkout-country"
          />
        </div>
      </div>
      <br />
      <div className="flex-1 flex flex-col max-w-[500px]">
        {/* Contains all input field on the right side */}
        <div>
          <p className="text-red-500 font-bold text-xs">
            {errors.creditcardName?.message}
          </p>
          <label
            className="text-[15px] font-semibold block"
            htmlFor="card-name-input"
          >
            Name on credit card:
          </label>
          <input
            className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
            id="card-name-input"
            {...register('creditcardName')}
            data-test-id="checkout-credit-card-name"
          />
        </div>
        <div>
          <p className="text-red-500 font-bold text-xs">
            {errors.creditcardNumber?.message}
          </p>
          <label
            className="text-[15px] font-semibold block"
            htmlFor="card-number-input"
          >
            Card number:
          </label>
          <input
            className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
            id="card-number-input"
            {...register('creditcardNumber')}
            data-test-id="checkout-credit-card"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <p className="text-red-500 font-bold text-xs mt-auto">
              {errors.expirationDate?.message}
            </p>
            <label
              className="text-[15px] font-semibold block"
              htmlFor="expiration-input"
            >
              Expiration date:
            </label>
            <input
              className="h-[29px] rounded-[5px] border p-2 mb-2 w-[150px]"
              id="expiration-input"
              {...register('expirationDate')}
              data-test-id="checkout-expiration-date"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-red-500 font-bold text-xs mt-auto">
              {errors.securityCode?.message}
            </p>
            <label
              className="text-[15px] font-semibold block"
              htmlFor="security-code-input"
            >
              CVV:
            </label>
            <input
              className="h-[29px] rounded-[5px] border p-2 mb-2 w-[6ch]"
              id="security-code-input"
              {...register('securityCode')}
              data-test-id="checkout-security-code"
            />
          </div>
        </div>
        <div className="my-auto flex justify-between gap-2">
          {/* Shows the "Buy now" button */}
          <button
            data-test-id="checkout-confirm-order"
            className="flex p-2 justify-center gap-2 items-center text-[19px] font-semibold rounded-[5px] w-[135px]  bg-primary  text-white cursor-pointer hover:bg-[#00b755d6]"
          >
            Buy now
          </button>
          {/* Shows the total price of all products */}
          <p className="text-[27px] font-semibold min-w-[200px]">
            € {(props.total / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </form>
  );
}
