'use client';

import Link from 'next/link';
import { Menu, User } from 'lucide-react';

export default function Header() {
  return (
    <div className="drawer drawer-start z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <header
          className="
            flex justify-between items-center p-4 shadow sticky top-0 z-50 h-25
            bg-no-repeat bg-center
          "
          style={{
            backgroundColor: '#82c5bf',
            backgroundImage: "url('/logo.png')",
            backgroundSize: '300px auto',
            backgroundPosition: 'center 45%',
          }}
        >
          <div className="flex items-center gap-2">
            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle">
              <Menu className="w-5 h-5" />
            </label>
            <Link href="/">
              <span className="font-bold text-xl cursor-pointer select-text">Smell-Alta</span>
            </Link>
          </div>

          <div className="flex-1"></div>

          <div className="flex items-center gap-4">
            <button className="btn btn-ghost btn-circle">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <aside
          className="flex flex-col justify-between pt-4 px-6 pb-6 w-64 min-h-full text-base"
          style={{ backgroundColor: '#b8a6da' }}
        >
          <h2 className="text-xl font-bold">Menu</h2>
          <Link href="/" className="btn btn-ghost justify-start text-base">
            Home
          </Link>
          {/*<Link href="/product_list" className="btn btn-ghost justify-start text-base">
            Products
          </Link>
          <Link href="/shopping_cart" className="btn btn-ghost justify-start text-base">
            Cart
          </Link>*/}
          <Link href="/about_us" className="btn btn-ghost justify-start text-base">
            About
          </Link>
        </aside>
      </div>
    </div>
  );
}
