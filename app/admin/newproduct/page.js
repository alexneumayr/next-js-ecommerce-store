'use client';
import { useState } from 'react';

export default function NewProductPage() {
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: productName,
        image: image,
        price: Number(price),
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  function handleClearButtonClick() {
    setProductName('');
    setImage('');
    setPrice('');
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
          pattern="\w+\.(jpg|png)"
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
      <button>Add product</button>
      <button type="button" onClick={handleClearButtonClick}>
        Reset
      </button>
    </form>
  );
}
