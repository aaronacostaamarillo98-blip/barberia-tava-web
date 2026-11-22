# DESIGN.md · Barbería Tava

Identidad visual de la web. Cualquier agente que edite esta web o haga piezas para ella (anuncios, posteos, secciones nuevas) sigue estas reglas.

## Esencia
Barbería de barrio en Luque, con oficio y sin vueltas. Se siente premium pero cercana: noche, cuero, dorado. Promesa: **tu corte, sin esperar** (turno en un toque por WhatsApp, precios a la vista).

## Colores
| Rol | Hex | Uso |
|---|---|---|
| Fondo | `#0d0c0b` | Fondo general |
| Fondo 2 | `#161412` | Secciones alternas |
| Tarjeta | `#1c1916` | Tarjetas de servicios, turnos, info |
| Texto | `#efe6d6` | Texto principal (crema) |
| Texto suave | `#a89d8b` | Bajadas, descripciones |
| Dorado | `#c9a24c` | Marca, botones, precios, acentos |
| Dorado claro | `#e6c477` | Hover y foco |
| Rojo poste | `#b8322a` | Solo en el poste de barbero |
| Línea | `rgba(239,230,214,.10)` | Bordes y separadores |

Botón principal: fondo dorado y texto `#17120a`. Nunca texto blanco sobre dorado.

## Tipografía
- Títulos: **Oswald** 600–700, MAYÚSCULAS, interlineado 0,98–1,1.
- Texto: **Manrope** 400–700.
- Etiquetas (eyebrow): Manrope 600, 13 px, mayúsculas, espaciado 0,22 em, con una línea dorada antes.

## Componentes
- Botones redondeados (pill, radio 999 px). Principal dorado; secundario con borde de línea.
- Tarjetas con radio de 24–28 px, borde de línea y hover que sube 4 px y pasa el borde a dorado.
- El servicio destacado lleva la etiqueta dorada "El más pedido".
- Iconos: **Lucide** (trazo de 2 px, en dorado). Sin emojis como iconos.
- Botón flotante de WhatsApp verde `#25d366` abajo a la derecha.

## Voz
Voseo paraguayo, frases cortas y directas: "Elegí el día y la hora", "Sin audios, sin filas". Nada de promesas exageradas ni datos inventados (reseñas, cantidad de clientes).

## Movimiento
- **GSAP + ScrollTrigger** (autoalojados en `js/`): el título del inicio entra palabra por palabra, las secciones y tarjetas suben suave al hacer scroll. Curvas `expo.out` / `power3.out`, nunca rebote en textos.
- **Lottie** (`anim/check.json`): tilde que se dibuja para confirmar acciones (turno confirmado, producto agregado).
- Todo el movimiento vive en `js/motion.js`. Sin JS el contenido se ve completo; con `prefers-reduced-motion` no se anima nada.

## Calidad
- Contraste mínimo 4,5:1 en el texto.
- Foco visible con `:focus-visible` en dorado claro.
- Se respeta `prefers-reduced-motion`.
- Se prueba en 375 px, 768 px y 1440 px, sin desborde horizontal.

## En anuncios
Fondo negro con dorado y tipografía Oswald en mayúsculas. Mostrar la web real dentro de un MacBook o iPhone realista. Sin el poste de barbero como decoración suelta.

Sitio creado por aravora.
