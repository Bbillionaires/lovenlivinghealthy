"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, PurchaseType } from "./types";

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, purchaseType: PurchaseType) => void;
  updateQuantity: (productId: string, purchaseType: PurchaseType, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (i) => i.productId === item.productId && i.purchaseType === item.purchaseType
        );
        if (existingIndex >= 0) {
          const next = [...items];
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: next[existingIndex].quantity + item.quantity,
            intervalLabel: item.intervalLabel ?? next[existingIndex].intervalLabel,
            interval: item.interval ?? next[existingIndex].interval,
            intervalCount: item.intervalCount ?? next[existingIndex].intervalCount,
            discountPercent: item.discountPercent ?? next[existingIndex].discountPercent,
          };
          set({ items: next });
        } else {
          set({ items: [...items, item] });
        }
      },
      removeItem: (productId, purchaseType) =>
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.purchaseType === purchaseType)
          ),
        }),
      updateQuantity: (productId, purchaseType, quantity) =>
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.purchaseType === purchaseType
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "lnlh-cart" }
  )
);

export function useCartCount() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
}
