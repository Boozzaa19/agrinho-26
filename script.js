/**
 * AgroTurismo Brasil - JavaScript
 * Turismo Rural e Agroturismo Ecológico
 * 
 * Funcionalidades:
 * - Menu mobile (abrir/fechar)
 * - Dark Mode toggle persistente
 * - Renderização dinâmica dos cards de notícias
 * - Filtro por categoria
 * - Scroll suave para seções
 * - Animações ao rolar (Intersection Observer)
 * - Validação do formulário
 * - Back to top button
 * - Toast notifications
 */

// ===================================
// DOM Elements
// ===================================
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const newsGrid = document.getElementById('newsGrid');
const newsFilters = document.getElementById('newsFilters');
const contactForm = document.getElementById('contactForm');
const backToTop = document.getElementById('backToTop');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ===================================
// News Data - Mock Array
// ===================================
const newsData = [
    {
        id: 1,
        title: "Turismo rural cresce no Brasil com 10 mil empreendimentos em 16 estados",
        excerpt: "O Brasil já soma mais de 10 mil empreendimentos voltados ao turismo rural, presentes em pelo menos 16 estados, segundo levantamento recente do setor. O crescimento é impulsionado pela busca por experiências autênticas fora dos grandes centros urbanos. (Fonte: A Gazeta / Ruraltur 2026)",
        category: "sustentabilidade",
        date: "Abril, 2026",
        image: "img/news1_sustentabilidade.jpg",
        link: "https://www.agazeta.com.br/artigos/turismo-rural-cresce-no-brasil-e-ruraltur-2026-coloca-es-em-destaque-0426"
    },
    {
        id: 2,
        title: "Chapada dos Veadeiros amplia trilhas e hospedagens sustentáveis",
        excerpt: "A partir de 2024, novas trilhas com pontos de apoio e informações ambientais foram abertas no Parque Nacional da Chapada dos Veadeiros. Novas hospedagens com certificações ecológicas e energia solar surgem na região de Alto Paraíso e Cavalcante. (Fonte: Correio Braziliense, 2025)",
        category: "destinos",
        date: "Junho, 2025",
        image: "img/news2_destinos.jpg",
        link: "https://www.correiobraziliense.com.br/cbradar/o-que-mudou-na-chapada-dos-veadeiros-e-por-que-visitar-em-2025/"
    },
    {
        id: 3,
        title: "Queijo Minas Artesanal é reconhecido como Patrimônio Imaterial da Humanidade pela UNESCO",
        excerpt: "Em dezembro de 2024, durante a 19ª Sessão do Comitê da UNESCO em Assunção, os modos de fazer o Queijo Minas Artesanal foram inscritos como Patrimônio Cultural Imaterial da Humanidade — um impulso direto ao turismo gastronômico da Serra da Canastra. (Fonte: Agência Brasil / Wikipedia, 2024)",
        category: "gastronomia",
        date: "Dezembro, 2024",
        image: "img/news3_gastronomia.jpg",
        link: "https://www.em.com.br/turismo/2024/07/6889324-outrora-traficado-queijo-canastra-rompe-barreiras-e-ganha-o-mundo.html"
    },
    {
        id: 4,
        title: "Nova Lei Geral do Turismo permite registro de agricultores familiares no Cadastur",
        excerpt: "Sancionada em novembro de 2024, a nova Lei Geral do Turismo permite que produtores rurais e agricultores familiares se registrem oficialmente no Cadastur, abrindo acesso a crédito, qualificação e comercialização legal de suas experiências turísticas. (Fonte: Portal CNA Brasil, 2024)",
        category: "negocios",
        date: "Novembro, 2024",
        image: "img/news4_educacao.jpg",
        link: "https://www.cnabrasil.org.br/noticias/turismo-rural-impulsiona-economia-local"
    },
    {
        id: 5,
        title: "Chapada dos Veadeiros: 60% dos produtos vendidos no parque são de produção local",
        excerpt: "Dados da administração do Parque Nacional da Chapada dos Veadeiros mostram que cerca de 60% dos produtos comercializados nos quiosques e lojas são de produtores locais, fortalecendo a economia regional e o agroturismo sustentável. (Fonte: Tribuna Ribeirão, 2026)",
        category: "sustentabilidade",
        date: "Fevereiro, 2026",
        image: "img/news5_solar.jpg",
        link: "https://www.tribunaribeirao.com.br/chapada-dos-veadeiros-alia-conservacao-ambiental-e-desenvolvimento-regional/"
    },
    {
        id: 6,
        title: "Pantanal combina safári fotográfico e cultura ribeirinha no ecoturismo",
        excerpt: "Pousadas pantaneiras consolidam pacotes que unem safáris fotográficos, pesca sustentável e vivência com comunidades ribeirinhas. A região é reconhecida como um dos destinos mais singulares do turismo de natureza no Brasil. (Fonte: Sebrae)",
        category: "destinos",
        date: "2024",
        image: "img/news6_pantanal.jpg",
        link: "https://sebrae.com.br/sites/PortalSebrae/artigos/agroturismo-no-brasil-vivencias-unicas,d1cfda71a0122810VgnVCM100000d701210aRCRD"
    },
    {
        id: 7,
        title: "Canastra bate recorde no Mondial du Fromage 2023 com 82 medalhas brasileiras",
        excerpt: "No Mondial du Fromage 2023, realizado em Tours, na França, o Brasil bateu seu próprio recorde com 82 medalhas, sendo 18 de ouro. Produtores da Serra da Canastra estiveram entre os premiados, impulsionando o turismo gastronômico da região. (Fonte: Serra da Canastra / Folha Regional, 2023)",
        category: "gastronomia",
        date: "Setembro, 2023",
        image: "img/news7_queijos.jpg",
        link: "https://www.serradacanastra.com.br/noticias/mondial-du-fromage-2023-produtores-da-serra-da-canastra-sao-premiados-em-concurso-internacional-de-queijo-realizado-na-franca"
    },
    {
        id: 9,
        title: "74% dos turistas brasileiros escolhem o interior do país como destino",
        excerpt: "Pesquisa da Mind Miners mostra que 61% dos brasileiros preferem viagens domésticas, e desses, 74% escolhem o interior como destino, valorizando paz, práticas sustentáveis e contato com a natureza. (Fonte: Nuestra America / Mind Miners, 2024)",
        category: "sustentabilidade",
        date: "Dezembro, 2024",
        image: "img/news9_startup.jpg",
        link: "https://nuestraamerica.com.br/cresce-turismo-rural-no-brasil/"
    },
    {
        id: 10,
        title: "Brasil recebe 6,65 milhões de turistas internacionais em 2024",
        excerpt: "O setor de turismo no Brasil cresceu 12,6% em 2024, com 6,65 milhões de visitantes internacionais e mais de US$ 6,6 bilhões em receitas. O ambiente favorável impulsiona também o agroturismo, segmento de alto potencial segundo especialistas. (Fonte: AgroAdvance / Portal CNA, 2025)",
        category: "negocios",
        date: "2025",
        image: "img/news10_chapada.jpg",
        link: "https://agroadvance.com.br/blog-turismo-rural-agroturismo/"
    }
];

// ===================================
// Theme Management (Dark Mode)
// ===================================
const ThemeManager = {
    STORAGE_KEY: 'agroturismo-theme',
    
    init() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }
        
        this.setupToggle();
    },
    
    setupToggle() {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(this.STORAGE_KEY, newTheme);
        });
    }
};

// ===================================
// Mobile Menu
// ===================================
const MobileMenu = {
    init() {
        menuToggle.addEventListener('click', () => {
            this.toggle();
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                this.close();
            }
        });
    },
    
    toggle() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    },
    
    close() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// ===================================
// Smooth Scroll
// ===================================
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    this.updateActiveLink(targetId);
                }
            });
        });
    },
    
    updateActiveLink(targetId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
};

// ===================================
// Header Scroll Effect
// ===================================
const HeaderScroll = {
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
};

// ===================================
// Back to Top Button
// ===================================
const BackToTop = {
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// ===================================
// News Renderer
// ===================================
const NewsRenderer = {
    currentCategory: 'all',
    
    init() {
        this.renderNews(newsData);
        this.setupFilters();
    },
    
    renderNews(news) {
        newsGrid.innerHTML = '';
        
        news.forEach((item, index) => {
            const card = this.createNewsCard(item);
            newsGrid.appendChild(card);
            
            // Animate cards with stagger effect
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    },
    
    createNewsCard(item) {
        const card = document.createElement('article');
        card.className = 'news-card animate-on-scroll';
        card.dataset.category = item.category;
        
        card.innerHTML = `
            <div class="news-card-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="news-card-category">${this.getCategoryLabel(item.category)}</span>
            </div>
            <div class="news-card-content">
                <time class="news-card-date">${item.date}</time>
                <h3 class="news-card-title">${item.title}</h3>
                <p class="news-card-excerpt">${item.excerpt}</p>
                <a href="${item.link}" class="news-card-link">
                    Ler mais
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                </a>
            </div>
        `;
        
        return card;
    },
    
    getCategoryLabel(category) {
        const labels = {
            sustentabilidade: 'Sustentabilidade',
            destinos: 'Destinos',
            gastronomia: 'Gastronomia',
            educacao: 'Educação'
        };
        return labels[category] || category;
    },
    
    setupFilters() {
        const filterButtons = newsFilters.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter news
                const category = btn.dataset.category;
                this.filterNews(category);
            });
        });
    },
    
    filterNews(category) {
        this.currentCategory = category;
        
        let filteredNews;
        if (category === 'all') {
            filteredNews = newsData;
        } else {
            filteredNews = newsData.filter(item => item.category === category);
        }
        
        // Fade out current cards
        const currentCards = newsGrid.querySelectorAll('.news-card');
        currentCards.forEach(card => {
            card.classList.remove('visible');
        });
        
        // Render filtered news after fade out
        setTimeout(() => {
            this.renderNews(filteredNews);
        }, 300);
    }
};

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
const ScrollAnimations = {
    init() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe all elements with animation class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
};

// ===================================
// Active Section Tracker
// ===================================
const SectionTracker = {
    init() {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
};

// ===================================
// Form Validation
// ===================================
const FormValidation = {
    init() {
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitForm();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                const formGroup = input.closest('.form-group');
                if (formGroup && formGroup.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    },
    
    validateForm() {
        let isValid = true;
        
        const name = contactForm.querySelector('#name');
        const email = contactForm.querySelector('#email');
        const terms = contactForm.querySelector('#terms');
        
        if (!this.validateField(name)) isValid = false;
        if (!this.validateField(email)) isValid = false;
        if (!this.validateField(terms)) isValid = false;
        
        return isValid;
    },
    
    validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        let isValid = true;
        let message = '';
        
        // Required validation
        if (field.required && !field.value.trim() && field.type !== 'checkbox') {
            isValid = false;
            message = 'Este campo é obrigatório';
        }
        
        // Checkbox validation
        if (field.type === 'checkbox' && field.required && !field.checked) {
            isValid = false;
            message = 'Você deve aceitar os termos';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'Digite um e-mail válido';
            }
        }
        
        // Name validation (minimum length)
        if (field.id === 'name' && field.value.trim() && field.value.trim().length < 3) {
            isValid = false;
            message = 'Nome deve ter pelo menos 3 caracteres';
        }
        
        // Update UI
        if (isValid) {
            formGroup.classList.remove('error');
            if (errorMessage) errorMessage.textContent = '';
        } else {
            formGroup.classList.add('error');
            if (errorMessage) errorMessage.textContent = message;
        }
        
        return isValid;
    },
    
    submitForm() {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
            <span>Enviando...</span>
        `;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            contactForm.reset();
            
            // Show success toast
            Toast.show('Inscrição realizada com sucesso!');
        }, 1500);
    }
};

// ===================================
// Toast Notification
// ===================================
const Toast = {
    show(message, duration = 3000) {
        toastMessage.textContent = message;
        toast.classList.add('visible');
        
        setTimeout(() => {
            toast.classList.remove('visible');
        }, duration);
    }
};

// ===================================
// Initialize All Modules
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    MobileMenu.init();
    SmoothScroll.init();
    HeaderScroll.init();
    BackToTop.init();
    NewsRenderer.init();
    ScrollAnimations.init();
    SectionTracker.init();
    FormValidation.init();
    
    // Log initialization
    console.log('[v0] AgroTurismo Brasil - Initialized successfully');
});

// ===================================
// Expose Toast for external use
// ===================================
window.showToast = Toast.show.bind(Toast);
