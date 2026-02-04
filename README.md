# SoftHub - Repositorio de Software Estudiantil

SoftHub es una plataforma de catálogo web diseñada para exhibir y centralizar los proyectos de software desarrollados por estudiantes. La aplicación actúa como un repositorio interactivo que extrae y presenta información directamente desde GitHub, permitiendo a los usuarios explorar, buscar y filtrar proyectos de manera eficiente.

## 🚀 Características Principales

*   **Catálogo Dinámico**: Visualización de tarjetas de proyectos con información en tiempo real.
*   **Integración con GitHub API**:
    *   Obtención automática de metadatos (estrellas, lenguaje, descripción, autor).
    *   Detección de lenguajes de programación con iconos visuales.
*   **Sistema de Búsqueda y Filtrado**:
    *   Búsqueda en tiempo real por nombre, autor o tecnología.
    *   Filtrado por categorías (Desarrollo, Educación, Utilidades, Juegos, Ciencia).
*   **Diseño Moderno y Responsivo**:
    *   Interfaz adaptada a dispositivos móviles y de escritorio.
    *   **Modo Oscuro/Claro**: Tema personalizable con persistencia de preferencias.
    *   Animaciones fluidas y transiciones agradables.
*   **Base de Datos Híbrida**:
    *   Combina registros manuales con un sistema de extracción automatizado que identifica enlaces de GitHub desde documentos de talleres entregados por estudiantes (`.docx`, `.txt`).

## 🛠️ Tecnologías Utilizadas

El proyecto está construido utilizando tecnologías web estándar modernas sin dependencias de frameworks pesados, garantizando rendimiento y facilidad de mantenimiento.

*   **HTML5**: Estructura semántica.
*   **CSS3**:
    *   Variables CSS (Custom Properties) para la gestión de temas.
    *   Flexbox y Grid para el diseño.
    *   Animaciones nativas.
    *   Iconos de [Bootstrap Icons](https://icons.getbootstrap.com/).
*   **JavaScript (ES6+)**:
    *   Lógica asíncrona (`async/await`) para consumo de APIs.
    *   Manipulación del DOM.
    *   Gestión de LocalStorage para preferencias de usuario.

## 📂 Estructura del Proyecto

```text
SoftHub/
├── css/
│   └── styles.css       # Estilos globales y temas
├── js/
│   ├── main.js          # Lógica principal y catálogo de apps
│   ├── github-api.js    # Cliente para la API de GitHub con caché
│   └── ratings.js       # Sistema de calificaciones (simulado)
├── TALLERES/            # Documentos fuente (Ignorado en repositrio público)
├── index.html           # Página principal
├── app.html             # Página de detalle de proyecto
└── README.md            # Documentación
```

## 🔧 Instalación y Uso

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/epimient/SoftHub.git
    cd SoftHub
    ```

2.  **Ejecutar localmente**:
    Debido a las políticas de seguridad de los navegadores (CORS) y el uso de módulos ES6, se recomienda ejecutar el proyecto a través de un servidor local.

    Con Python 3:
    ```bash
    python -m http.server 8080
    ```

    O con Node.js (http-server):
    ```bash
    npx http-server .
    ```

3.  **Acceder al sitio**:
    Abre tu navegador y visita `http://localhost:8080`.

## 🤝 Contribución

Este proyecto se alimenta de los trabajos entregados en la carpeta `TALLERES`. Para agregar un nuevo proyecto manualmente:

1.  Abre `js/main.js`.
2.  Busca el arreglo `SOFTWARE_CATALOG.apps`.
3.  Agrega un nuevo objeto con el ID y la URL del repositorio de GitHub.

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT.
