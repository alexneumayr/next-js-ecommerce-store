import Link from 'next/link.js';

export default function AdminPage() {
  return (
    <div>
      <h1>Admin</h1>
      <Link href="/admin/newproduct">Add new product</Link>
      <br />
      <Link href="/admin/products">Edit existing products</Link>
    </div>
  );
}
