import AdminButtonArea from './AdminButtonArea';

export const metadata = {
  title: 'Admin',
  description: 'This is the admin area for managing the products.',
};

export default function AdminPage() {
  return (
    <div className="h-[65vh] flex flex-col items-center justify-center">
      <h1 className="text-[45px] font-bold mb-3">Admin Panel</h1>
      {/* Loads the main component of the page */}
      <AdminButtonArea />
    </div>
  );
}
