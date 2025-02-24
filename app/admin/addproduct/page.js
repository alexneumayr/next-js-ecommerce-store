import AddProductForm from './AddProductForm';

export const metadata = {
  title: 'Admin',
  description: 'This is the admin page for adding a new product.',
};

export default function AddProductPage() {
  return (
    <div className="mx-[80px]">
      <h1 className="text-[45px] font-bold">Add a new product</h1>
      <AddProductForm />
    </div>
  );
}
