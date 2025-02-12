'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditProductForm({ product }) {
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [image, setImage] = useState(product.image);
  const [price, setPrice] = useState(product.price);
  const [slug, setSlug] = useState(product.slug);
  const [description, setDescription] = useState(product.description);

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
        price: price * 100,
        description: description,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      alert('Changes successfully saved.');
    } else {
      alert('Error saving changes.');
    }
  }

  function handleDiscardChangesButtonClick() {
    setName(product.productName);
    setImage(product.image);
    setPrice(product.price);
  }

  async function handleDeleteButtonClick() {
    const response = await fetch('/api/admin', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: product.id }),
      s,
    });
    const data = await response.json();
    console.log(data);
    router.push('/admin/products');
  }

  return (
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
          pattern="[a-z\-]+"
          title="Please use hyphens instead of spaces, all lowercase, no special characters."
          required
        />
      </div>
      <div>
        <label htmlFor="image-input">Image:</label>
        <input
          value={image}
          id="image-input"
          onChange={(event) => setImage(event.currentTarget.value)}
          pattern="[\w\-]+\.(jpg|png)$"
          title="Only .jpg and .png files are supported."
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
        <textarea
          id="description"
          rows="10"
          cols="50"
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          required
        />
      </div>
      <button>Save changes</button>
      <button onClick={handleDiscardChangesButtonClick}>Discard changes</button>
      <button type="button" onClick={handleDeleteButtonClick}>
        Delete product
      </button>
    </form>
  );
}
