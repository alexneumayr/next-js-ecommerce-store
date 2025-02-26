'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SimpleEditor from '../../../components/SimpleEditor';

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const router = useRouter();

  /* Form submit handler which sends the inputted values to the API and redirects to the product overview of the admin area on success. */
  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        slug: slug,
        image: image,
        price: price * 100,
        description: description,
      }),
    });

    if (response.ok) {
      router.push('/admin/products');
    } else {
      setErrorMessage(
        "Adding product failed. Please make sure all fields are filled in correctly (and don't forget to chose an image).",
      );
    }
  }

  /* Clears all input field when the "Reset" button is clicked */
  function handleClearButtonClick() {
    setName('');
    setImage('');
    setPrice('');
    setSlug('');
    setDescription('');
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
    <div className="flex gap-4 mt-8 min-h-[400px]">
      {/* Left area with the image upload */}
      <div className="flex-1">
        <div>
          <div className="w-[300px] h-[300px] flex items-center rounded-[5px] border-8 border-[#434343] justify-center mx-auto">
            {image && (
              <img
                data-test-id="product-image"
                src={image}
                alt={name}
                className="max-w-[300px] max-h-[300px] p-5"
              />
            )}
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
            <button className="flex-1 p-2 items-center text-[13px] font-semibold rounded-[5px] bg-[#434343] text-white cursor-pointer hover:bg-black dark:hover:bg-[#00b755d6]">
              Add product
            </button>
            <button
              className="flex-1 p-2 items-center text-[13px] font-semibold rounded-[5px] bg-[#434343] text-white cursor-pointer hover:bg-black dark:hover:bg-[#00b755d6]"
              type="button"
              onClick={handleClearButtonClick}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
