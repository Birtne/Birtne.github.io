// 现代化JavaScript功能

class ModernWebsite {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupMobileMenu();
        this.loadPage(this.getCurrentPage());
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page === 'index' ? 'home' : page;
    }

    setupNavigation() {
        // 导航链接点击处理
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link')) {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.navigateTo(page);
            }
        });

        // 浏览器后退/前进按钮处理
        window.addEventListener('popstate', (e) => {
            const page = e.state ? e.state.page : 'home';
            this.loadPage(page, false);
        });
    }

    navigateTo(page) {
        if (page === this.currentPage) return;
        
        this.loadPage(page, true);
        
        // 更新URL
        const url = page === 'home' ? '/' : `/${page}.html`;
        history.pushState({ page }, '', url);
    }

    loadPage(page, pushState = false) {
        this.currentPage = page;
        
        // 更新活动导航链接
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });

        // 加载页面内容
        this.renderPage(page);
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderPage(page) {
        const mainContent = document.querySelector('.main-content');
        
        // 淡出效果
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // 渲染新页面内容
            switch(page) {
                case 'home':
                    mainContent.innerHTML = this.getHomeContent();
                    break;
                case 'about':
                    mainContent.innerHTML = this.getAboutContent();
                    break;
                case 'projects':
                    mainContent.innerHTML = this.getProjectsContent();
                    break;
                case 'contact':
                    mainContent.innerHTML = this.getContactContent();
                    break;
                default:
                    mainContent.innerHTML = this.get404Content();
            }
            
            // 淡入效果
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
            
            // 重新初始化动画
            this.setupAnimations();
            
        }, 150);
    }

    getHomeContent() {
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1 class="animate-fadeInUp">Birtney666</h1>
                    <p class="hero-subtitle animate-fadeInUp" style="animation-delay: 0.1s">开发者 & 创造者</p>
                    <p class="animate-fadeInUp" style="animation-delay: 0.2s; max-width: 600px; margin: 0 auto; opacity: 0.9;">
                        欢迎来到我的数字世界！我是一名充满热情的开发者，专注于创建优雅的解决方案和令人惊叹的用户体验。
                    </p>
                    <div class="cta-buttons animate-fadeInUp" style="animation-delay: 0.3s">
                        <a href="#" class="btn btn-primary" data-page="projects">
                            <i class="fas fa-code"></i>
                            查看项目
                        </a>
                        <a href="#" class="btn btn-outline" data-page="contact">
                            <i class="fas fa-envelope"></i>
                            联系我
                        </a>
                    </div>
                </div>
            </section>
            
            <section class="section">
                <div class="container">
                    <h2 class="section-title">核心技能</h2>
                    <div class="grid grid-3">
                        <div class="card animate-fadeInUp">
                            <div class="card-icon">
                                <i class="fas fa-code"></i>
                            </div>
                            <h3>前端开发</h3>
                            <p>精通现代前端技术栈，包括React、Vue.js、HTML5、CSS3和JavaScript ES6+，创造优秀的用户界面。</p>
                        </div>
                        <div class="card animate-fadeInUp" style="animation-delay: 0.1s">
                            <div class="card-icon">
                                <i class="fas fa-server"></i>
                            </div>
                            <h3>后端开发</h3>
                            <p>熟悉Node.js、Python、Java等后端技术，能够构建高效、可扩展的服务器端应用程序。</p>
                        </div>
                        <div class="card animate-fadeInUp" style="animation-delay: 0.2s">
                            <div class="card-icon">
                                <i class="fas fa-mobile-alt"></i>
                            </div>
                            <h3>移动开发</h3>
                            <p>专注于响应式设计和移动优先的开发方法，确保在所有设备上都能提供优秀的用户体验。</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getAboutContent() {
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1 class="animate-fadeInUp">关于我</h1>
                    <p class="hero-subtitle animate-fadeInUp" style="animation-delay: 0.1s">了解我的技术之旅</p>
                </div>
            </section>
            
            <section class="section">
                <div class="container">
                    <div class="grid grid-2">
                        <div class="animate-fadeInUp">
                            <h2>我的故事</h2>
                            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); line-height: 1.7;">
                                我是一名充满激情的全栈开发者，拥有多年的软件开发经验。我热爱创造能够解决实际问题的技术解决方案，并且始终追求代码的优雅与效率。
                            </p>
                            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); line-height: 1.7;">
                                在我的职业生涯中，我参与过各种规模的项目，从小型个人应用到大型企业级系统。我相信技术应该服务于人，让生活变得更美好。
                            </p>
                            <p style="color: var(--text-secondary); line-height: 1.7;">
                                除了编程，我还热衷于学习新技术、分享知识，并且积极参与开源社区。我认为持续学习是成为优秀开发者的关键。
                            </p>
                        </div>
                        <div class="animate-fadeInUp" style="animation-delay: 0.2s">
                            <div class="card">
                                <h3>技术栈</h3>
                                <div style="margin-top: 1.5rem;">
                                    <div style="margin-bottom: 1rem;">
                                        <strong>前端:</strong> React, Vue.js, JavaScript, TypeScript, HTML5, CSS3, Sass
                                    </div>
                                    <div style="margin-bottom: 1rem;">
                                        <strong>后端:</strong> Node.js, Python, Java, PHP, Express, Django
                                    </div>
                                    <div style="margin-bottom: 1rem;">
                                        <strong>数据库:</strong> MySQL, PostgreSQL, MongoDB, Redis
                                    </div>
                                    <div style="margin-bottom: 1rem;">
                                        <strong>工具:</strong> Git, Docker, AWS, Linux, VS Code
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="section section-alt">
                <div class="container">
                    <h2 class="section-title">工作经历</h2>
                    <div class="grid grid-2">
                        <div class="card animate-fadeInUp">
                            <h3>高级前端开发工程师</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 1rem;">某科技公司 | 2022 - 至今</p>
                            <p>负责公司核心产品的前端架构设计和开发，带领团队完成多个重要项目，提升用户体验和系统性能。</p>
                        </div>
                        <div class="card animate-fadeInUp" style="animation-delay: 0.1s">
                            <h3>全栈开发工程师</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 1rem;">创业公司 | 2020 - 2022</p>
                            <p>独立负责产品的前后端开发，从零搭建系统架构，积累了丰富的全栈开发和项目管理经验。</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getProjectsContent() {
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1 class="animate-fadeInUp">我的项目</h1>
                    <p class="hero-subtitle animate-fadeInUp" style="animation-delay: 0.1s">展示我的技术作品</p>
                </div>
            </section>
            
            <section class="section">
                <div class="container">
                    <div class="grid grid-2">
                        <div class="card animate-fadeInUp">
                            <div class="card-icon">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <h3>电商平台</h3>
                            <p>基于React和Node.js构建的现代化电商平台，包含用户管理、商品展示、购物车、支付系统等完整功能。</p>
                            <div style="margin-top: 1.5rem;">
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; margin-right: 0.5rem;">React</span>
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; margin-right: 0.5rem;">Node.js</span>
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">MongoDB</span>
                            </div>
                        </div>
                        
                        <div class="card animate-fadeInUp" style="animation-delay: 0.1s">
                            <div class="card-icon">
                                <i class="fas fa-tasks"></i>
                            </div>
                            <h3>任务管理系统</h3>
                            <p>团队协作的任务管理平台，支持项目管理、任务分配、进度跟踪、团队沟通等功能。</p>
                            <div style="margin-top: 1.5rem;">
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; margin-right: 0.5rem;">Vue.js</span>
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; margin-right: 0.5rem;">Express</span>
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">MySQL</span>
                            </div>
                        </div>
                        
                        <div class="card animate-fadeInUp" style="animation-delay: 0.2s">
                            <div class="card-icon">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h3>数据可视化平台</h3>
                            <p>企业级数据分析和可视化平台，支持多种图表类型、实时数据展示、自定义仪表板等功能。</p>
                            <div style="margin-top: 1.5rem;">
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; margin-right: 0.5rem;">React</span>
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; margin-right: 0.5rem;">D3.js</span>
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Python</span>
                            </div>
                        </div>
                        
                        <div class="card animate-fadeInUp" style="animation-delay: 0.3s">
                            <div class="card-icon">
                                <i class="fas fa-mobile-alt"></i>
                            </div>
                            <h3>移动端应用</h3>
                            <p>跨平台移动应用，提供原生应用的体验，支持离线使用、推送通知、地理定位等功能。</p>
                            <div style="margin-top: 1.5rem;">
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; margin-right: 0.5rem;">React Native</span>
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; margin-right: 0.5rem;">Firebase</span>
                                <span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Redux</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="section section-alt">
                <div class="container">
                    <h2 class="section-title">开源项目</h2>
                    <div class="grid grid-3">
                        <div class="card animate-fadeInUp">
                            <h3>UI组件库</h3>
                            <p>基于React的现代化UI组件库，提供丰富的组件和主题定制功能。</p>
                            <div style="margin-top: 1rem;">
                                <a href="#" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">
                                    <i class="fab fa-github"></i> 查看源码
                                </a>
                            </div>
                        </div>
                        <div class="card animate-fadeInUp" style="animation-delay: 0.1s">
                            <h3>构建工具</h3>
                            <p>轻量级的前端构建工具，支持模块打包、代码压缩、热重载等功能。</p>
                            <div style="margin-top: 1rem;">
                                <a href="#" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">
                                    <i class="fab fa-github"></i> 查看源码
                                </a>
                            </div>
                        </div>
                        <div class="card animate-fadeInUp" style="animation-delay: 0.2s">
                            <h3>API框架</h3>
                            <p>基于Node.js的轻量级API框架，简化RESTful API的开发流程。</p>
                            <div style="margin-top: 1rem;">
                                <a href="#" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">
                                    <i class="fab fa-github"></i> 查看源码
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getContactContent() {
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1 class="animate-fadeInUp">联系我</h1>
                    <p class="hero-subtitle animate-fadeInUp" style="animation-delay: 0.1s">让我们一起创造美好的项目</p>
                </div>
            </section>
            
            <section class="section">
                <div class="container">
                    <div class="grid grid-2">
                        <div class="animate-fadeInUp">
                            <h2>取得联系</h2>
                            <p style="margin-bottom: 2rem; color: var(--text-secondary); line-height: 1.7;">
                                如果您有项目合作、技术咨询或任何问题，欢迎随时与我联系。我很乐意与您讨论如何将您的想法变为现实。
                            </p>
                            
                            <div style="margin-bottom: 2rem;">
                                <div style="display: flex; align-items: center; margin-bottom: 1rem; gap: 1rem;">
                                    <div style="width: 2.5rem; height: 2.5rem; background: var(--primary-color); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white;">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div>
                                        <div style="font-weight: 600;">邮箱</div>
                                        <div style="color: var(--text-secondary);">your.email@example.com</div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; margin-bottom: 1rem; gap: 1rem;">
                                    <div style="width: 2.5rem; height: 2.5rem; background: var(--primary-color); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white;">
                                        <i class="fab fa-github"></i>
                                    </div>
                                    <div>
                                        <div style="font-weight: 600;">GitHub</div>
                                        <div style="color: var(--text-secondary);">github.com/birtney666</div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; margin-bottom: 1rem; gap: 1rem;">
                                    <div style="width: 2.5rem; height: 2.5rem; background: var(--primary-color); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white;">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <div style="font-weight: 600;">位置</div>
                                        <div style="color: var(--text-secondary);">中国</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="social-links">
                                <a href="https://github.com/birtney666" class="social-link">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="mailto:your.email@example.com" class="social-link">
                                    <i class="fas fa-envelope"></i>
                                </a>
                                <a href="#" class="social-link">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                                <a href="#" class="social-link">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div class="card animate-fadeInUp" style="animation-delay: 0.2s">
                            <h3>发送消息</h3>
                            <form style="margin-top: 1.5rem;">
                                <div style="margin-bottom: 1.5rem;">
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">姓名</label>
                                    <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem; font-size: 1rem; transition: border-color 0.2s;" placeholder="您的姓名">
                                </div>
                                <div style="margin-bottom: 1.5rem;">
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">邮箱</label>
                                    <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem; font-size: 1rem; transition: border-color 0.2s;" placeholder="your@email.com">
                                </div>
                                <div style="margin-bottom: 1.5rem;">
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">主题</label>
                                    <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem; font-size: 1rem; transition: border-color 0.2s;" placeholder="消息主题">
                                </div>
                                <div style="margin-bottom: 1.5rem;">
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">消息</label>
                                    <textarea rows="5" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem; font-size: 1rem; resize: vertical; transition: border-color 0.2s;" placeholder="请输入您的消息..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary" style="width: 100%;">
                                    <i class="fas fa-paper-plane"></i>
                                    发送消息
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    get404Content() {
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1 class="animate-fadeInUp">404</h1>
                    <p class="hero-subtitle animate-fadeInUp" style="animation-delay: 0.1s">页面未找到</p>
                    <div class="cta-buttons animate-fadeInUp" style="animation-delay: 0.2s">
                        <a href="#" class="btn btn-primary" data-page="home">
                            <i class="fas fa-home"></i>
                            返回首页
                        </a>
                    </div>
                </div>
            </section>
        `;
    }

    setupScrollEffects() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 导航栏滚动效果
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // 滚动方向检测
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        document.querySelectorAll('.card, .hero-content > *, .section-title').forEach(el => {
            observer.observe(el);
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // 点击导航链接后关闭菜单
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // 点击外部区域关闭菜单
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new ModernWebsite();
});

// 页面切换时的过渡效果
document.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
        const mainContent = document.querySelector('.main-content');
        mainContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
});

// 平滑滚动到锚点
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// 添加一些实用工具函数
const utils = {
    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 检查元素是否在视口中
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};