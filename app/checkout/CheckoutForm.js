'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { removeCookie } from '../util/cookies';

export default function CheckoutForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();
    removeCookie();
    router.push('/thankyou');
  }

  const router = useRouter();

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <div>
          <label htmlFor="first-name-input">First name:</label>
          <input
            id="first-name-input"
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
            pattern="\D+"
            title="Please only use letters."
            required
          />
        </div>
        <div>
          <label htmlFor="last-name-input">Last name:</label>
          <input
            id="last-name-input"
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
            pattern="\D+"
            title="Please only use letters."
            required
          />
        </div>
        <div>
          <label htmlFor="email-input">Email:</label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address-input">Address:</label>
          <input
            id="address-input"
            value={address}
            onChange={(event) => setAddress(event.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postal-code-input">Postal code:</label>
          <input
            id="postal-code-input"
            value={postalCode}
            onChange={(event) => setPostalCode(event.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city-input">City:</label>
          <input
            id="city-input"
            value={city}
            onChange={(event) => setCity(event.currentTarget.value)}
            pattern="\D+"
            title="Please only use letters."
            required
          />
        </div>
        <div>
          <label htmlFor="country-input">Country:</label>
          <input
            id="country-input"
            value={country}
            onChange={(event) => setCountry(event.currentTarget.value)}
            pattern="\D+"
            title="Please only use letters."
            required
          />
        </div>
      </div>
      <br />
      <div>
        <div>
          <label htmlFor="card-number-input">Card number:</label>
          <input
            id="card-number-input"
            type="number"
            value={cardNumber}
            onChange={(event) => setCardNumber(event.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="expiration-input">Expiration date:</label>
          <input
            id="expiration-input"
            value={expirationDate}
            onChange={(event) => setExpirationDate(event.currentTarget.value)}
            pattern="\d{2}/\d{2}"
            title="Please use the format MM/YY."
            required
          />
        </div>
        <div>
          <label htmlFor="security-code-input">Security code:</label>
          <input
            id="security-code-input"
            value={securityCode}
            onChange={(event) => setSecurityCode(event.currentTarget.value)}
            pattern="\d{3,4}"
            title="Please type in the security code correctly."
            required
          />
        </div>
      </div>
      <button>Confirm Order</button>
    </form>
  );
}
