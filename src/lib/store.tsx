import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { products } from "./products";
export type CartLine = {id:string; quantity:number};
type Store = { cart:CartLine[]; count:number; ready:boolean; add:(id:string, quantity?:number)=>void; update:(id:string,quantity:number)=>void; remove:(id:string)=>void; clear:()=>void; toast:string; notify:(message:string)=>void };
const Context = createContext<Store | null>(null);
const KEY = "floravia-cart-v1";
export function StoreProvider({children}:{children:ReactNode}) {
 const [cart,setCart]=useState<CartLine[]>([]);
 const [ready,setReady]=useState(false);
 const [toast,setToast]=useState("");
 useEffect(()=>{try {const saved=JSON.parse(localStorage.getItem(KEY) || "[]"); if(Array.isArray(saved)) setCart(saved.filter((x:CartLine)=>products.some(p=>p.id===x.id && p.available) && Number.isInteger(x.quantity) && x.quantity>0 && x.quantity<=99));}catch {localStorage.removeItem(KEY)}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem(KEY,JSON.stringify(cart))},[cart,ready]);
 const notify=useCallback((message:string)=>{setToast(message);window.setTimeout(()=>setToast(current=>current===message?"":current),4000)},[]);
 const add=(id:string,quantity=1)=>{const product=products.find(p=>p.id===id); if(!product?.available || !Number.isInteger(quantity) || quantity<1) {notify("Este producto no está disponible.");return} setCart(current=>{const old=current.find(x=>x.id===id);return old?current.map(x=>x.id===id?{...x,quantity:Math.min(99,x.quantity+quantity)}:x):[...current,{id,quantity:Math.min(99,quantity)}]});notify(`${product.name} agregado al carrito.`)};
 const update=(id:string,quantity:number)=>{if(!Number.isInteger(quantity)||quantity<1||quantity>99){notify("Elige una cantidad entre 1 y 99.");return}setCart(current=>current.map(x=>x.id===id?{...x,quantity}:x));notify("Cantidad actualizada.")};
 const remove=(id:string)=>{setCart(current=>current.filter(x=>x.id!==id));notify("Producto eliminado del carrito.")};
 const clear=()=>setCart([]);
 return <Context.Provider value={{cart,ready,count:cart.reduce((n,x)=>n+x.quantity,0),add,update,remove,clear,toast,notify}}>{children}<div className="toast" role="status" aria-live="polite" aria-atomic="true">{toast}</div></Context.Provider>;
}
export function useStore(){const context=useContext(Context);if(!context)throw new Error("Store unavailable");return context}
