import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/confirmacion")({
  head: () => ({
    meta: [
      { title: "Pedido confirmado | Floravia Quito" },
      {
        name: "description",
        content: "Revisa la confirmación y el resumen de tu pedido simulado de flores en Quito.",
      },
      { property: "og:title", content: "Pedido confirmado | Floravia Quito" },
      { property: "og:description", content: "Resumen de la confirmación de tu pedido simulado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Confirmation,
});
function Confirmation() {
  return (
    <div className="container">
      <div className="success-page">
        <div className="success-icon">
          <Check size={35} />
        </div>
        <span className="eyebrow">Demostración visual</span>
        <h1>¡Todo listo!</h1>
        <p>
          Esta pantalla es una maqueta. No se guardaron datos, no se procesó ningún pago y no se
          realizó ningún envío.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            Volver a la tienda <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
