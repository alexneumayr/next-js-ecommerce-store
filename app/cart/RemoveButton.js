'use client';
import { createOrUpdateCookie } from '../util/cookies';

export default function RemoveButton(props) {
  return (
    <button onClick={() => createOrUpdateCookie(props.id, '0')}>Remove</button>
  );
}
