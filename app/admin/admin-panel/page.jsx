"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({ title: "", price: "", category: "" });

  // Fetch all products
  async function fetchProducts() {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
      setProducts(res.data.products || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  }

  // Delete product
  async function deleteProduct(id) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  }

  // Start editing a product
  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setEditData({
      title: product.title,
      price: product.price,
      category: product.category,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingProduct(null);
    setEditData({ title: "", price: "", category: "" });
  };

  // Save edited product
  const saveEdit = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${editingProduct}`, editData);
      alert("Product updated successfully");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center">Admin Panel</h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-xl">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
                  <th className="py-3 px-4 border-b">Image</th>
                  <th className="py-3 px-4 border-b">Title</th>
                  <th className="py-3 px-4 border-b">Price</th>
                  <th className="py-3 px-4 border-b">Category</th>
                  <th className="py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No image</span>
                      )}
                    </td>

                    {editingProduct === p._id ? (
                      <>
                        <td className="py-3 px-4 border-b">
                          <input
                            type="text"
                            value={editData.title}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="py-3 px-4 border-b">
                          <input
                            type="number"
                            value={editData.price}
                            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="py-3 px-4 border-b">
                          <input
                            type="text"
                            value={editData.category}
                            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="py-3 px-4 border-b">
                          <button
                            onClick={saveEdit}
                            className="text-green-500 hover:text-green-700 mr-3"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4 border-b">{p.title}</td>
                        <td className="py-3 px-4 border-b">${p.price}</td>
                        <td className="py-3 px-4 border-b">{p.category}</td>
                        <td className="py-3 px-4 border-b">
                          <button
                            onClick={() => deleteProduct(p._id)}
                            className="text-red-500 hover:text-red-700 mr-3"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}