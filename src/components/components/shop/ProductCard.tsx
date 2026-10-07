import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { money, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
export function ProductCard({product}:{product:Product}){
 const {add}=useStore();const [added,setAdded]=useState(false);
 function handleAdd(){add(product.id);setAdded(true);window.setTimeout(()=>setAdded(false),1800)}
 return <article className="product-card"><div className="product-image-wrap"><Link to="/producto/$id" params={{id:product.id}} aria-label={`Ver detalle de ${product.name}`}><img src={product.image} alt={`Ramo ${product.name}: ${product.stems.toLowerCase()}`} loading="lazy" width="912" height="1104" /></Link><span className="product-badge">{product.available?"Disponible":"Agotado"}</span></div><div className="product-info"><div className="product-info-top"><span className="eyebrow">{product.occasion}</span><span className="price">{money(product.price)}</span></div><h3><Link to="/producto/$id" params={{id:product.id}}>{product.name}</Link></h3><p>{product.description}</p><div className="product-actions"><Button onClick={handleAdd} disabled={!product.available} variant="outline" className="add-button">{added?<Check/>:<ShoppingBag/>}{added?"Agregado":product.available?"Agregar al carrito":"No disponible"}</Button><Button asChild variant="ghost" size="icon" aria-label={`Ver ${product.name}`} title={`Ver ${product.name}`}><Link to="/producto/$id" params={{id:product.id}}><ArrowUpRight/></Link></Button></div></div></article>
}
