import Image from 'next/image';

export default function ProductCard({ product }) {
  const { name, price, imageUrl, rating, category, brand } = product || {};

  return (
    <article
      className="flex h-full flex-col items-center gap-4 rounded bg-gray-100 p-4 text-center shadow-xl xl:rounded-xl xl:p-8">
      <div className="relative aspect-square w-full overflow-hidden rounded xl:rounded-xl">
        <Image className="size-full object-cover" sizes="(max-width: 1280) 100vw, 50vw"
          src={imageUrl} alt={name} fill/>
      </div>
      <h3 className="text-lg font-bold md:text-xl xl:text-2xl">{name}</h3>
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <span className="text-lg font-semibold text-blue-600">${price}</span>
        <span className="text-lg text-gray-600">{brand}</span>

      </div>
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-medium">{rating}/10</span>
        </div>
        <span className="text-sm text-gray-600">{category}</span>
      </div>
    </article>
  );
}
