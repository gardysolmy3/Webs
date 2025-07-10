import { notFound } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Image from 'next/image';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: products, error: allError } = await supabase
    .from('Products')
    .select('id, name')
    .order('created_at', { ascending: true });

  if (allError || !products || products.length === 0) return notFound();

  const currentIndex = products.findIndex((p) => p.id === id);
  if (currentIndex === -1) return notFound();

  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  const { data: product, error } = await supabase
    .from('Products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) return notFound();

  const arrowBaseClasses =
    'flex items-center justify-center w-12 h-12 rounded-full cursor-pointer select-none transition-colors duration-200';

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 flex items-center gap-6">
      {/* Prev arrow */}
      {prevProduct ? (
        <a
          href={`/product_list/${prevProduct.id}`}
          className={`${arrowBaseClasses} bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md`}
          aria-label={`Previous product: ${prevProduct.name}`}
          title={`Previous product: ${prevProduct.name}`}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </a>
      ) : (
        <div className={`${arrowBaseClasses} bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      )}

      {/* Product content */}
      <div className="grid md:grid-cols-2 gap-10 items-center flex-grow">
        <Image
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-contain rounded-xl shadow-lg"
          width={400}
          height={400}
          priority
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-green-700 text-xl font-semibold mb-2">${product.price}</p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>

      {/* Next arrow */}
      {nextProduct ? (
        <a
          href={`/product_list/${nextProduct.id}`}
          className={`${arrowBaseClasses} bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md`}
          aria-label={`Next product: ${nextProduct.name}`}
          title={`Next product: ${nextProduct.name}`}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      ) : (
        <div className={`${arrowBaseClasses} bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
}
