import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../Components/navbar';
import axios from 'axios';

export const Productform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = location.state?.isEdit || false;
  const id = location.state?.id || 0;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [tag, setTag] = useState('');
  const [email, setEmail] = useState('');
  const [preview, setPreview] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:3000/product/get-product/${id}`)
        .then((res) => {
          const p = res.data.product;
          setName(p.name);
          setDescription(p.description);
          setCategory(p.category);
          setTag(p.tags);
          setPrice(p.price);
          setStock(p.stock);
          setEmail(p.email);
          if (p.images?.length) {
            setPreview(p.images.map(imgPath => `http://localhost:3000/${imgPath}`));
          }
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
        });
    }
  }, [id, isEdit]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImage(prev => [...prev, ...files]);
    const imgPreview = files.map(file => URL.createObjectURL(file));
    setPreview(imgPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('tag', tag);
    image.forEach(file => formData.append('files', file));

    try {
      if (isEdit) {
        const res = await axios.put(`http://localhost:3000/product/edit-product/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 200) {
          alert("Product updated successfully!");
          navigate("/my-products");
        }
      } else {
        const res = await axios.post(`http://localhost:3000/product/post-product`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 200) {
          setName('');
          setEmail('');
          setPrice('');
          setDescription('');
          setCategory('');
          setStock('');
          setTag('');
          setImage([]);
          setPreview([]);
          alert("Product added successfully.");
        }
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Submission failed.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-black">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-center">{isEdit ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Email', type: 'email', value: email, setValue: setEmail },
              { label: 'Product Name', type: 'text', value: name, setValue: setName },
              { label: 'Price', type: 'number', value: price, setValue: setPrice },
              { label: 'Description', type: 'text', value: description, setValue: setDescription },
              { label: 'Category', type: 'text', value: category, setValue: setCategory },
              { label: 'Stock', type: 'number', value: stock, setValue: setStock },
              { label: 'Tag', type: 'text', value: tag, setValue: setTag },
            ].map(({ label, type, value, setValue }, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">Product Images</label>
              <input type="file" multiple required onChange={handleImage} className="mt-1 block" />
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {preview.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md border"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
            >
              {isEdit ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
