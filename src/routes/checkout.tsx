import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shop/SiteShell";
import { DELIVERY, money, products } from "@/lib/products";
import { useStore } from "@/lib/store";
import "./checkout.css";
const steps = ["Información", "Entrega", "Pago", "Confirmación"];
export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido | Floravia Quito" },
      {
        name: "description",
        content:
          "Completa los datos de entrega y revisa tu pedido de flores en Quito. Compra simulada sin cobro real.",
      },
      { property: "og:title", content: "Finalizar pedido | Floravia Quito" },
      {
        property: "og:description",
        content: "Completa la entrega de tus flores y revisa tu pedido.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});
function Checkout() {
  const { cart, ready } = useStore();
  const [step, setStep] = useState(0);
  const lines = cart
    .map((line) => ({ line, product: products.find((p) => p.id === line.id) }))
    .filter(
      (x): x is { line: typeof x.line; product: NonNullable<typeof x.product> } => !!x.product,
    );
  const subtotal = lines.reduce((sum, { line, product }) => sum + line.quantity * product.price, 0);
  const total = subtotal + DELIVERY;
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  function field(key: string, label: string, type = "text", placeholder = "") {
    return (
      <div className="field">
        <label htmlFor={key}>{label}</label>
        <input
          id={key}
          type={type}
          placeholder={placeholder}
          maxLength={key === "phone" ? 10 : key === "address" ? 200 : 100}
        />
      </div>
    );
  }
  if (!ready)
    return (
      <div className="container">
        <div className="page-intro" role="status">
          Preparando tu pedido...
        </div>
      </div>
    );
  return (
    <div className="container">
      <div className="page-intro">
        <Breadcrumbs
          items={[
            { label: "Inicio", to: "/" },
            { label: "Carrito", to: "/carrito" },
            { label: "Finalizar pedido" },
          ]}
        />
        <span className="eyebrow">Ya casi está</span>
        <h1 className="page-title">Finalizar pedido</h1>
        <p>
          Completa tus datos y revisa todo antes de confirmar. No se realizará ningún cobro real.
        </p>
      </div>
      <ol className="checkout-progress" aria-label="Progreso del pedido">
        {steps.map((s, i) => (
          <li
            key={s}
            className={i === step ? "active" : ""}
            aria-current={i === step ? "step" : undefined}
          >
            {s}
          </li>
        ))}
      </ol>
      <div className="checkout-layout">
        <div className="checkout-form">
          {step === 0 && (
            <>
              <h2>Tu información</h2>
              <p>Usaremos estos datos solo para identificar el pedido simulado.</p>
              <div className="field-grid">
                {field("name", "Nombre y apellido", "text", "Tu nombre completo")}
                {field("email", "Correo electrónico", "email", "nombre@correo.com")}
              </div>
              {field("phone", "Teléfono celular (10 dígitos)", "tel", "09XXXXXXXX")}
            </>
          )}
          {step === 1 && (
            <>
              <h2>¿Dónde y cuándo entregamos?</h2>
              <p>
                La entrega simulada está disponible únicamente en Quito. Elige una fecha desde
                mañana.
              </p>
              {field(
                "address",
                "Dirección de entrega en Quito",
                "text",
                "Calle principal, número y sector",
              )}
              <div className="field">
                <label htmlFor="reference">Referencia para encontrar el lugar (opcional)</label>
                <textarea
                  id="reference"
                  maxLength={200}
                  placeholder="Edificio, piso o indicación útil"
                />
              </div>
              <div className="field-grid">
                {
                  <div className="field">
                    <label htmlFor="date">Fecha de entrega</label>
                    <input
                      id="date"
                      type="date"
                      min={minDate}
                    />
                  </div>
                }
                <div className="field">
                  <label htmlFor="slot">Horario de entrega</label>
                  <select
                    id="slot"
                  >
                    <option value="">Selecciona un horario</option>
                    <option value="09:00–12:00">09:00–12:00</option>
                    <option value="12:00–15:00">12:00–15:00</option>
                    <option value="15:00–18:00">15:00–18:00</option>
                  </select>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2>Método de pago</h2>
              <p>
                Esta tienda es una demostración. No se solicitarán datos bancarios ni se efectuará
                ningún cobro.
              </p>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />
                <span>
                  <strong>Pago contra entrega (simulado)</strong>
                  <small>Indicado solo como ejemplo de un método de pago.</small>
                </span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                />
                <span>
                  <strong>Transferencia (simulada)</strong>
                  <small>No se mostrarán cuentas bancarias ni se cobrará dinero.</small>
                </span>
              </label>
            </>
          )}
          {step === 3 && (
            <>
              <h2>Revisa tu pedido</h2>
              <p>
                Comprueba los detalles antes de confirmar. Esta acción registrará el pedido solo en
                este navegador.
              </p>
              <ul className="review-list">
                <li>
                  <strong>Contacto:</strong> Completa los campos visuales de contacto.
                </li>
                <li>
                  <strong>Dirección:</strong> Completa la dirección visual de entrega, Quito.
                </li>
                <li>
                  <strong>Entrega:</strong> Selecciona una fecha y horario visuales.
                </li>
                <li>
                  <strong>Pago:</strong>{" "}
                  Contra entrega (simulado)
                </li>
                {lines.map(({ line, product }) => (
                  <li key={line.id}>
                    {line.quantity} × {product.name} — {money(line.quantity * product.price)}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="form-actions">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStep(step - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <ArrowLeft /> Volver
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link to="/carrito">
                  <ArrowLeft /> Volver al carrito
                </Link>
              </Button>
            )}
            {step === 3 ? <Button asChild><Link to="/confirmacion"><Check /> Ver confirmación</Link></Button> : <Button type="button" onClick={() => setStep(step + 1)}>Continuar <ArrowRight /></Button>}
          </div>
        </div>
        <aside className="summary" aria-label="Resumen del pedido">
          <h2>Tu pedido</h2>
          {lines.map(({ line, product }) => (
            <div className="summary-row" key={line.id}>
              <span>
                {line.quantity} × {product.name}
              </span>
              <strong>{money(line.quantity * product.price)}</strong>
            </div>
          ))}
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Entrega en Quito</span>
            <strong>{money(DELIVERY)}</strong>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
          <p className="summary-note">
            Demostración académica: no se procesan pagos ni entregas reales.
          </p>
        </aside>
      </div>
    </div>
  );
}
