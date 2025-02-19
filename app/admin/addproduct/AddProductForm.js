'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import SimpleEditor from '../../../components/SimpleEditor';

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const router = useRouter();

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
        description: sanitizeHtml(description, {
          allowedTags: [
            'b',
            'i',
            'u',
            'h1',
            'h2',
            'h3',
            'div',
            'ul',
            'ol',
            'li',
            'pre',
            'br',
          ],
        }),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      router.push('/admin/products');
    } else {
      const data = await response.json();
      console.log(data);
      setErrorMessage(
        "Adding product failed. Please make sure all fields are filled in correctly (and don't forget to chose an image).",
      );
    }
  }

  function handleClearButtonClick() {
    setName('');
    setImage('');
    setPrice('');
    setSlug('');
    setDescription('');
  }

  async function handleUpload(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/image-uploads', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.error);
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
    <>
      {image && (
        <div className="product-image-container">
          <img
            data-test-id="product-image"
            src={image}
            alt={name}
            className="product-image"
          />
        </div>
      )}
      <form onSubmit={handleUpload}>
        <input type="file" name="image" accept="image/*" />
        <button>Upload Image</button>
      </form>

      <br />
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="product-name-input">Product Name:</label>
          <input
            value={name}
            id="product-name-input"
            onChange={(event) => setName(event.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="slug-input">Slug:</label>
          <input
            value={slug}
            id="slug-input"
            onChange={(event) => setSlug(event.currentTarget.value)}
            pattern="[a-z0-9\-]+"
            title="Please use hyphens instead of spaces, all lowercase, no special characters. The slug must be unique!"
            required
          />
        </div>
        <div>
          <label htmlFor="price-input">Price:</label>
          <input
            value={price}
            id="price-input"
            onChange={(event) => setPrice(event.currentTarget.value)}
            pattern="\d+\.\d\d"
            title="Please input a number with 2 decimal places."
            required
          />
        </div>
        <div>
          <label htmlFor="description-input">Description:</label>
          <br />
          <SimpleEditor state={description} stateSetter={setDescription} />
        </div>
        <button>Add product</button>
        <button type="button" onClick={handleClearButtonClick}>
          Reset
        </button>
      </form>
      <br />
      {successMessage}
      {errorMessage}
      <br />
    </>
  );
}
