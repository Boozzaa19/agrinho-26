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
        title: "Cresce o número de fazendas com certificação de turismo sustentável no Brasil",
        excerpt: "Mais de 200 propriedades rurais obtiveram o selo de sustentabilidade em 2024, marcando um crescimento de 35% em relação ao ano anterior.",
        category: "sustentabilidade",
        date: "15 de Janeiro, 2024",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 2,
        title: "Serra Gaúcha se destaca como destino de enoturismo ecológico",
        excerpt: "Vinícolas da região investem em práticas sustentáveis e oferecem experiências imersivas aos visitantes, combinando degustação e educação ambiental.",
        category: "destinos",
        date: "12 de Janeiro, 2024",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 3,
        title: "Gastronomia rural: chefs apostam em ingredientes locais e orgânicos",
        excerpt: "Movimento farm-to-table ganha força no interior paulista, com restaurantes que colhem ingredientes diretamente das hortas das fazendas.",
        category: "gastronomia",
        date: "10 de Janeiro, 2024",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 4,
        title: "Escolas adotam visitas a fazendas como parte do currículo",
        excerpt: "Programas de educação ambiental em propriedades rurais ajudam crianças a entender a origem dos alimentos e a importância da preservação.",
        category: "educacao",
        date: "8 de Janeiro, 2024",
        image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 5,
        title: "Energia solar revoluciona propriedades de agroturismo",
        excerpt: "Fazendas que adotaram sistemas fotovoltaicos reduzem custos em até 80% e atraem turistas conscientes com práticas verdes.",
        category: "sustentabilidade",
        date: "5 de Janeiro, 2024",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 6,
        title: "Pantanal oferece experiências únicas de turismo rural sustentável",
        excerpt: "Pousadas pantaneiras combinam safáris fotográficos, pesca sustentável e vivência com a cultura ribeirinha em pacotes ecoturísticos.",
        category: "destinos",
        date: "3 de Janeiro, 2024",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 7,
        title: "Queijos artesanais mineiros conquistam certificação internacional",
        excerpt: "Produtores da Serra da Canastra investem em turismo gastronômico e recebem reconhecimento por métodos tradicionais e sustentáveis.",
        category: "gastronomia",
        date: "1 de Janeiro, 2024",
        image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 8,
        title: "Universidades criam cursos de capacitação em turismo rural",
        excerpt: "Novas graduações e especializações preparam profissionais para atuar no setor que mais cresce no turismo brasileiro.",
        category: "educacao",
        date: "28 de Dezembro, 2023",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 9,
        title: "Startup brasileira cria app para conectar turistas a fazendas sustentáveis",
        excerpt: "Plataforma digital facilita reservas e avaliações, impulsionando o agroturismo ecológico em todo o país.",
        category: "sustentabilidade",
        date: "25 de Dezembro, 2023",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 10,
        title: "Chapada dos Veadeiros: o paraíso do ecoturismo brasileiro",
        excerpt: "Região recebe investimentos em infraestrutura sustentável e se consolida como referência em turismo de natureza responsável.",
        category: "destinos",
        date: "22 de Dezembro, 2023",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=250&fit=crop",
        link: "#"
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
