/* =====================================================
   SoftHub - Main JavaScript
   Lógica principal de la aplicación
   ===================================================== */

// Catálogo de software con URLs de GitHub
const SOFTWARE_CATALOG = {
    apps: [
        {
            id: "balldontlie-api",
            github_url: "https://github.com/Gobboso/BALLDONTLIE_API",
            category: "desarrollo",
            author_name: "Gabriel Garcia",
            featured: true
        },
        {
            id: "pokeapi",
            github_url: "https://github.com/monty0512/PokeAPI",
            category: "desarrollo",
            author_name: "Jhonatan Montalvo",
            featured: true
        },
        {
            id: "starwars-api",
            github_url: "https://github.com/luissm4/taller-starwars",
            category: "desarrollo",
            author_name: "Luis Muñoz Gaviria",
            featured: true
        },
        {
            id: "address-api",
            github_url: "https://github.com/D4ZH/addressAPI",
            category: "utilidades",
            author_name: "Miller Ferrer",
            featured: false
        },
        {
            id: "movie-api",
            github_url: "https://github.com/Chispacion/MOVIE_API",
            category: "desarrollo",
            author_name: "Sebastian Gamarra",
            featured: true
        },
        {
            id: "universidades-api",
            github_url: "https://github.com/jesusariza7/API-Universidades",
            category: "educacion",
            author_name: "Jesus Ariza",
            featured: false
        },
        {
            id: "joke-api",
            github_url: "https://github.com/pedromolinares1/joke_api_python",
            category: "desarrollo",
            author_name: "Pedro Molinares",
            featured: false
        },
        {
            id: "diplomado-taller",
            github_url: "https://github.com/IngIvanRoa/Taller-1-Diplomado-",
            category: "desarrollo",
            author_name: "Oscar Ivan Roa Bolaño",
            featured: false
        },
        {
            id: "metar-api",
            github_url: "https://github.com/SaironOsorio/METARAPI",
            category: "ciencia",
            author_name: "Sairon Osorio",
            featured: true
        },
        {
            id: "jaider-api",
            github_url: "https://github.com/JaiderSosa/API",
            category: "desarrollo",
            author_name: "Jaider Sosa Escorcia",
            featured: false
        },
        {
            id: "countries-api",
            github_url: "https://github.com/andradefernando197221-coder/API_Countries",
            category: "educacion",
            author_name: "Luis Fernando Andrade",
            featured: false
        },
        {
            id: "deportes-api",
            github_url: "https://github.com/andresmarquez9083-max/api_deportes",
            category: "juegos",
            author_name: "Andres Marquez",
            featured: false
        },
        {
            id: "noticias-api",
            github_url: "https://github.com/luismunoz1129/noticiaAleatoria",
            category: "utilidades",
            author_name: "Luis Gerardo Muñoz Ruiz",
            featured: true
        },
        {
            id: "api-bustamante",
            github_url: "https://github.com/luisbustamantedaniel-oss/Api",
            category: "desarrollo",
            author_name: "Luis Bustamante",
            featured: false
        }
,
        {
            id: "jhordangalindo-crypto-api",
            github_url: "https://github.com/jhordangalindo/crypto-api",
            category: "desarrollo",
            author_name: "jhordangalindo",
            featured: false
        },
        {
            id: "mdmguerra-api_giphy",
            github_url: "https://github.com/mdmguerra/api_giphy",
            category: "desarrollo",
            author_name: "mdmguerra",
            featured: false
        },
        {
            id: "jkevin10-padilla-taller-1",
            github_url: "https://github.com/JKevin10-Padilla/Taller-1",
            category: "desarrollo",
            author_name: "JKevin10-Padilla",
            featured: false
        },
        {
            id: "rafaelherrera13-taller-rick-final",
            github_url: "https://github.com/Rafaelherrera13/taller-rick-final",
            category: "desarrollo",
            author_name: "Rafaelherrera13",
            featured: false
        },
        {
            id: "wcarpintero-.api-rastreadora-de-ips",
            github_url: "https://github.com/WCarpintero/.API-rastreadora-de-IPs",
            category: "desarrollo",
            author_name: "WCarpintero",
            featured: false
        },
        {
            id: "danielandrade3030-appmovies-api",
            github_url: "https://github.com/danielandrade3030/appmovies-api",
            category: "desarrollo",
            author_name: "danielandrade3030",
            featured: false
        },
        {
            id: "mr-ink2-apiuniversity",
            github_url: "https://github.com/Mr-INK2/ApiUniversity",
            category: "desarrollo",
            author_name: "Mr-INK2",
            featured: false
        },
        {
            id: "rooney0803-diplomado.git",
            github_url: "https://github.com/ROONEY0803/diplomado.git",
            category: "desarrollo",
            author_name: "ROONEY0803",
            featured: false
        },
        {
            id: "leav-dev-api_paises_y_ciudades",
            github_url: "https://github.com/leav-dev/api_paises_y_ciudades",
            category: "desarrollo",
            author_name: "leav-dev",
            featured: false
        },
        {
            id: "jeidii72-taller_api_paises.git",
            github_url: "https://github.com/Jeidii72/Taller_Api_Paises.git",
            category: "desarrollo",
            author_name: "Jeidii72",
            featured: false
        },
        {
            id: "jesnayder-api_divisas",
            github_url: "https://github.com/jesnayder/api_divisas",
            category: "desarrollo",
            author_name: "jesnayder",
            featured: false
        },
        {
            id: "marialeja20-pokeapi.git",
            github_url: "https://github.com/Marialeja20/PokeApi.git",
            category: "desarrollo",
            author_name: "Marialeja20",
            featured: false
        },
        {
            id: "canascdaniel-hue-api_riackandmorty",
            github_url: "https://github.com/canascdaniel-hue/api_RiackAndMorty",
            category: "desarrollo",
            author_name: "canascdaniel-hue",
            featured: false
        },
        {
            id: "umdm24-nasa-epic-api",
            github_url: "https://github.com/UMDM24/NASA-EPIC-API",
            category: "desarrollo",
            author_name: "UMDM24",
            featured: false
        }
    ],
    categories: [
        { id: "educacion", name: "Educación", icon: "bi-mortarboard", color: "#10b981" },
        { id: "desarrollo", name: "Desarrollo", icon: "bi-code-slash", color: "#8b5cf6" },
        { id: "utilidades", name: "Utilidades", icon: "bi-tools", color: "#f59e0b" },
        { id: "juegos", name: "Juegos", icon: "bi-controller", color: "#ef4444" },
        { id: "ciencia", name: "Ciencia", icon: "bi-graph-up", color: "#3b82f6" }
    ]
};

// Estado de la aplicación
const AppState = {
    apps: [],
    filteredApps: [],
    currentCategory: 'all',
    isLoading: true,
    searchQuery: ''
};

/* =====================================================
   Inicialización
   ===================================================== */

document.addEventListener('DOMContentLoaded', async () => {
    // Inicializar tema
    initTheme();

    // Renderizar categorías
    renderCategories();

    // Cargar software
    await loadSoftware();

    // Inicializar búsqueda
    initSearch();

    // Inicializar filtros
    initFilters();
});

/* =====================================================
   Tema Claro/Oscuro
   ===================================================== */

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('softhub_theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('softhub_theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
}

/* =====================================================
   Renderizado de Categorías
   ===================================================== */

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    let html = '';

    for (const cat of SOFTWARE_CATALOG.categories) {
        const count = SOFTWARE_CATALOG.apps.filter(a => a.category === cat.id).length;
        html += `
            <div class="col-6 col-md-4 col-lg animate-fade-in" style="animation-delay: ${SOFTWARE_CATALOG.categories.indexOf(cat) * 0.1}s">
                <a href="#apps" class="category-card" data-category="${cat.id}">
                    <i class="bi ${cat.icon}" style="color: ${cat.color}"></i>
                    <h5>${cat.name}</h5>
                    <span>${count} proyecto${count !== 1 ? 's' : ''}</span>
                </a>
            </div>
        `;
    }

    grid.innerHTML = html;

    // Eventos de clic en categorías
    grid.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const category = card.dataset.category;
            filterByCategory(category);

            // Scroll a la sección de apps
            document.getElementById('apps').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/* =====================================================
   Carga de Software desde GitHub
   ===================================================== */

async function loadSoftware() {
    const spinner = document.getElementById('loadingSpinner');
    const popularGrid = document.getElementById('popularApps');
    const allGrid = document.getElementById('allApps');

    AppState.isLoading = true;

    // Cargar información de cada app desde GitHub
    const promises = SOFTWARE_CATALOG.apps.map(async (app) => {
        const info = await GitHubAPI.getSoftwareInfo(app.github_url);
        if (info) {
            // Obtener calificaciones
            const ratings = await RatingsSystem.getRatings(info.id);
            const avgRating = RatingsSystem.calculateAverage(ratings);

            return {
                ...app,
                ...info,
                avgRating: avgRating,
                totalRatings: ratings.length
            };
        }
        return null;
    });

    const results = await Promise.all(promises);
    AppState.apps = results.filter(app => app !== null);
    AppState.filteredApps = [...AppState.apps];

    // Ocultar spinner
    if (spinner) spinner.style.display = 'none';

    // Actualizar estadísticas
    updateStats();

    // Renderizar apps populares (featured)
    renderPopularApps();

    // Renderizar todas las apps
    renderAllApps();

    // Renderizar botones de filtro
    renderFilterButtons();

    AppState.isLoading = false;
}

function updateStats() {
    const totalApps = document.getElementById('totalApps');
    const totalStudents = document.getElementById('totalStudents');

    if (totalApps) {
        animateNumber(totalApps, AppState.apps.length);
    }

    if (totalStudents) {
        // Contar autores únicos
        const uniqueAuthors = new Set(AppState.apps.map(a => a.author_name || a.author));
        animateNumber(totalStudents, uniqueAuthors.size);
    }
}

function animateNumber(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 20);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current;
    }, 50);
}

/* =====================================================
   Renderizado de Apps
   ===================================================== */

function renderPopularApps() {
    const grid = document.getElementById('popularApps');
    if (!grid) return;

    const popular = AppState.apps.filter(app => app.featured).slice(0, 4);
    grid.innerHTML = popular.map((app, index) => createAppCard(app, index)).join('');
}

function renderAllApps() {
    const grid = document.getElementById('allApps');
    if (!grid) return;

    if (AppState.filteredApps.length === 0) {
        grid.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="bi bi-search"></i>
                    <h5>No se encontraron proyectos</h5>
                    <p>Intenta con otros términos de búsqueda o categoría</p>
                </div>
            </div>
        `;
        return;
    }

    grid.innerHTML = AppState.filteredApps.map((app, index) => createAppCard(app, index)).join('');
}

function createAppCard(app, index = 0) {
    const languageIcon = GitHubAPI.getLanguageIcon(app.language);
    const categoryInfo = SOFTWARE_CATALOG.categories.find(c => c.id === app.category) || {};

    return `
        <div class="col-12 col-md-6 col-xl-4 animate-fade-in" style="animation-delay: ${index * 0.1}s">
            <a href="app.html?id=${encodeURIComponent(app.id)}&url=${encodeURIComponent(app.github_url)}" class="app-card-link">
                <article class="app-card">
                    <div class="app-card-header">
                        <div class="app-icon" style="background: linear-gradient(135deg, ${categoryInfo.color || '#8b5cf6'}, ${categoryInfo.color || '#8b5cf6'}dd)">
                            <i class="bi ${languageIcon}"></i>
                        </div>
                        <div class="app-info">
                            <h5>${escapeHtml(app.name)}</h5>
                            <span class="author">
                                <i class="bi bi-person-circle"></i>
                                ${escapeHtml(app.author_name || app.author)}
                            </span>
                        </div>
                    </div>
                    <div class="app-card-body">
                        <p>${escapeHtml(app.description)}</p>
                    </div>
                    <div class="app-card-footer">
                        <div class="app-badges">
                            <span class="badge-custom language">
                                <i class="bi ${languageIcon}"></i>
                                ${app.language}
                            </span>
                            <span class="badge-custom">
                                <i class="bi bi-star-fill" style="color: #fbbf24;"></i>
                                ${app.stars}
                            </span>
                        </div>
                        ${app.avgRating > 0 ? `
                            <div class="app-rating">
                                <i class="bi bi-star-fill"></i>
                                <span>${app.avgRating}</span>
                            </div>
                        ` : ''}
                    </div>
                </article>
            </a>
        </div>
    `;
}

/* =====================================================
   Filtros
   ===================================================== */

function renderFilterButtons() {
    const container = document.getElementById('filterButtons');
    if (!container) return;

    let html = `
        <button class="btn btn-filter active" data-category="all">
            <i class="bi bi-infinity me-1"></i>Todos
        </button>
    `;

    for (const cat of SOFTWARE_CATALOG.categories) {
        const count = AppState.apps.filter(a => a.category === cat.id).length;
        if (count > 0) {
            html += `
                <button class="btn btn-filter" data-category="${cat.id}">
                    <i class="bi ${cat.icon} me-1"></i>${cat.name}
                </button>
            `;
        }
    }

    container.innerHTML = html;
}

function initFilters() {
    const container = document.getElementById('filterButtons');
    if (!container) return;

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-filter');
        if (!btn) return;

        // Actualizar estado activo
        container.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filtrar
        const category = btn.dataset.category;
        filterByCategory(category);
    });
}

function filterByCategory(category) {
    AppState.currentCategory = category;

    if (category === 'all') {
        AppState.filteredApps = [...AppState.apps];
    } else {
        AppState.filteredApps = AppState.apps.filter(app => app.category === category);
    }

    // Aplicar búsqueda si hay texto
    if (AppState.searchQuery) {
        applySearchFilter();
    }

    renderAllApps();

    // Actualizar botón activo
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
}

/* =====================================================
   Búsqueda
   ===================================================== */

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            AppState.searchQuery = e.target.value.toLowerCase().trim();
            applySearchFilter();
            renderAllApps();
        }, 300);
    });
}

function applySearchFilter() {
    const query = AppState.searchQuery;

    if (!query) {
        // Si no hay búsqueda, solo aplicar filtro de categoría
        if (AppState.currentCategory === 'all') {
            AppState.filteredApps = [...AppState.apps];
        } else {
            AppState.filteredApps = AppState.apps.filter(app => app.category === AppState.currentCategory);
        }
        return;
    }

    // Filtrar primero por categoría
    let apps = AppState.currentCategory === 'all'
        ? AppState.apps
        : AppState.apps.filter(app => app.category === AppState.currentCategory);

    // Luego filtrar por búsqueda
    AppState.filteredApps = apps.filter(app => {
        return (
            app.name?.toLowerCase().includes(query) ||
            app.description?.toLowerCase().includes(query) ||
            app.author?.toLowerCase().includes(query) ||
            app.author_name?.toLowerCase().includes(query) ||
            app.language?.toLowerCase().includes(query)
        );
    });
}

/* =====================================================
   Utilidades
   ===================================================== */

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
