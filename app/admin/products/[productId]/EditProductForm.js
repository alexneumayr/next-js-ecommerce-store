'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditProductForm(props) {
  const router = useRouter();
  const [productName, setProductName] = useState(props.productName);
  const [image, setImage] = useState(props.image);
  const [price, setPrice] = useState(props.price);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/admin', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.id,
        name: productName,
        image: image,
        price: Number(price),
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
    setProductName(props.productName);
    setImage(props.image);
    setPrice(props.price);
  }

  async function handleDeleteButtonClick() {
    const response = await fetch('/api/admin', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: props.id }),
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
          value={productName}
          id="product-name-input"
          onChange={(event) => setProductName(event.currentTarget.value)}
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
      <button>Save changes</button>
      <button onClick={handleDiscardChangesButtonClick}>Discard changes</button>
      <button type="button" onClick={handleDeleteButtonClick}>
        Delete product
      </button>
    </form>
  );
}
