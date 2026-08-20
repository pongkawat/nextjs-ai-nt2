/* eslint-disable @typescript-eslint/no-explicit-any */
import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";

type Props = {
  products: any[]
}

const FeaturesProduct = ({ products }: Props) => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col px-6 py-20">
      <h2 className="text-pretty text-center font-heading font-bold text-[2rem] tracking-[-0.01em] sm:text-[2.25rem]">
        สินค้าทั้งหมด
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            className="rounded-lg border border-border bg-card p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]"
            key={product.id}
          >
            <div className="relative mb-5 aspect-4/5 w-full overflow-hidden rounded-lg sm:mb-6">
              <Image
                alt={product.name}
                className="size-full bg-muted object-cover"
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={`/product-image/${product.picture}`}
                loading="eager"
              />
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/5 text-primary dark:bg-primary/15">
              ID: {product.id}
            </div>
            <h3 className="mt-5 font-heading text-lg font-semibold">
              Name: {product.name}
            </h3>
            <p className="mt-2 text-muted-foreground">
              Price: {product.price.toString()}
            </p>
            <div className="mt-2">
                <CartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesProduct;
