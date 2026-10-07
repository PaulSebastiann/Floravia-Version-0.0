import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shop/SiteShell";
import { ProductCard } from "@/components/shop/ProductCard";
import { products, occasions } from "@/lib/products";
export const Route = createFileRoute("/productos")({
  validateSearch: (search: Record<string, unknown>): { ocasion?: string; q?: string } => ({
    ...(typeof search["ocasion"] === "string" ? { ocasion: search["ocasion"] } : {}),
    ...(typeof search["q"] === "string" ? { q: search["q"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Catálogo de flores | Floravia Quito" },
      {
        name: "description",
        content:
          "Explora rosas, bouquets y arreglos florales en Quito. Filtra por ocasión, color, precio y disponibilidad.",
      },
      { property: "og:title", content: "Catálogo de flores | Floravia Quito" },
      { property: "og:description", content: "Elige flores frescas para cada ocasión en Quito." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});
function Catalog() {
  const filtered = products;
  return (
    <div className="container">
      <div className="page-intro">
        <Breadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Flores" }]} />
        <span className="eyebrow">Colección Floravia</span>
        <h1 className="page-title">Todas las flores</h1>
        <p>Encuentra el detalle perfecto para cada historia.</p>
      </div>
      <div className="catalog-layout">
        <aside className="filter-panel" aria-label="Filtros de productos">
          <h2>Filtrar flores</h2>
          <div className="filter-group">
            <h3>Categoría</h3>
            {["Bouquets", "Rosas", "Arreglos"].map((v) => (
              <label key={v}>
                <input
                  type="checkbox"
                />
                {v}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <h3>Ocasión</h3>
            {occasions.map((v) => (
              <label key={v}>
                <input
                  type="checkbox"
                />
                {v}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <h3>Color</h3>
            {["Rosa", "Blanco", "Multicolor"].map((v) => (
              <label key={v}>
                <input
                  type="checkbox"
                />
                {v}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <h3>Precio máximo: $80</h3>
            <label htmlFor="price-filter" className="sr-only">
              Precio máximo en dólares
            </label>
            <input
              id="price-filter"
              type="range"
              min="35"
              max="80"
              step="1"
              style={{ width: "100%" }}
            />
          </div>
          <div className="filter-group">
            <h3>Disponibilidad</h3>
            <label>
              <input
                type="checkbox"
              />{" "}
              Solo disponibles
            </label>
          </div>
          <Button variant="outline">
            Limpiar filtros
          </Button>
        </aside>
        <div>
          <div className="catalog-search">
            <label htmlFor="catalog-query" className="sr-only">
              Buscar en el catálogo
            </label>
            <input
              id="catalog-query"
              type="search"
              placeholder="Busca por nombre, flor u ocasión"
            />
          </div>
          <div className="catalog-controls">
            <p role="status">
              Mostrando {filtered.length} de {products.length} productos
            </p>
            <label>
              Ordenar por{" "}
              <select defaultValue="relevance">
                <option value="relevance">Relevancia</option>
                <option value="low">Precio: menor a mayor</option>
                <option value="high">Precio: mayor a menor</option>
                <option value="best">Más vendidos</option>
              </select>
            </label>
          </div>
          {filtered.length ? (
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Flower2 size={40} />
              <h2>No encontramos flores</h2>
              <p>Prueba con otra búsqueda o elimina algún filtro.</p>
              <Button>Ver todas las flores</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
