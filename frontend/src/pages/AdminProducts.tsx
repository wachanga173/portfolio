import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';
import api from '../api/axios';

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  icon: string;
  features: string[];
  display_order: number;
  is_active?: boolean;
}

const iconOptions = [
  'FaGlobe',
  'FaMobileAlt',
  'FaShoppingCart',
  'FaCode',
  'FaLaptopCode',
  'FaServer',
  'FaDatabase',
  'FaCloud',
  'FaCog',
  'FaRocket',
];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  const emptyProduct: Product = {
    name: '',
    description: '',
    price: 0,
    icon: 'FaShoppingCart',
    features: [''],
    display_order: 0,
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage('Error loading products');
    }
  };

  const handleSave = async (product: Product) => {
    try {
      if (product.id) {
        // Update existing product
        await api.put(`/products/${product.id}`, product);
        setMessage('Product updated successfully');
      } else {
        // Create new product
        await api.post('/products', product);
        setMessage('Product created successfully');
      }
      fetchProducts();
      setEditingProduct(null);
      setIsAdding(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving product:', error);
      setMessage('Error saving product');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/products/${id}`);
      setMessage('Product deleted successfully');
      fetchProducts();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage('Error deleting product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingProduct({ ...emptyProduct });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAdding(false);
  };

  const updateField = (field: keyof Product, value: any) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [field]: value });
    }
  };

  const updateFeature = (index: number, value: string) => {
    if (editingProduct) {
      const newFeatures = [...editingProduct.features];
      newFeatures[index] = value;
      setEditingProduct({ ...editingProduct, features: newFeatures });
    }
  };

  const addFeature = () => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        features: [...editingProduct.features, ''],
      });
    }
  };

  const removeFeature = (index: number) => {
    if (editingProduct) {
      const newFeatures = editingProduct.features.filter((_, i) => i !== index);
      setEditingProduct({ ...editingProduct, features: newFeatures });
    }
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? (
      <IconComponent className="text-2xl" />
    ) : (
      <Icons.FaShoppingCart className="text-2xl" />
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-20">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-6 font-medium"
        >
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="section-title text-left mb-0">Marketplace Products</h1>
          <button
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {message && <div className="bg-green-500 text-white px-4 py-3 rounded mb-4">{message}</div>}

        {/* Edit/Add Form */}
        {editingProduct && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {isAdding ? 'Add New Product' : 'Edit Product'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Price (KES)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => updateField('price', parseFloat(e.target.value))}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Icon</label>
                <select
                  value={editingProduct.icon}
                  onChange={(e) => updateField('icon', e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded text-gray-900 dark:text-white"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Display Order</label>
                <input
                  type="number"
                  value={editingProduct.display_order}
                  onChange={(e) => updateField('display_order', parseInt(e.target.value))}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded text-gray-900 dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded text-gray-900 dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-2">Features</label>
                {editingProduct.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded text-gray-900 dark:text-white"
                      placeholder="Feature description"
                    />
                    <button
                      onClick={() => removeFeature(index)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addFeature}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded text-sm text-gray-900 dark:text-white"
                >
                  + Add Feature
                </button>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleSave(editingProduct)}
                className="btn-primary flex items-center gap-2"
              >
                <FaSave /> Save
              </button>
              <button onClick={handleCancel} className="btn-secondary flex items-center gap-2">
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-indigo-400">{getIconComponent(product.icon)}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => product.id && handleDelete(product.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{product.description}</p>
              <p className="text-2xl font-bold text-indigo-400 mb-4">
                KES {product.price.toLocaleString()}
              </p>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
