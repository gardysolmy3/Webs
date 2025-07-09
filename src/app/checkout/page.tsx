"use client";

import { useCart } from '../context/cart_context';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    card: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!form.name || !form.email || !form.address || !form.card) {
      alert('Please fill in all fields.');
      return;
    }

    // Simulate order processing
    setTimeout(() => {
      alert('Order placed successfully!');
      clearCart();            // Empty cart after "checkout"
      router.push('/');       // Redirect to home or thank-you page
    }, 1000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add some items before checking out.</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={form.address}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="card"
              placeholder="Card Number"
              value={form.card}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <button type="submit" className="btn btn-primary w-full">
              Place Order (${totalPrice.toFixed(2)})
            </button>
          </form>
        </>
      )}
    </div>
  );
}
