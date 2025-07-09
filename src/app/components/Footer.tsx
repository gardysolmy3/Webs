import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-[#1f2937] text-white py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Smell-Alta</h3>
          <p className="text-sm text-gray-300">
            Discover your signature scent. Handmade products that elevate your presence.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-300">

<ul className="space-y-1 text-sm text-gray-300">
  <li>
    <Link href="/">Home</Link>
  </li>
  <li>
    <Link href="/product_list">Products</Link>
  </li>
  <li>
    <Link href="/about_us">About Us</Link>
  </li>
  <li>
    <Link href="/shopping_cart">Cart</Link>
  </li>
</ul>

          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm text-gray-300">
  <li><Link href="/faq">FAQ</Link></li>
  <li><Link href="/shipping-returns">Shipping & Returns</Link></li>
  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
  <li><Link href="/contact">Contact</Link></li>
</ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Stay in Touch</h4>
          <p className="text-sm text-gray-300 mb-2">Join our newsletter for updates.</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded text-black text-sm"
          />
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-400">
        © {new Date().getFullYear()} Smell-Alta. All rights reserved. | Cookies | Terms
      </div>
    </footer>
  );
};

export default Footer;
