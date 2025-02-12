'use client';
import { createOrUpdateCookie } from '../util/cookies';

export default function DecrementButton(props) {
  return (
    <button
      onClick={() => createOrUpdateCookie(props.id, props.currentAmount - 1)}
    >
      -1
    </button>
  );
}
