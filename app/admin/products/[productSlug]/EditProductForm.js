'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import SimpleEditor from '../../../components/SimpleEditor';

export default function EditProductForm(props) {
  const product = props.product;
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [image, setImage] = useState(product.image);
  const [price, setPrice] = useState((product.price / 100).toFixed(2));
  const [slug, setSlug] = useState(product.slug);
  const [description, setDescription] = useState(product.description);
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

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
      alert('Changes successfully saved.');
    } else {
      const data = await response.json();
      console.log(data);
      setErrorMessage(
        'Changing product data failed. Please make sure all fields are filled in correctly.',
      );
    }
  }

  function handleDiscardChangesButtonClick() {
    setName(product.name);
    setImage(product.image);
    setPrice(product.price);
    setSlug(product.slug);
    setDescription(product.description);
  }

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
        const data = await response.json();
        console.log(data);
        router.push('/admin/products');
      } else {
        const data = await response.json();
        setErrorMessage('Deleting product data failed.');
        console.log(data);
      }
    }
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
        <button>Save changes</button>
        <button type="button" onClick={handleDiscardChangesButtonClick}>
          Discard changes
        </button>
        <button type="button" onClick={handleDeleteButtonClick}>
          Delete product
        </button>
      </form>
      <br />
      {successMessage}
      {errorMessage}
      <br />
    </>
  );
}
