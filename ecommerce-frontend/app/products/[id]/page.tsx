import ProductDetail from "@/Components/ProductDetail";
import React from "react";

const dummyProduct = {
  Name: "Wireless Headphones",
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
  id: "1",
};

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  // fetch using Id
  return <ProductDetail product={dummyProduct} />;
}
