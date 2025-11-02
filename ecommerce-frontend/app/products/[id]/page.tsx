import ProductDetail from "@/Components/ProductDetail";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  // fetch using Id
  const dummyProduct = {
    Name: `Wireless Headphones ${id}`,
    description:
      "High-quality over-ear wireless headphones with noise cancellation.",
    price: 120,
    category: "Electronics",
    stock: 25,
    ratings: [
      { userId: "1", rate: 5 },
      { userId: "2", rate: 4 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "/product demo.webp",
    id,
  };

  return <ProductDetail product={dummyProduct} />;
}
