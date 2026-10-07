import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shop/SiteShell";

const CONTACT_INFO = {
  address: "[Sector/Calle], Quito, Ecuador",
  phone: "+593 9X XXX XXXX",
  email: "contacto@floravia.com",
  hours: "Lunes a sabado 08:00-19:00, domingos 09:00-14:00",
  whatsapp: "5939XXXXXXXX",
  instagram: "https://www.instagram.com/floravia",
  facebook: "https://www.facebook.com/floravia",
};

// Reemplaza este valor por tu endpoint de Formspree para activar los envios reales.
const FORM_ENDPOINT = "https://formspree.io/f/REEMPLAZAR_ENDPOINT";

const schema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre para continuar.").max(100),
  email: z.string().trim().email("Ingresa un correo electronico valido.").max(255),
  phone: z.string().trim().min(7, "Ingresa un telefono valido.").max(30),
  interest: z.string().min(1, "Selecciona una opcion."),
  message: z.string().trim().min(10, "Escribe un mensaje de al menos 10 caracteres.").max(1000),
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Floravia Quito" },
      {
        name: "description",
        content: "Escribenos para consultar por flores, plantas, semillas y entregas a domicilio en Quito.",
      },
      { property: "og:title", content: "Contacto | Floravia Quito" },
      { property: "og:description", content: "Estamos para ayudarte a elegir flores, plantas y semillas." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Contact,
});

const initialValues: FormValues = { name: "", email: "", phone: "", interest: "", message: "" };

function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const nextErrors: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormValues;
        nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      document.getElementById(String(result.error.issues[0]?.path[0]))?.focus();
      return;
    }

    setErrors({});
    setSending(true);

    try {
      if (FORM_ENDPOINT.includes("REEMPLAZAR_ENDPOINT")) {
        setStatus("Gracias. Te responderemos pronto.");
        setValues(initialValues);
      } else {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("No se pudo enviar el formulario.");
        setStatus("Gracias. Te responderemos pronto.");
        setValues(initialValues);
      }
    } catch {
      setStatus("No pudimos enviar tu mensaje. Escribenos por WhatsApp, por favor.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Contacto" }]} />
          <span className="eyebrow">Estamos para ayudarte</span>
          <h1 className="page-title">Hablemos de naturaleza</h1>
          <p className="contact-hero-lead">Cuentanos que tienes en mente y te ayudaremos a encontrar flores, plantas o semillas para tu proximo momento.</p>
        </div>
      </section>

      <main className="container info-page">
        <section className="contact-layout" aria-label="Informacion y formulario de contacto">
          <div className="contact-details">
            <span className="eyebrow">Visitanos o escribenos</span>
            <h2>Estamos cerca de ti</h2>
            <p className="lead">Atendemos consultas, pedidos especiales y recomendaciones para tus plantas.</p>
            <div className="contact-data">
              <p><MapPin aria-hidden="true" /><span><strong>Direccion</strong>{CONTACT_INFO.address}</span></p>
              <p><Phone aria-hidden="true" /><span><strong>Telefono / WhatsApp</strong>{CONTACT_INFO.phone}</span></p>
              <p><Mail aria-hidden="true" /><span><strong>Correo</strong>{CONTACT_INFO.email}</span></p>
              <p><span className="contact-data-icon" aria-hidden="true">⌚</span><span><strong>Horario</strong>{CONTACT_INFO.hours}</span></p>
            </div>
            <div className="contact-socials">
              <a className="whatsapp-link" href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Hola Floravia, quisiera recibir informacion sobre sus productos.")}`} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Escribir por WhatsApp</a>
              <div className="social-links" aria-label="Redes sociales">
                <a href={CONTACT_INFO.instagram} target="_blank" rel="noreferrer" aria-label="Instagram de Floravia"><Instagram aria-hidden="true" /></a>
                <a href={CONTACT_INFO.facebook} target="_blank" rel="noreferrer" aria-label="Facebook de Floravia"><Facebook aria-hidden="true" /></a>
              </div>
            </div>
          </div>

          <form className="contact-form contact-form-card" onSubmit={submit} noValidate>
            <h2>Envianos un mensaje</h2>
            <p>Completa tus datos y te responderemos pronto.</p>
            <div className="field-grid">
              <Field label="Nombre" id="name" value={values.name} error={errors.name} onChange={(value) => updateValue("name", value)} />
              <Field label="Correo electronico" id="email" type="email" value={values.email} error={errors.email} onChange={(value) => updateValue("email", value)} />
              <Field label="Telefono" id="phone" type="tel" value={values.phone} error={errors.phone} onChange={(value) => updateValue("phone", value)} />
              <div className="field">
                <label htmlFor="interest">Me interesa</label>
                <select id="interest" value={values.interest} aria-invalid={Boolean(errors.interest)} onChange={(event) => updateValue("interest", event.target.value)}>
                  <option value="">Selecciona una opcion</option>
                  <option>Flores</option>
                  <option>Plantas</option>
                  <option>Semillas</option>
                  <option>Pedido especial</option>
                  <option>Otro</option>
                </select>
                {errors.interest && <span className="field-error">{errors.interest}</span>}
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Mensaje</label>
              <textarea id="message" value={values.message} aria-invalid={Boolean(errors.message)} onChange={(event) => updateValue("message", event.target.value)} placeholder="Cuentanos como podemos ayudarte." />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>
            <Button type="submit" disabled={sending}>{sending ? "Enviando..." : "Enviar"}</Button>
            <p className="form-status" role="status" aria-live="polite">{status && (status.startsWith("Gracias") ? <><CheckCircle2 aria-hidden="true" />{status}</> : status)}</p>
          </form>
        </section>

        <section className="contact-map-section" aria-labelledby="mapa-title">
          <div>
            <span className="eyebrow">Encuentranos</span>
            <h2 id="mapa-title">Quito, Ecuador</h2>
          </div>
          {/* Reemplaza el src por la ubicacion exacta del local cuando tengas la direccion definitiva. */}
          <iframe className="contact-map" title="Mapa de Quito, Ecuador" src="https://www.google.com/maps?q=Quito%2C%20Ecuador&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </section>

        <section className="faq-section" aria-labelledby="faq-title">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2 id="faq-title">Lo que suelen preguntarnos</h2>
          <div className="faq-grid">
            <details><summary>¿A que zonas de Quito entregan?</summary><p>Coordinamos entregas dentro de Quito. Escribenos para confirmar cobertura y costo segun tu direccion.</p></details>
            <details><summary>¿Cuanto demora una entrega?</summary><p>Depende de la disponibilidad y del horario elegido. Para pedidos del mismo dia, consultanos antes de confirmar.</p></details>
            <details><summary>¿Pueden preparar pedidos para eventos?</summary><p>Si. Podemos conversar sobre cantidades, colores, estilo y presupuesto para celebraciones y eventos.</p></details>
            <details><summary>¿Como cuido mi planta?</summary><p>Te damos recomendaciones de luz, riego y ubicacion segun la especie que elijas.</p></details>
          </div>
        </section>

        <p className="contact-product-link">¿Prefieres mirar primero? <Link to="/productos">Explora flores, plantas y semillas</Link>.</p>
      </main>
    </div>
  );
}

function Field({ label, id, type = "text", value, error, onChange }: { label: string; id: keyof FormValues; type?: string; value: string; error?: string; onChange: (value: string) => void }) {
  return <div className="field"><label htmlFor={id}>{label}</label><input id={id} type={type} value={value} aria-invalid={Boolean(error)} onChange={(event) => onChange(event.target.value)} />{error && <span className="field-error">{error}</span>}</div>;
}
