import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, HeartHandshake, Leaf, Sprout, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shop/SiteShell";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros | Floravia Quito" },
      {
        name: "description",
        content:
          "Conoce Floravia, un espacio en Quito dedicado a flores, plantas y semillas para llenar de vida cada rincon.",
      },
      { property: "og:title", content: "Nosotros | Floravia Quito" },
      {
        property: "og:description",
        content: "Flores, plantas y semillas elegidas con carino para Quito.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: About,
});

const offerings = [
  {
    icon: Flower2,
    title: "Flores y arreglos",
    description:
      "Ramos, cajas, centros de mesa y disenos para celebrar, acompanar o recordar momentos importantes.",
  },
  {
    icon: Sprout,
    title: "Plantas",
    description:
      "Plantas de interior y exterior, suculentas y opciones con maceta para cada espacio y nivel de cuidado.",
  },
  {
    icon: Leaf,
    title: "Semillas",
    description:
      "Flores, hortalizas y hierbas aromaticas para empezar un pequeno jardin desde casa.",
  },
];

const values = [
  ["Frescura", "Elegimos cada producto pensando en su vitalidad y duracion."],
  ["Calidad", "Cuidamos los materiales, la presentacion y cada acabado."],
  ["Atencion personalizada", "Escuchamos tu idea para ayudarte a elegir mejor."],
  ["Puntualidad", "Coordinamos tus entregas a domicilio dentro de Quito."],
  ["Cuidado del ambiente", "Preferimos practicas y materiales que respeten la naturaleza."],
];

const reasons = [
  [Flower2, "Flores frescas", "Arreglos preparados con atencion al detalle y listos para regalar."],
  [Truck, "Entrega a domicilio en Quito", "Recibe tu pedido en la direccion y el horario coordinados."],
  [Sprout, "Asesoria para tus plantas", "Te orientamos para que cada planta encuentre su lugar y sus cuidados."],
  [HeartHandshake, "Arreglos a tu medida", "Convertimos una ocasion, un color o una idea en un detalle especial."],
] as const;

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Nosotros" }]} />
          <span className="eyebrow">Nuestra esencia</span>
          <h1 className="page-title">Naturaleza para celebrar la vida</h1>
          <p className="about-hero-lead">
            En Floravia reunimos flores, plantas y semillas para acompanarte y llenar de vida los espacios de Quito.
          </p>
        </div>
      </section>

      <main className="container info-page">
        <section className="about-story" aria-labelledby="historia-title">
          <div>
            <span className="eyebrow">Nuestra historia</span>
            <h2 id="historia-title">Un lugar para volver a lo esencial</h2>
          </div>
          <div className="about-story-copy">
            <p className="lead">
              Floravia nacio del deseo de compartir la belleza sencilla de una flor, una planta que crece con paciencia y una semilla llena de posibilidades.
            </p>
            <p>
              Empezamos seleccionando flores para ocasiones especiales y, con el tiempo, entendimos que nuestros clientes tambien buscaban llevar naturaleza a su hogar. Por eso hoy reunimos arreglos florales, plantas y semillas en un mismo espacio, con recomendaciones cercanas y el carino de un negocio local.
            </p>
            <p>
              Cada pedido se prepara pensando en la persona que lo recibe: el color, la ocasion, el espacio y ese pequeno detalle que hace que un regalo se sienta verdaderamente propio.
            </p>
          </div>
        </section>

        <section className="about-section" aria-labelledby="ofrecemos-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Todo para cultivar momentos</span>
              <h2 id="ofrecemos-title">Que ofrecemos</h2>
              <p>Encuentra algo bonito para regalar, decorar o empezar a cultivar.</p>
            </div>
          </div>
          <div className="offer-grid">
            {offerings.map(({ icon: Icon, title, description }) => (
              <article className="offer-card" key={title}>
                <span className="feature-icon"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="values-section" aria-labelledby="valores-title">
          <div className="values-intro">
            <span className="eyebrow">Nuestra mision</span>
            <h2 id="valores-title">Hacer que cuidar y regalar naturaleza sea mas cercano.</h2>
            <p>
              Trabajamos para que elegir flores, plantas o semillas sea una experiencia clara, calida y confiable, desde la primera consulta hasta la entrega.
            </p>
          </div>
          <div className="values-grid">
            {values.map(([title, description]) => (
              <div className="value-item" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section" aria-labelledby="elegirnos-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Lo que nos mueve</span>
              <h2 id="elegirnos-title">Por que elegirnos</h2>
            </div>
          </div>
          <div className="reasons-grid">
            {reasons.map(([Icon, title, description]) => (
              <article className="reason-item" key={title}>
                <Icon aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-cta" aria-labelledby="cta-title">
          <div>
            <span className="eyebrow">Hagamoslo especial</span>
            <h2 id="cta-title">Una flor, una planta o una semilla puede cambiar un dia.</h2>
          </div>
          <div className="about-cta-actions">
            <Button asChild size="lg"><Link to="/productos">Ver productos</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/contacto">Contactanos</Link></Button>
          </div>
        </section>
      </main>
    </div>
  );
}
