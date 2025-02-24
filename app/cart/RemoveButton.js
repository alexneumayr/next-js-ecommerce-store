'use client';
import RemoveButtonIcon from '../../components/RemoveButtonIcon';
import { createOrUpdateCookie } from '../../util/cookies';

export default function RemoveButton(props) {
  return (
    <button
      onClick={() => createOrUpdateCookie(props.id, 0)}
      data-test-id={`cart-product-remove-${props.slug}`}
      className="hover:cursor-pointer mr-4"
    >
      <RemoveButtonIcon className="stroke-[#212121] hover:stroke-primary" />
    </button>
  );
}
