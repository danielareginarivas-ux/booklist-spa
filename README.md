# BookList SPA — Gestor de Libros Interactiva con Vue.js

Proyecto de evaluación del Modulo 6, para la Editorial Dany Agondi.

## Cómo correr el proyecto

```bash
npm install
npm run dev       # servidor de desarrollo (webpack-dev-server en http://localhost:5173)
npm run build      # build de producción (carpeta dist/)
```

## Estructura del proyecto


src/
├── App.vue                 # Layout raíz: header con navegación + router-view
├── main.js                 # Punto de entrada, registra Vue Router
├── style.css                # Estilos globales y variables de tema
├── data/
│   └── libros.js             # Estado reactivo compartido (store simple con reactive())
├── components/
│   ├── Libro.vue              # Tarjeta de un libro individual (props + evento eliminar)
│   └── FormularioLibro.vue     # Formulario para añadir libros (v-model, eventos)
├── views/
│   ├── InicioView.vue          # Ruta "/" - bienvenida, contador y estadísticas
│   ├── ListaLibros.vue          # Ruta "/libros" - catálogo, filtros, alta y baja
│   └── DetalleLibro.vue          # Ruta "/libros/:id" - detalle vía ruta dinámica
└── router/
    └── index.js                  # Configuración de Vue Router
```

## Decisiones tomadas por lección

**Lección 1 — Introducción a Vue.js**
`App.vue` sigue la estructura `template/script/style` y está escrito con la **Options API** (`data` / `methods`), tal como pide la consigna. Allí viven el contador reactivo (`contador` + `incrementarContador()`) y el nombre del usuario, visibles en el header de la app. Esto ilustra el patrón MVVM de forma explícita: `data()` es el **Modelo**, el `<template>` es la **Vista**, y la instancia Vue actúa como **ViewModel** sincronizando ambos sin manipular el DOM a mano.

> Nota sobre APIs: `App.vue` usa Options API por pedido explícito de la Lección 1. El resto de los componentes usa **Composition API** (`<script setup>`), que es el estilo recomendado en Vue 3 y facilita la reutilización de lógica. Ambas conviven sin problema en el mismo proyecto.

**Lección 2 — Templates y rendering**
`Libro.vue` muestra los datos de cada libro con `v-bind` (clases dinámicas, atributos `title`). En `ListaLibros.vue` se usa `v-for` para iterar el catálogo, `v-if`/`v-else` para el mensaje de "no hay libros disponibles", y `v-show` para mostrar/ocultar el botón "Limpiar filtros" solo cuando hay algún filtro activo.

**Lección 3 — Binding de formularios**
`FormularioLibro.vue` usa `v-model` (con el modificador `.trim`) en un `input`, un `select` y un `textarea` para capturar título, autor, categoría y descripción. Se agregó una vista previa en tiempo real que refleja los datos ingresados antes de enviar el formulario.

**Lección 4 — Manejo de eventos**
Se usa `@click` (delegado como evento `eliminar` desde `Libro.vue` hacia `ListaLibros.vue`) para dar de baja libros, `@submit.prevent` para evitar el recargo de página al enviar el formulario, `@keyup.enter` para permitir añadir un libro presionando Enter en los campos de título/autor, y `@click.once` en el botón de ayuda como ejemplo del modificador `.once`.

**Lección 5 — Manejo de rutas**
Se configuró Vue Router con las rutas `/`, `/libros` y `/libros/:id` (ruta dinámica). La ruta dinámica usa `props: true`, por lo que `DetalleLibro.vue` recibe el `id` como prop en vez de leerlo de `$route.params`. También se agregó una ruta comodín que redirige a `/` ante rutas inexistentes.

## Edición de libros

Además del alta y la baja, la SPA permite **editar** entradas existentes (requerido en la situación inicial del caso):

- El botón "Editar" de cada tarjeta emite un evento hacia `ListaLibros.vue`, que guarda el libro en `libroEditando`.
- `FormularioLibro.vue` recibe ese libro como prop y, mediante un `watch`, precarga los campos y cambia a modo edición (el botón pasa a decir "Guardar cambios" y aparece "Cancelar").
- La tarjeta en edición queda resaltada con la prop `destacado`.
- Desde `DetalleLibro.vue` también se puede editar: el enlace navega a `/libros?editar=:id` y la lista abre ese libro en el formulario al montarse.

## Estado global

Para no salirse del alcance del módulo (no se pidió Vuex/Pinia), el listado de libros vive en `src/data/libros.js` como un objeto `reactive()` exportado y compartido entre vistas y componentes, con los métodos `agregarLibro`, `actualizarLibro`, `eliminarLibro` y `obtenerPorId`. Esto permite que cualquier alta, edición o baja hecha desde cualquier vista se refleje inmediatamente en toda la app.

## Próximos pasos para escalar el sistema

- Reemplazar el store en memoria por una API REST real (persistencia).
- Sumar validaciones de formulario más robustas y mensajes de error por campo.
- Agregar Pinia si el estado global crece en complejidad.
- Tests unitarios de componentes con Vitest + Vue Test Utils.
