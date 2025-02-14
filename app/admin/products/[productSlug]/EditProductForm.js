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
    const data = await response.json();
    console.log('Data', data);
    if (data) {
      alert('Changes successfully saved.');
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
      const data = await response.json();
      console.log(data);
      router.push('/admin/products');
    }
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
          pattern="[a-z0-9\-]+"
          title="Please use hyphens instead of spaces, all lowercase, no special characters. The slug must be unique!"
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
          onChange={(event) => setPrice(Number(event.currentTarget.value))}
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
  );
}
