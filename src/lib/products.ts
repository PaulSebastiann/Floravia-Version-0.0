import roses from "@/assets/bouquet-roses.jpg";
import white from "@/assets/bouquet-white.jpg";
import color from "@/assets/bouquet-color.jpg";

export type Product = { id: string; name: string; price: number; category: string; occasion: string; color: string; image: string; description: string; available: boolean; bestseller: number; stems: string };
export const products: Product[] = [
  {id:"primavera",name:"Ramo Primavera",price:42,category:"Bouquets",occasion:"Cumpleaños",color:"Multicolor",image:color,description:"Rosas, ranúnculos y flores de temporada en una mezcla luminosa.",available:true,bestseller:1,stems:"Rosas, ranúnculos y follaje fresco"},
  {id:"rosas-eternas",name:"Rosas Eternas",price:55,category:"Rosas",occasion:"Amor",color:"Rosa",image:roses,description:"Rosas de jardín en tonos rosados, un gesto que perdura.",available:true,bestseller:2,stems:"Rosas de jardín y eucalipto"},
  {id:"jardin-quiteno",name:"Jardín Quiteño",price:49,category:"Bouquets",occasion:"Graduación",color:"Multicolor",image:color,description:"Un jardín de color inspirado en la primavera de Quito.",available:true,bestseller:4,stems:"Flores de temporada y follaje"},
  {id:"amor-clasico",name:"Amor Clásico",price:58,category:"Rosas",occasion:"Aniversario",color:"Rosa",image:roses,description:"Una declaración romántica con rosas cuidadosamente elegidas.",available:true,bestseller:3,stems:"Rosas premium y verdes delicados"},
  {id:"elegancia-blanca",name:"Elegancia Blanca",price:52,category:"Arreglos",occasion:"Condolencias",color:"Blanco",image:white,description:"Flores blancas y verdes suaves para acompañar con respeto.",available:true,bestseller:5,stems:"Rosas blancas, hortensias y eucalipto"},
  {id:"atardecer-floral",name:"Atardecer Floral",price:46,category:"Bouquets",occasion:"Cumpleaños",color:"Multicolor",image:color,description:"Tonos cálidos para celebrar los momentos especiales.",available:true,bestseller:6,stems:"Ranúnculos, rosas y flores de temporada"},
  {id:"bouquet-romance",name:"Bouquet Romance",price:62,category:"Rosas",occasion:"Amor",color:"Rosa",image:roses,description:"Un bouquet abundante para decirlo todo sin palabras.",available:true,bestseller:7,stems:"Rosas de jardín y follaje"},
  {id:"primavera-andina",name:"Primavera Andina",price:44,category:"Bouquets",occasion:"Graduación",color:"Multicolor",image:color,description:"Texturas naturales y flores alegres para nuevos comienzos.",available:true,bestseller:8,stems:"Rosas, ranúnculos y verdes frescos"},
  {id:"luz-de-luna",name:"Luz de Luna",price:57,category:"Arreglos",occasion:"Aniversario",color:"Blanco",image:white,description:"Elegancia serena en blanco para una ocasión inolvidable.",available:true,bestseller:9,stems:"Rosas, lisianthus y hortensias"},
  {id:"abrazo-rosa",name:"Abrazo Rosa",price:39,category:"Rosas",occasion:"Cumpleaños",color:"Rosa",image:roses,description:"Un detalle tierno y fresco para alegrar el día.",available:true,bestseller:10,stems:"Rosas rosadas y eucalipto"},
  {id:"paz-blanca",name:"Paz Blanca",price:48,category:"Arreglos",occasion:"Condolencias",color:"Blanco",image:white,description:"Un mensaje de compañía expresado con flores blancas.",available:true,bestseller:11,stems:"Rosas blancas y follaje suave"},
  {id:"susurro-floral",name:"Susurro Floral",price:45,category:"Bouquets",occasion:"Cualquier ocasión",color:"Multicolor",image:color,description:"Belleza espontánea para regalar porque sí.",available:false,bestseller:12,stems:"Flores mixtas de temporada"},
];
export const occasions = ["Cumpleaños","Amor","Aniversario","Condolencias","Graduación","Cualquier ocasión"];
export const money = (value: number) => new Intl.NumberFormat("es-EC",{style:"currency",currency:"USD"}).format(value);
export const DELIVERY = 5;
