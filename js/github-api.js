/* =====================================================
   GitHub API Integration
   Manejo de llamadas a la API de GitHub con cache local
   ===================================================== */

const GitHubAPI = {
    // Base URL de la API de GitHub
    baseUrl: 'https://api.github.com',
    
    // Cache local para evitar llamadas repetidas
    cache: new Map(),
    cacheExpiry: 30 * 60 * 1000, // 30 minutos
    
    /**
     * Parsea una URL de GitHub para extraer owner y repo
     * @param {string} url - URL del repositorio de GitHub
     * @returns {object|null} - {owner, repo} o null si no es válida
     */
    parseGitHubUrl(url) {
        try {
            // Patrones soportados:
            // https://github.com/owner/repo
            // https://github.com/owner/repo/tree/branch
            // github.com/owner/repo
            const patterns = [
                /github\.com\/([^\/]+)\/([^\/\s]+)/,
            ];
            
            for (const pattern of patterns) {
                const match = url.match(pattern);
                if (match) {
                    return {
                        owner: match[1],
                        repo: match[2].replace(/\.git$/, '').split('/')[0]
                    };
                }
            }
            return null;
        } catch (e) {
            console.error('Error parsing GitHub URL:', e);
            return null;
        }
    },
    
    /**
     * Obtiene datos del cache si están disponibles y no expiraron
     * @param {string} key - Clave del cache
     * @returns {any|null} - Datos del cache o null
     */
    getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    },
    
    /**
     * Guarda datos en el cache
     * @param {string} key - Clave del cache
     * @param {any} data - Datos a guardar
     */
    saveToCache(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
        
        // También guardar en localStorage para persistencia
        try {
            const storageKey = 'softhub_cache_' + key;
            localStorage.setItem(storageKey, JSON.stringify({
                data: data,
                timestamp: Date.now()
            }));
        } catch (e) {
            // localStorage puede fallar si está lleno
            console.warn('Could not save to localStorage:', e);
        }
    },
    
    /**
     * Obtiene datos del localStorage cache
     * @param {string} key - Clave del cache
     * @returns {any|null} - Datos del cache o null
     */
    getFromLocalStorage(key) {
        try {
            const storageKey = 'softhub_cache_' + key;
            const cached = localStorage.getItem(storageKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < this.cacheExpiry) {
                    return parsed.data;
                }
                localStorage.removeItem(storageKey);
            }
        } catch (e) {
            console.warn('Could not read from localStorage:', e);
        }
        return null;
    },
    
    /**
     * Realiza una petición a la API de GitHub
     * @param {string} endpoint - Endpoint de la API
     * @returns {Promise<object>} - Respuesta de la API
     */
    async fetch(endpoint) {
        const cacheKey = endpoint;
        
        // Intentar obtener del cache en memoria
        let cached = this.getFromCache(cacheKey);
        if (cached) return cached;
        
        // Intentar obtener del localStorage
        cached = this.getFromLocalStorage(cacheKey);
        if (cached) {
            this.cache.set(cacheKey, { data: cached, timestamp: Date.now() });
            return cached;
        }
        
        // Hacer la petición
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (!response.ok) {
                if (response.status === 403) {
                    console.warn('GitHub API rate limit reached');
                    return null;
                }
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            const data = await response.json();
            this.saveToCache(cacheKey, data);
            return data;
            
        } catch (error) {
            console.error('Error fetching from GitHub:', error);
            return null;
        }
    },
    
    /**
     * Obtiene información del repositorio
     * @param {string} owner - Propietario del repo
     * @param {string} repo - Nombre del repo
     * @returns {Promise<object>} - Información del repositorio
     */
    async getRepoInfo(owner, repo) {
        return await this.fetch(`/repos/${owner}/${repo}`);
    },
    
    /**
     * Obtiene el README del repositorio
     * @param {string} owner - Propietario del repo
     * @param {string} repo - Nombre del repo
     * @returns {Promise<string>} - Contenido del README en HTML
     */
    async getReadme(owner, repo) {
        try {
            const data = await this.fetch(`/repos/${owner}/${repo}/readme`);
            if (data && data.content) {
                // Decodificar el contenido Base64
                const decoded = atob(data.content);
                // Convertir de UTF-8
                const text = decodeURIComponent(escape(decoded));
                return text;
            }
            return null;
        } catch (e) {
            console.error('Error getting README:', e);
            return null;
        }
    },
    
    /**
     * Obtiene los lenguajes del repositorio
     * @param {string} owner - Propietario del repo
     * @param {string} repo - Nombre del repo
     * @returns {Promise<object>} - Lenguajes y sus bytes
     */
    async getLanguages(owner, repo) {
        return await this.fetch(`/repos/${owner}/${repo}/languages`);
    },
    
    /**
     * Obtiene información completa de un software a partir de su URL
     * @param {string} githubUrl - URL del repositorio
     * @returns {Promise<object>} - Información completa del software
     */
    async getSoftwareInfo(githubUrl) {
        const parsed = this.parseGitHubUrl(githubUrl);
        if (!parsed) {
            console.error('Invalid GitHub URL:', githubUrl);
            return null;
        }
        
        const { owner, repo } = parsed;
        
        // Obtener información del repositorio
        const repoInfo = await this.getRepoInfo(owner, repo);
        if (!repoInfo) return null;
        
        // Obtener lenguajes
        const languages = await this.getLanguages(owner, repo);
        
        // Construir objeto con la información
        return {
            id: `${owner}-${repo}`.toLowerCase(),
            name: repoInfo.name,
            fullName: repoInfo.full_name,
            description: repoInfo.description || 'Sin descripción disponible',
            author: owner,
            authorUrl: `https://github.com/${owner}`,
            githubUrl: repoInfo.html_url,
            stars: repoInfo.stargazers_count || 0,
            forks: repoInfo.forks_count || 0,
            watchers: repoInfo.watchers_count || 0,
            language: repoInfo.language || 'Desconocido',
            languages: languages || {},
            license: repoInfo.license ? repoInfo.license.spdx_id : 'No especificada',
            createdAt: repoInfo.created_at,
            updatedAt: repoInfo.updated_at,
            pushedAt: repoInfo.pushed_at,
            topics: repoInfo.topics || [],
            defaultBranch: repoInfo.default_branch,
            openIssues: repoInfo.open_issues_count || 0,
            size: repoInfo.size,
            homepage: repoInfo.homepage || null
        };
    },
    
    /**
     * Obtiene el ícono apropiado según el lenguaje
     * @param {string} language - Lenguaje de programación
     * @returns {string} - Clase de ícono Bootstrap
     */
    getLanguageIcon(language) {
        const icons = {
            'JavaScript': 'bi-filetype-js',
            'TypeScript': 'bi-filetype-tsx',
            'Python': 'bi-filetype-py',
            'Java': 'bi-filetype-java',
            'C#': 'bi-filetype-cs',
            'C++': 'bi-file-earmark-code',
            'C': 'bi-file-earmark-code',
            'PHP': 'bi-filetype-php',
            'Ruby': 'bi-gem',
            'Go': 'bi-box',
            'Rust': 'bi-gear',
            'Swift': 'bi-apple',
            'Kotlin': 'bi-android',
            'HTML': 'bi-filetype-html',
            'CSS': 'bi-filetype-css',
            'Vue': 'bi-filetype-vue',
            'Shell': 'bi-terminal',
            'Jupyter Notebook': 'bi-journal-code'
        };
        return icons[language] || 'bi-code-slash';
    },
    
    /**
     * Formatea una fecha relativa
     * @param {string} dateStr - Fecha en formato ISO
     * @returns {string} - Fecha formateada
     */
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
        if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
        return `Hace ${Math.floor(diffDays / 365)} años`;
    }
};

// Exportar para uso global
window.GitHubAPI = GitHubAPI;
