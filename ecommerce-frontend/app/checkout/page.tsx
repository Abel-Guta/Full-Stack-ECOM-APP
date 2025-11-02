"use client";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useCartStore } from "@/store/cart-store";
import React from "react";

export default function page() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div>
        <h2>Your Cart is Empty.</h2>
      </div>
    );
  }
  return (
    <div>
      <h1>Checkout</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {items.map((item, key) => (
              <li key={key}>
                <div>
                  <span>{item.name}</span>
                  <span>{(item.price * item.quantity).toFixed(2)}</span>
                </div>

                <div className="flex space-x-4 items-center mt-3">
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant={"outline"}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    onClick={() => {
                      addItem({
                        ...item,
                        quantity: 1,
                      });
                    }}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
