import { createContext, useContext, useState, type ReactNode } from "react";
import { products } from "./products";
export type CartLine = { id: string; quantity: number };
type Store = {
  cart: CartLine[];
  count: number;
  ready: boolean;
  add: (id: string, quantity?: number) => void;
  update: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toast: string;
  notify: (message: string) => void;
};
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const ready = true;
  const notify = () => undefined;
  const add = (id: string, quantity = 1) => {
    const product = products.find((p) => p.id === id);
    if (!product?.available || !Number.isInteger(quantity) || quantity < 1) {
      return;
    }
    setCart((current) => {
      const old = current.find((x) => x.id === id);
      return old
        ? current.map((x) =>
            x.id === id ? { ...x, quantity: Math.min(99, x.quantity + quantity) } : x,
          )
        : [...current, { id, quantity: Math.min(99, quantity) }];
    });
  };
  const update = (id: string, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return;
    }
    setCart((current) => current.map((x) => (x.id === id ? { ...x, quantity } : x)));
  };
  const remove = (id: string) => {
    setCart((current) => current.filter((x) => x.id !== id));
  };
  const clear = () => setCart([]);
  return (
    <Context.Provider
      value={{
        cart,
        ready,
        count: cart.reduce((n, x) => n + x.quantity, 0),
        add,
        update,
        remove,
        clear,
        toast: "",
        notify,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStore() {
  const context = useContext(Context);
  if (!context) throw new Error("Store unavailable");
  return context;
}
