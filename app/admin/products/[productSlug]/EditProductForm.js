'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SimpleEditor from '../../../../components/SimpleEditor';

export default function EditProductForm(props) {
  const product = props.product;
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [image, setImage] = useState(product.image);
  const [price, setPrice] = useState((product.price / 100).toFixed(2));
  const [slug, setSlug] = useState(product.slug);
  const [description, setDescription] = useState(product.description);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fileName, setFileName] = useState('');

  /* Form submit handler which sends the inputted values to the API and redirects to the product overview of the admin area on success. */
  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/admin', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: product.id,
        name: name,
        slug: slug,
        image: image,
        price: Number(price * 100),
        description: description,
      }),
    });
    if (response.ok) {
      setSuccessMessage('Changes successfully saved.');
    } else {
      setErrorMessage(
        'Changing product data failed. Please make sure all fields are filled in correctly.',
      );
    }
  }

  /* Resets all fields to the values which are stored in the database when the "Discard changes" button is clicked. */
  function handleDiscardChangesButtonClick() {
    setName(product.name);
    setImage(product.image);
    setPrice((product.price / 100).toFixed(2));
    setSlug(product.slug);
    setDescription(product.description);
  }

  /* Sends a delete request to the API and redirects to the products overview of the admin area on success */
  async function handleDeleteButtonClick() {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const response = await fetch('/api/admin', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: product.id }),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        setErrorMessage('Deleting product data failed.');
      }
    }
  }

  /* Sends the selected image to the API when the "Upload" is clicked and stores the returned image URL to the "setImage" state. */
  async function handleUpload(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/image-uploads', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      setErrorMessage('Image upload failed');
      return;
    }

    const data = await response.json();

    if ('error' in data) {
      setErrorMessage('Image upload failed');
      return;
    }

    setImage(data.imageUrl);

    router.refresh();

    setSuccessMessage('Image successfully uploaded');
  }

  return (
    <div className="flex gap-4 mt-8">
      {/* Left area with the image upload */}
      <div className="flex-1">
        {image && (
          <div>
            <div className="w-[300px] h-[300px] flex items-center rounded-[5px] border-8 border-[#434343] justify-center mx-auto">
              <img
                data-test-id="product-image"
                src={image}
                alt={name}
                className="max-w-[300px] max-h-[300px] p-5"
              />
            </div>
            <div className="mt-2 w-[300px] mx-auto">
              <form
                onSubmit={handleUpload}
                className="flex justify-between gap-2"
              >
                <label
                  className="flex-1 text-center p-2 inline-block items-center text-[13px] font-semibold rounded-[5px] bg-[#434343] text-white cursor-pointer hover:bg-black dark:hover:bg-[#00b755d6]"
                  htmlFor="image"
                >
                  Choose file
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(event) => setFileName(event.target.files[0].name)}
                />
                <button className="flex-1 p-2 items-center text-[13px] font-semibold rounded-[5px] bg-[#434343] text-white cursor-pointer hover:bg-black dark:hover:bg-[#00b755d6]">
                  Upload image
                </button>
              </form>
              {fileName && (
                <p className="text-[15px]">
                  Chosen file:&nbsp;
                  <span className="font-semibold">{fileName}</span>
                </p>
              )}
              {successMessage && (
                <p className="text-[15px] text-primary font-bold">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="text-[15px] text-red-500 font-bold">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Right area with the input fields for name, slug, price and description */}
      <div className="flex-1">
        <form onSubmit={handleFormSubmit}>
          <div>
            <label
              className="text-[15px] font-semibold block"
              htmlFor="product-name-input"
            >
              Product Name:
            </label>
            <input
              className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
              value={name}
              id="product-name-input"
              onChange={(event) => setName(event.currentTarget.value)}
              required
            />
          </div>
          <div>
            <label
              className="text-[15px] font-semibold block"
              htmlFor="slug-input"
            >
              Slug:
            </label>
            <input
              className="h-[29px] rounded-[5px] border p-2 mb-2 w-full"
              value={slug}
              id="slug-input"
              onChange={(event) => setSlug(event.currentTarget.value)}
              pattern="[a-z0-9\-]+"
              title="Please use hyphens instead of spaces, all lowercase, no special characters. The slug must be unique!"
              required
            />
          </div>
          <div>
            <label
              className="text-[15px] font-semibold block"
              htmlFor="price-input"
            >
              Price:
            </label>
            <input
              className="h-[29px] rounded-[5px] border p-2 mb-2 w-[100px]"
              value={price}
              id="price-input"
              onChange={(event) => setPrice(event.currentTarget.value)}
              pattern="\d+\.\d\d"
              title="Please input a number with 2 decimal places."
              required
            />
          </div>
          <div>
            <label
              className="text-[15px] font-semibold"
              htmlFor="description-input"
            >
              Description:
            </label>
            <br />
            <SimpleEditor state={description} stateSetter={setDescription} />
          </div>
          <div className="mt-2 mb-8 flex justify-between gap-2">
            <button className="flex-1 p-2 items-center text-[13px] font-semibold rounded-[5px] bg-[#434343]  text-white cursor-pointer hover:bg-black dark:hover:bg-[#00b755d6]">
              Save changes
            </button>
            <button
              type="button"
              className="flex-1 p-2 items-center text-[13px] font-semibold rounded-[5px] bg-[#434343] text-white cursor-pointer hover:bg-black dark:hover:bg-[#00b755d6]"
              onClick={handleDiscardChangesButtonClick}
            >
              Discard changes
            </button>
            <button
              type="button"
              className="flex-1 p-2 items-center text-[13px] font-semibold rounded-[5px] bg-[#434343] text-white cursor-pointer hover:bg-black dark:hover:bg-[#00b755d6]"
              onClick={handleDeleteButtonClick}
            >
              Delete product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
