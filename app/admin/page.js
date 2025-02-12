import Link from 'next/link.js';

export const metadata = {
  title: 'Admin',
  description: 'This is the admin area for managing the products.',
};

export default function AdminPage() {
  return (
    <div>
      <h1>Admin</h1>
      <Link href="/admin/addproduct">Add new product</Link>
      <br />
      <Link href="/admin/products">Edit existing products</Link>
    </div>
  );
}
