# SoftHub - Repositorio de Software Estudiantil

SoftHub es una plataforma de catálogo web diseñada para exhibir y centralizar los proyectos de software desarrollados por estudiantes. La aplicación actúa como un repositorio interactivo que extrae y presenta información directamente desde GitHub, permitiendo a los usuarios explorar, buscar y filtrar proyectos de manera eficiente.

## 🚀 Características Principales

*   **Catálogo Dinámico e Inteligente**: Visualización de tarjetas de proyectos con carga híbrida (datos locales + GitHub API).
*   **Optimización de Datos**: Utiliza `projects.json` como base de datos local para carga instantánea, reduciendo dependencias de red.
*   **Integración con GitHub API**:
    *   Obtención de READMEs y lenguajes en tiempo real.
    *   Fallback automático a la API si el proyecto no está en el índice local.
    *   Limpieza y formateo de datos (Base64) para una visualización perfecta.
*   **Sistema de Búsqueda y Filtrado**:
    *   Búsqueda en tiempo real por nombre, autor o tecnología.
    *   Filtrado por categorías (Desarrollo, Educación, Utilidades, Juegos, Ciencia).
*   **Diseño Premium y Responsivo**:
    *   **Modo Oscuro/Claro**: Tema personalizable con persistencia.
    *   **Refactorización CSS**: Estilos modulares y optimizados para legibilidad.
    *   Accesibilidad garantizada en todos los temas.
*   **Herramienta de Administración Local**: Panel exclusivo para gestores que automatiza la adición de nuevos repositorios.

## 🛠️ Tecnologías Utilizadas

*   **HTML5 & CSS3**: Diseño modular con variables CSS para temas dinámicos.
*   **Bootstrap 5**: Estructura responsiva y componentes modernos.
*   **JavaScript (ES6+)**: Consumo de APIs con `async/await` y gestión de caché local.
*   **Marked.js**: Renderizado de Markdown para los READMEs.

## 📂 Estructura del Proyecto

```text
SoftHub/
├── css/
│   ├── styles.css       # Estilos globales y sistema de diseño
│   ├── app.css          # Estilos específicos de la página de detalle
│   └── admin.css        # Estilos para el panel de administración
├── data/
│   └── projects.json    # Base de datos centralizada de proyectos
├── js/
│   ├── main.js          # Lógica de la página principal y filtrado
│   ├── github-api.js    # Cliente API con manejo de errores y caché
│   └── ratings.js       # Gestión de calificaciones y comentarios
├── admin.html           # Panel de gestión (Local-only, gitignored)
├── index.html           # Portal principal
├── app.html             # Vista de detalle de software
└── README.md            # Documentación técnica
```

## 🔧 Instalación y Gestión

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/epimient/SoftHub.git
    cd SoftHub
    ```

2.  **Servidor Local**:
    Recomendado para evitar bloqueos de CORS y manejar correctamente los módulos JS.
    ```bash
    # Python 3
    python -m http.server 8080
    # O Node.js
    npx http-server .
    ```

## 🛠️ Administración del Catálogo

Para agregar nuevos proyectos, el sistema incluye una herramienta automatizada:

1.  Abre **`admin.html`** localmente en tu navegador.
2.  Pega las URLs de GitHub de los proyectos estudiantiles.
3.  El sistema obtendrá automáticamente los metadatos.
4.  Descarga el archivo generado y reemplaza `data/projects.json`.

> **Nota de Seguridad**: El archivo `admin.html` y sus estilos están en el `.gitignore` por seguridad. No se suben al servidor público para evitar accesos no autorizados al flujo de gestión.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
```javascript
// Creado por: Ing. Eduardo Pimienta
```
