'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { removeCookie } from '../../util/cookies';

export default function CheckoutForm() {
  const router = useRouter();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await removeCookie();
    router.push('/thankyou');
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <div>
          <p className="error">{errors.firstName?.message}</p>
          <label htmlFor="first-name-input">First name:</label>
          <input
            id="first-name-input"
            {...register('firstName')}
            data-test-id="checkout-first-name"
          />
        </div>
        <div>
          <p className="error">{errors.lastName?.message}</p>
          <label htmlFor="last-name-input">Last name:</label>
          <input
            id="last-name-input"
            {...register('lastName')}
            data-test-id="checkout-last-name"
          />
        </div>
        <div>
          <p className="error">{errors.email?.message}</p>
          <label htmlFor="email-input">Email:</label>
          <input
            id="email-input"
            type="email"
            {...register('email')}
            data-test-id="checkout-email"
          />
        </div>
        <div>
          <p className="error">{errors.address?.message}</p>
          <label htmlFor="address-input">Address:</label>
          <input
            id="address-input"
            {...register('address')}
            data-test-id="checkout-address"
          />
        </div>
        <div>
          <p className="error">{errors.postalCode?.message}</p>
          <label htmlFor="postal-code-input">Postal code:</label>
          <input
            id="postal-code-input"
            {...register('postalCode')}
            data-test-id="checkout-postal-code"
          />
        </div>
        <div>
          <p className="error">{errors.city?.message}</p>
          <label htmlFor="city-input">City:</label>
          <input
            id="city-input"
            {...register('city')}
            data-test-id="checkout-city"
          />
        </div>
        <div>
          <p className="error">{errors.country?.message}</p>
          <label htmlFor="country-input">Country:</label>
          <input
            id="country-input"
            {...register('country')}
            data-test-id="checkout-country"
          />
        </div>
      </div>
      <br />
      <div>
        <div>
          <p className="error">{errors.creditcardNumber?.message}</p>
          <label htmlFor="card-number-input">Card number:</label>
          <input
            id="card-number-input"
            {...register('creditcardNumber')}
            data-test-id="checkout-credit-card"
          />
        </div>
        <div>
          <p className="error">{errors.expirationDate?.message}</p>
          <label htmlFor="expiration-input">Expiration date:</label>
          <input
            id="expiration-input"
            {...register('expirationDate')}
            data-test-id="checkout-expiration-date"
          />
        </div>
        <div>
          <p className="error">{errors.securityCode?.message}</p>
          <label htmlFor="security-code-input">Security code:</label>
          <input
            id="security-code-input"
            {...register('securityCode')}
            data-test-id="checkout-security-code"
          />
        </div>
      </div>
      <button data-test-id="checkout-confirm-order">Confirm Order</button>
    </form>
  );
}
