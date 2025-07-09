import { notFound } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';


export default async function ProductPage(props: { params: { id: string } }) {
  const { params } = props;
  const idNum = Number(params.id);
  const { data: products, error: allError } = await supabase
    .from('Products')
    .select('id, name')
    .order('created_at', { ascending: true });

  if (allError || !products || products.length === 0) return notFound();

  // Ensure both sides are numbers for comparison
  const currentIndex = products.findIndex((p) => Number(p.id) === idNum);
  if (currentIndex === -1) return notFound();

  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  const { data: product, error } = await supabase
    .from('Products')
    .select('*')
    .eq('id', idNum)
    .single();

  if (error || !product) return notFound();

  const arrowBaseClasses =
    'flex items-center justify-center w-12 h-12 rounded-full cursor-pointer select-none transition-colors duration-200';

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 flex items-center gap-6">
      {/* Prev arrow */}
      {prevProduct ? (
        <Link
          href={`/product_list/${Number(prevProduct.id)}`}
          className={`${arrowBaseClasses} bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md`}
          aria-label={`Previous product: ${prevProduct.name}`}
          title={`Previous product: ${prevProduct.name}`}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      ) : (
        <div className={`${arrowBaseClasses} bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      )}

      {/* Main product content */}
      <div className="grid md:grid-cols-2 gap-10 items-center flex-grow">
        <Image
          src={product.image_url || '/fallback.png'}
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
        <Link
          href={`/product_list/${Number(nextProduct.id)}`}
          className={`${arrowBaseClasses} bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md`}
          aria-label={`Next product: ${nextProduct.name}`}
          title={`Next product: ${nextProduct.name}`}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
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
