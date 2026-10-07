# Floravia — tienda de flores de demostración para Quito

## Ejecución
Este proyecto corre sobre la plantilla TanStack Start de Lovable. Instala dependencias con `bun install` y ejecuta `bun run dev`. Abre `http://localhost:8080`. No hay servidor de datos ni pagos reales. La petición de HTML/CSS/JavaScript vanilla se adaptó al runtime fijo del proyecto; la interfaz utiliza React/TypeScript, CSS y rutas TanStack. No hay páginas HTML independientes.

### Windows con Node.js

Si PowerShell bloquea `npm.ps1`, usa los comandos `.cmd` desde esta carpeta:

```powershell
npm.cmd install
npm.cmd run dev
```

Para abrir la aplicación desde otra computadora conectada a la misma red, inicia el servidor así:

```powershell
npm.cmd run dev -- --host 0.0.0.0
```

Consulta la dirección IPv4 con `ipconfig` y abre `http://TU-IP:8080` en la otra computadora. El servidor debe permanecer abierto y Windows puede pedir permiso en el firewall.

## Estructura
- `src/routes/`: inicio, catálogo, detalle, carrito, checkout, confirmación, nosotros y contacto.
- `src/components/shop/`: cabecera, pie, migas y tarjetas compartidas.
- `src/lib/products.ts`: 12 productos ficticios, precios y tarifa de entrega.
- `src/lib/store.tsx`: operaciones y persistencia local del carrito.
- `src/styles.css`: variables semánticas, estilos, animaciones y adaptación móvil.
- `src/assets/`: fotografías generadas para la interfaz.

## Flujo de compra y modelo mental
Descubrir en inicio → explorar y filtrar en catálogo → seleccionar en detalle → agregar → revisar y modificar en carrito → ingresar contacto, entrega y pago simulado → revisar → confirmar. Usa enlaces claros y migas para volver sin perder el contexto. El carrito se conserva en `localStorage`; la confirmación del pedido queda en `sessionStorage` de la pestaña. Para conectar un backend, se sustituiría el módulo de datos y la persistencia del carrito por servicios remotos, conservando la interfaz.

## Heurísticas de Nielsen aplicadas
1. **Estado visible:** contador, aviso accesible al agregar, resumen y progreso de compra.
2. **Mundo real:** ocasiones, ramos, horarios y precios en USD con entrega en Quito.
3. **Control y libertad:** volver, reducir cantidad, eliminar y limpiar filtros.
4. **Consistencia:** cabecera, botones, tarjetas, títulos y navegación compartidos.
5. **Prevención de errores:** no se pueden agregar flores agotadas; cantidad acotada; checkout vacío bloqueado.
6. **Reconocimiento:** tarjetas con foto, precio y disponibilidad; resumen permanente al comprar.
7. **Flexibilidad:** búsqueda, filtros, ordenamiento y accesos directos por ocasión.
8. **Minimalismo:** pasos cortos y opciones agrupadas, sin datos bancarios innecesarios.
9. **Recuperación:** errores específicos junto al campo y estados vacíos con salida clara.
10. **Ayuda:** contacto con preguntas frecuentes y aclaraciones sobre la simulación.

## WCAG 2.2: cuatro principios
- **Perceptible:** texto alternativo para fotos informativas, etiquetas visibles y mensajes que usan palabras además del color.
- **Operable:** elementos nativos activables con teclado, salto al contenido, foco visible, controles de 44 px y sin barreras al cerrar navegación móvil.
- **Comprensible:** lenguaje cotidiano, navegación consistente, límites explicados y errores contextualizados.
- **Robusto:** encabezados, `main`, `nav`, formularios semánticos, enlaces para navegación y botones para acciones; ARIA solo para estado dinámico.

## Microinteracciones y tareas de evaluación
Entrada sutil de portada, elevación de categorías, zoom leve en fotos, feedback de agregar, aviso de acciones y animación de confirmación; todas se desactivan con `prefers-reduced-motion`. Comprobar antes de presentar: recorrido TAB/Shift+TAB/Enter/Espacio/Escape, lectura con lector de pantalla, ampliación al 200 %, contraste en dispositivos reales, errores de fecha/teléfono/correo, búsqueda sin resultados, persistencia tras recarga, pantalla pequeña, cantidad máxima, y retorno desde checkout. Las fotografías y testimonios son ilustrativos, no afirmaciones verificadas de un negocio activo. No se adjuntó PDF académico en este entorno; este documento se basa solo en los requisitos descritos por el usuario.
