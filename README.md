# 🪂 Sunview Park Adventure — Web

Sitio web estático, **bilingüe (ES/EN)** y totalmente **responsive** para *Sunview Park Adventure*, el parque de aventuras más grande de Málaga (Alhaurín de la Torre), cuya atracción estrella es la **tirolina de 1.350 m**, la más larga de Andalucía.

> Proyecto de práctica/portfolio. Maquetado desde cero con **HTML5, CSS3 y JavaScript vanilla**, sin frameworks ni librerías externas.

## ✨ Características

- 🌍 **Dos idiomas** — versión en español (raíz) e inglés (`/en/`) con selector ES/EN en la barra de navegación.
- 📱 **Mobile-first y responsive** — menú hamburguesa, rejillas fluidas y layouts a ancho completo.
- 🎨 **Sistema de diseño con variables CSS** — toda la paleta (extraída del logo) se controla desde `:root`, fácil de re-tematizar.
- ⚡ **JavaScript vanilla** — menú móvil, scroll suave, animaciones *reveal* al hacer scroll (IntersectionObserver) y validación del formulario de contacto.
- 🎟️ **Preparado para Turitop** — botones de "Comprar entradas" y huecos marcados para el widget de ticketing.
- 🗺️ Formulario de contacto + mapa de Google embebido.
- ♿ Buenas prácticas de accesibilidad (etiquetas ARIA, textos alternativos, `prefers-reduced-motion`).

## 📂 Estructura

```
.
├── index.html          # Inicio (ES)
├── actividades.html    # Actividades (ES)
├── packs.html          # Packs y precios (ES)
├── eventos.html        # Eventos (ES)
├── contacto.html       # Contacto + mapa (ES)
├── en/                 # Versión en inglés
│   ├── index.html
│   ├── activities.html
│   ├── packs.html
│   ├── events.html
│   └── contact.html
├── style.css           # Hoja de estilos única (variables CSS)
├── main.js             # JavaScript (compartido por ambos idiomas)
└── images/             # Logo y fotografías
```

## 🚀 Uso

No necesita compilación ni servidor: basta con abrir `index.html` en el navegador.

Para servirlo en local (recomendado para que el formulario y las rutas funcionen igual que en producción):

```bash
# Con Python instalado
python -m http.server 8000
# Luego abre http://localhost:8000
```

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (Custom Properties, Grid, Flexbox, `clamp()`)
- JavaScript ES6 (vanilla)
- Tipografía: [Poppins](https://fonts.google.com/specimen/Poppins)

## 📝 Notas

- El widget de venta de entradas (**Turitop**) está marcado con comentarios `<!-- WIDGET TURITOP -->` listos para pegar el código de integración.
- El teléfono y el email del formulario son provisionales y deben sustituirse por los reales.

---

📍 C. Comedias, 29130 Alhaurín de la Torre, Málaga ·
[Facebook](https://www.facebook.com/sunviewparkadventure) ·
[Instagram](https://www.instagram.com/sunviewparkadventure)
