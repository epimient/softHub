/* =====================================================
   Sistema de Calificaciones con Google Sheets
   Integración via Google Apps Script
   ===================================================== */

const RatingsSystem = {
    // URL del Google Apps Script
    scriptUrl: 'https://script.google.com/macros/s/AKfycbyV42cKrNFV8ftFHWgmfLMIPWfzuy-xMJmSnhHJG2E1JgmNts1VV8tbkZuF_3sRuhnJ/exec',

    // Cache local de calificaciones
    ratingsCache: new Map(),

    // Datos de ejemplo para demostración
    sampleRatings: {
        'gobboso-balldontlie_api': [
            { user: 'María G.', rating: 5, comment: '¡Excelente trabajo con la API de NBA!', date: '2026-02-01' },
            { user: 'Carlos P.', rating: 4, comment: 'Muy útil, solo falta documentación', date: '2026-01-28' }
        ],
        'monty0512-pokeapi': [
            { user: 'Ana R.', rating: 5, comment: 'Me encantó, muy bien implementado', date: '2026-02-02' },
            { user: 'Pedro M.', rating: 5, comment: 'Proyecto completo y bien estructurado', date: '2026-01-30' },
            { user: 'Luis B.', rating: 4, comment: 'Buen uso de la PokeAPI', date: '2026-01-25' }
        ],
        'luissm4-taller-starwars': [
            { user: 'Jorge L.', rating: 5, comment: 'May the Force be with this project!', date: '2026-02-03' }
        ],
        'd4zh-addressapi': [
            { user: 'Sandra M.', rating: 4, comment: 'Útil para validar direcciones', date: '2026-01-29' }
        ],
        'chispacion-movie_api': [
            { user: 'Roberto C.', rating: 5, comment: 'Muy buena interfaz para buscar películas', date: '2026-02-01' },
            { user: 'Elena V.', rating: 4, comment: 'Funciona muy bien', date: '2026-01-27' }
        ]
    },

    /**
     * Configura la URL del Google Apps Script
     * @param {string} url - URL del script desplegado
     */
    setScriptUrl(url) {
        this.scriptUrl = url;
    },

    /**
     * Obtiene las calificaciones de un software
     * @param {string} appId - ID del software
     * @returns {Promise<Array>} - Lista de calificaciones
     */
    async getRatings(appId) {
        // Si hay URL de script configurada, usar Google Sheets
        if (this.scriptUrl) {
            try {
                const response = await fetch(`${this.scriptUrl}?action=get&appId=${appId}`);
                const data = await response.json();
                return data.ratings || [];
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        }

        // Usar datos de ejemplo mientras no esté configurado
        const normalizedId = appId.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        return this.sampleRatings[normalizedId] || [];
    },

    /**
     * Calcula el promedio de calificaciones
     * @param {Array} ratings - Lista de calificaciones
     * @returns {number} - Promedio (0-5)
     */
    calculateAverage(ratings) {
        if (!ratings || ratings.length === 0) return 0;
        const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
        return Math.round((sum / ratings.length) * 10) / 10;
    },

    /**
     * Envía una nueva calificación
     * @param {string} appId - ID del software
     * @param {string} user - Nombre del usuario
     * @param {number} rating - Calificación (1-5)
     * @param {string} comment - Comentario
     * @returns {Promise<boolean>} - Éxito o fallo
     */
    async submitRating(appId, user, rating, comment) {
        if (!this.scriptUrl) {
            console.warn('Google Apps Script URL not configured');
            // Agregar a los datos de ejemplo temporalmente
            const normalizedId = appId.toLowerCase().replace(/[^a-z0-9-]/g, '-');
            if (!this.sampleRatings[normalizedId]) {
                this.sampleRatings[normalizedId] = [];
            }
            this.sampleRatings[normalizedId].unshift({
                user: user,
                rating: rating,
                comment: comment,
                date: new Date().toISOString().split('T')[0]
            });
            return true;
        }

        try {
            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'add',
                    appId: appId,
                    user: user,
                    rating: rating,
                    comment: comment,
                    date: new Date().toISOString().split('T')[0]
                })
            });

            const result = await response.json();
            return result.success || false;

        } catch (error) {
            console.error('Error submitting rating:', error);
            return false;
        }
    },

    /**
     * Renderiza las estrellas de calificación
     * @param {number} rating - Calificación (0-5)
     * @param {boolean} interactive - Si las estrellas son clickeables
     * @returns {string} - HTML de las estrellas
     */
    renderStars(rating, interactive = false) {
        let html = '';
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            let starClass = 'bi-star';
            if (i <= fullStars) {
                starClass = 'bi-star-fill';
            } else if (i === fullStars + 1 && hasHalf) {
                starClass = 'bi-star-half';
            }

            if (interactive) {
                html += `<i class="bi ${starClass} star-interactive" data-rating="${i}" style="cursor: pointer;"></i>`;
            } else {
                html += `<i class="bi ${starClass}"></i>`;
            }
        }

        return html;
    },

    /**
     * Renderiza la sección de comentarios
     * @param {Array} ratings - Lista de calificaciones
     * @returns {string} - HTML de los comentarios
     */
    renderComments(ratings) {
        if (!ratings || ratings.length === 0) {
            return `
                <div class="no-comments text-center py-4">
                    <i class="bi bi-chat-dots text-muted" style="font-size: 2rem;"></i>
                    <p class="text-muted mt-2">Aún no hay comentarios. ¡Sé el primero!</p>
                </div>
            `;
        }

        let html = '<div class="comments-list">';

        for (const r of ratings) {
            html += `
                <div class="comment-item mb-3 p-3" style="background: var(--bg-input); border-radius: var(--radius-md);">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <strong style="color: var(--text-primary);">${this.escapeHtml(r.user)}</strong>
                            <div class="stars-small" style="color: #fbbf24;">
                                ${this.renderStars(r.rating)}
                            </div>
                        </div>
                        <small class="text-muted">${r.date}</small>
                    </div>
                    <p class="mb-0" style="color: var(--text-secondary);">${this.escapeHtml(r.comment)}</p>
                </div>
            `;
        }

        html += '</div>';
        return html;
    },

    /**
     * Renderiza el formulario para agregar calificación
     * @param {string} appId - ID del software
     * @returns {string} - HTML del formulario
     */
    renderForm(appId) {
        return `
            <div class="rating-form mt-4 p-3" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                <h6 class="mb-3" style="color: var(--text-primary);">
                    <i class="bi bi-pencil-square me-2"></i>Deja tu opinión
                </h6>
                <form id="ratingForm" data-app-id="${appId}">
                    <div class="mb-3">
                        <label class="form-label text-muted">Tu nombre</label>
                        <input type="text" class="form-control" id="ratingUser" placeholder="Ej: María García" required
                            style="background: var(--bg-input); border-color: var(--border-color); color: var(--text-primary);">
                    </div>
                    <div class="mb-3">
                        <label class="form-label text-muted">Calificación</label>
                        <div class="rating-input" id="ratingStars" style="font-size: 1.5rem; color: var(--border-color);">
                            ${this.renderStars(0, true)}
                        </div>
                        <input type="hidden" id="ratingValue" value="0">
                    </div>
                    <div class="mb-3">
                        <label class="form-label text-muted">Comentario</label>
                        <textarea class="form-control" id="ratingComment" rows="3" placeholder="¿Qué te pareció este proyecto?" required
                            style="background: var(--bg-input); border-color: var(--border-color); color: var(--text-primary);"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">
                        <i class="bi bi-send me-2"></i>Enviar Calificación
                    </button>
                </form>
            </div>
        `;
    },

    /**
     * Inicializa los eventos del formulario de calificación
     * @param {string} appId - ID del software
     */
    initFormEvents(appId) {
        // Estrellas interactivas
        const starsContainer = document.getElementById('ratingStars');
        const ratingInput = document.getElementById('ratingValue');

        if (starsContainer) {
            starsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('star-interactive')) {
                    const rating = parseInt(e.target.dataset.rating);
                    ratingInput.value = rating;

                    // Actualizar estrellas visuales
                    starsContainer.querySelectorAll('.star-interactive').forEach((star, index) => {
                        if (index < rating) {
                            star.className = 'bi bi-star-fill star-interactive';
                        } else {
                            star.className = 'bi bi-star star-interactive';
                        }
                    });

                    // Cambiar color
                    starsContainer.style.color = '#fbbf24';
                }
            });

            // Hover effect
            starsContainer.addEventListener('mouseover', (e) => {
                if (e.target.classList.contains('star-interactive')) {
                    const rating = parseInt(e.target.dataset.rating);
                    starsContainer.querySelectorAll('.star-interactive').forEach((star, index) => {
                        if (index < rating) {
                            star.className = 'bi bi-star-fill star-interactive';
                        } else {
                            star.className = 'bi bi-star star-interactive';
                        }
                    });
                }
            });
        }

        // Envío del formulario
        const form = document.getElementById('ratingForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const user = document.getElementById('ratingUser').value;
                const rating = parseInt(document.getElementById('ratingValue').value);
                const comment = document.getElementById('ratingComment').value;

                if (rating === 0) {
                    alert('Por favor selecciona una calificación');
                    return;
                }

                const btn = form.querySelector('button[type="submit"]');
                btn.disabled = true;
                btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';

                const success = await this.submitRating(appId, user, rating, comment);

                if (success) {
                    btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>¡Enviado!';
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-success');

                    // Recargar comentarios después de un momento
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                } else {
                    btn.disabled = false;
                    btn.innerHTML = '<i class="bi bi-send me-2"></i>Enviar Calificación';
                    alert('Error al enviar. Por favor intenta de nuevo.');
                }
            });
        }
    },

    /**
     * Escapa HTML para prevenir XSS
     * @param {string} text - Texto a escapar
     * @returns {string} - Texto escapado
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Exportar para uso global
window.RatingsSystem = RatingsSystem;
