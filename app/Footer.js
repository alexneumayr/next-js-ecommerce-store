import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="p-3 h-[136px] bg-[#404040] flex items-start">
        <div className=" min-w-[250px]">
          <h2 className="text-[21px] text-white font-bold ">
            Costumer Service
          </h2>
          <p className=" text-white text-xs font-bold">
            Phone: +01 123 1234 123
          </p>
          <p className=" text-white text-xs font-bold">Mo-Fr 10 am - 5 pm</p>
        </div>
        <div>
          <h2 className="text-white text-[21px] min-w-[250px] font-bold">
            Easy payment
          </h2>
          <div className="flex items-start gap-2">
            <img className="w-10" src="paypal.png" alt="PayPal" />
            <img className="w-10" src="visa.png" alt="Visa" />
            <img className="w-10" src="mastercard.png" alt="MasterCard" />
            <img className="w-10" src="dinersclub.png" alt="DinersClub" />
          </div>
        </div>
        <img src="logo-white.png" className="ml-auto w-[200px]" alt="Logo" />
      </div>
      <div className="px-3 h-[41px] bg-[#1C1C1C] bottom-0 flex items-center gap-5">
        <Link className="text-white text-[10px] font-medium" href="/">
          Contact
        </Link>
        <Link className="text-white text-[10px] font-medium" href="/">
          Team
        </Link>
        <Link className="text-white text-[10px] font-medium" href="/">
          About
        </Link>
        <p className="text-white text-[10px] font-medium ml-auto">
          © 2025 estore GmbH
        </p>
      </div>
    </footer>
  );
}
