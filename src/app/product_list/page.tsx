import { notFound } from 'next/navigation';
import { supabase } from '../lib/supabaseClient'; // adjust path if needed

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  overview: string;
  description: string;
}

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const { data: product, error } = await supabase
    .from('Products')
    .select('*')
    .eq('id', params.id)
    .single();

  console.log('Fetched product:', product);
  console.log('Fetch error:', error);

  if (error || !product) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Product details here */}
    </div>
  );
}
