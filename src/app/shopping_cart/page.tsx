"use client";

import { useCart } from '../context/cart_context';
import { useEffect, useState } from 'react';

export default function ShoppingCartPage() {
  const { cartItems, totalItems, totalPrice, removeFromCart, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Wait for client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // or return a loading spinner

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border rounded-lg bg-base-200"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm">{item.description}</p>
                <p className="mt-1">
                  {item.quantity} × {item.price}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn btn-sm btn-error"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="border-t pt-4 text-right space-y-2">
            <p className="font-medium">Total Items: {totalItems}</p>
            <p className="font-bold text-xl">Total: ${totalPrice.toFixed(2)}</p>

            {/* Clear Cart button */}
            <button
              onClick={clearCart}
              className="btn btn-warning mt-2"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
