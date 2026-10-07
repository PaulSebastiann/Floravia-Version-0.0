import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StoreProvider } from "@/lib/store";
import { SiteHeader, SiteFooter } from "@/components/shop/SiteShell";
import { Button } from "@/components/ui/button";
function NotFoundComponent() {
  return (
    <div className="container empty-state">
      <h1>Página no encontrada</h1>
      <p>Esta página no existe o cambió de dirección.</p>
      <Button asChild>
        <Link to="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="container empty-state">
      <h1>No pudimos abrir esta página</h1>
      <p>Intenta nuevamente o vuelve al inicio.</p>
      <Button
        onClick={() => {
          router.invalidate();
          reset();
        }}
      >
        Intentar de nuevo
      </Button>{" "}
      <Button asChild variant="outline">
        <Link to="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "./favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <SiteHeader />
        <main id="contenido">
          <Outlet />
        </main>
        <SiteFooter />
      </StoreProvider>
    </QueryClientProvider>
  );
}
