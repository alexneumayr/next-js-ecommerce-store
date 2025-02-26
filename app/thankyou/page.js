import Link from 'next/link';

export const metadata = {
  title: 'Thank you for your order',
  description:
    "Thank you for your order! Your purchase is being processed, and you'll receive a confirmation email soon. Enjoy the latest tech with fast shipping and secure shopping!",
};

export default function ThankYouPage() {
  /* Returns a text that thanks the user for the purchase and informs
  about the things that will happen next. */
  return (
    <div className="mx-[80px]">
      <h1 className="mt-10 text-6xl font-extrabold text-center">
        Thank You for Your Purchase!
      </h1>
      <div className="m-10 max-w-[1000px] rounded-[25px] border border-[#878787] mx-auto p-5">
        <p className="text-[21px] font-normal m-3 ">
          Your order has been successfully placed!
          <br /> We appreciate your trust in us and are excited to get your new
          tech to you as soon as possible.
        </p>
        <h2 className="m-3 text-[21px] font-semibold">What's next?</h2>
        <ul className="list-inside list-['👉'] m-3 text-[21px] font-normal">
          <li>
            You'll receive a confirmation email shortly with your order details.
          </li>
          <li>
            Once your package ships, we'll send you a tracking link so you can
            follow your delivery.
          </li>
        </ul>
        <h2 className="m-3 text-[21px] font-semibold">Need Help?</h2>
        <p className="m-3 text-[21px] font-normal">
          If you have any questions or need assistance, our support team is here
          for you:&nbsp;
          <Link
            className="text-primary underline hover:text-black dark:hover:text-[#00b755d6]"
            href="/"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
