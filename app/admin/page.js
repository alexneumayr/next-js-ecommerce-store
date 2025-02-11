import Link from 'next/link.js';

export default function AdminPage() {
  return (
    <div>
      <h1>Admin</h1>
      <Link href="/admin/products">Go to Products Overview for edit</Link>
    </div>
  );
}
