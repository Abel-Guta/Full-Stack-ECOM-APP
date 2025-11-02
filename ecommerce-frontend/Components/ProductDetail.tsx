import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface SingleProduct {
  product: Product;
}

interface Product {
  Name: string;
  description: string;
  price: number;
  category: string;
  comment?: string;
  stock: number;
  ratings?: Rating[];
  createdAt: Date;
  updatedAt: Date;
  image: string;
  id: string;
}
interface Rating {
  userId: string;
  rate: number;
}

export default function ProductDetail({ product }: SingleProduct) {
  return (
    <div className="max-w-[80%] mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.image && (
        <div className="relative h-96  w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            alt={product.Name}
            src={product.image}
            fill
            className="transition duration-300 hover:opacity-90"
          />
        </div>
      )}

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.Name}</h1>
        {product.description && <p>{product.description}</p>}

        {product.price && (
          <p className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        )}

        <div className="flex space-x-4 items-center mt-3">
          <Button variant={"outline"}>-</Button>
          <span className="text-lg font-semibold">0</span>
          <Button>+</Button>
        </div>
      </div>
    </div>
  );
}
