import AddProductForm from './addproductform';

export const metadata = {
  title: 'Admin',
  description: 'This is the admin page for adding a new product.',
};

export default function AddProductPage() {
  return (
    <>
      <h1>Add new product</h1>
      <AddProductForm />
    </>
  );
}
