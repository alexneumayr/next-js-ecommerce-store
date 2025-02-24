export default function EditButtonIcon({ className }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14 5L19 10"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M9 20L2 22L4 15L16.414 2.58599C17.195 1.80499 18.461 1.80499 19.242 2.58599L21.414 4.75799C22.195 5.53899 22.195 6.80499 21.414 7.58599L9 20Z"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </svg>
  );
}
