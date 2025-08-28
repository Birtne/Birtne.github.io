/**
 * 现代化企业级Web应用
 * 遵循Apple/Google设计标准的单页应用架构
 */

class ModernWebApp {
  constructor() {
    this.currentPage = 'home';
    this.isLoading = false;
    this.animationObserver = null;
    
    // 绑定方法上下文
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    this.handleMobileMenu = this.handleMobileMenu.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    
    this.init();
  }

  /**
   * 应用初始化
   */
  init() {
    // 等待DOM完全加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * 核心功能设置
   */
  setup() {
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupMobileMenu();
    this.setupPerformanceOptimizations();
    
    // 加载初始页面
    const initialPage = this.getPageFromURL();
    this.loadPage(initialPage);
    
    console.log('🚀 Modern Web App initialized');
  }

  /**
   * 从URL获取当前页面
   */
  getPageFromURL() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'home';
    return page === 'index' ? 'home' : page;
  }

  /**
   * 设置导航系统
   */
  setupNavigation() {
    // 导航链接点击处理
    document.addEventListener('click', this.handleNavigation);
    
    // 浏览器前进/后退处理
    window.addEventListener('popstate', this.handlePopState);
    
    // 键盘导航支持
    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
  }

  /**
   * 处理导航点击
   */
  handleNavigation(event) {
    const link = event.target.closest('[data-page]');
    if (!link) return;
    
    event.preventDefault();
    
    const page = link.dataset.page;
    if (page === this.currentPage || this.isLoading) return;
    
    this.navigateTo(page);
  }

  /**
   * 处理浏览器前进/后退
   */
  handlePopState(event) {
    const page = event.state ? event.state.page : 'home';
    this.loadPage(page, false);
  }

  /**
   * 键盘导航支持
   */
  handleKeyboardNavigation(event) {
    // Alt + 数字键快速导航
    if (event.altKey && event.key >= '1' && event.key <= '4') {
      event.preventDefault();
      const pages = ['home', 'about', 'projects', 'contact'];
      const pageIndex = parseInt(event.key) - 1;
      if (pages[pageIndex]) {
        this.navigateTo(pages[pageIndex]);
      }
    }
  }

  /**
   * 导航到指定页面
   */
  navigateTo(page) {
    if (this.isLoading) return;
    
    this.loadPage(page, true);
    
    // 更新URL
    const url = page === 'home' ? '/' : `/${page}`;
    history.pushState({ page }, '', url);
    
    // Google Analytics 页面跟踪 (如果需要)
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: url
      });
    }
  }

  /**
   * 加载页面内容
   */
  async loadPage(page, pushState = false) {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.currentPage = page;
    
    // 更新导航状态
    this.updateNavigation(page);
    
    // 获取主内容容器
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
      console.error('Main content container not found');
      this.isLoading = false;
      return;
    }
    
    try {
      // 淡出当前内容
      await this.fadeOut(mainContent);
      
      // 渲染新页面内容
      const content = this.getPageContent(page);
      mainContent.innerHTML = content;
      
      // 淡入新内容
      await this.fadeIn(mainContent);
      
      // 重新设置动画
      this.setupScrollAnimations();
      
      // 滚动到顶部
      this.smoothScrollTo(0);
      
      // 更新页面标题
      this.updatePageTitle(page);
      
      // 触发页面加载完成事件
      this.dispatchPageLoadEvent(page);
      
    } catch (error) {
      console.error('Error loading page:', error);
      mainContent.innerHTML = this.getErrorContent();
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * 更新导航状态
   */
  updateNavigation(page) {
    const navLinks = document.querySelectorAll('.navbar-link');
    const footerLinks = document.querySelectorAll('.footer-link[data-page]');
    
    [...navLinks, ...footerLinks].forEach(link => {
      if (link.dataset.page === page) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * 淡出动画
   */
  fadeOut(element) {
    return new Promise(resolve => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 250ms cubic-bezier(0.4, 0.0, 0.2, 1.0)';
      
      setTimeout(resolve, 150);
    });
  }

  /**
   * 淡入动画
   */
  fadeIn(element) {
    return new Promise(resolve => {
      // 强制重绘
      element.offsetHeight;
      
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        element.style.transition = '';
        resolve();
      }, 250);
    });
  }

  /**
   * 获取页面内容
   */
  getPageContent(page) {
    switch (page) {
      case 'home':
        return this.getHomeContent();
      case 'about':
        return this.getAboutContent();
      case 'projects':
        return this.getProjectsContent();
      case 'contact':
        return this.getContactContent();
      default:
        return this.get404Content();
    }
  }

  /**
   * 首页内容
   */
  getHomeContent() {
    return `
      <!-- 英雄区域 -->
      <section class="hero">
        <div class="hero-container">
          <h1 class="hero-title animate-fade-in-up">
            Birtney666
          </h1>
          <p class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.1s;">
            开发者 & 创造者
          </p>
          <p class="animate-fade-in-up" style="animation-delay: 0.2s; max-width: 600px; margin: 0 auto var(--space-12); color: var(--text-secondary); font-size: var(--text-lg); line-height: var(--leading-relaxed);">
            专注于创造优雅的数字解决方案和令人惊叹的用户体验，用技术连接想象与现实。
          </p>
          <div class="hero-actions animate-fade-in-up" style="animation-delay: 0.3s;">
            <a href="#" class="btn btn-primary" data-page="projects">
              <i class="fas fa-code" aria-hidden="true"></i>
              查看项目
            </a>
            <a href="#" class="btn btn-secondary" data-page="contact">
              <i class="fas fa-envelope" aria-hidden="true"></i>
              联系我
            </a>
          </div>
        </div>
      </section>

      <!-- 核心能力 -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title animate-on-scroll">核心能力</h2>
            <p class="section-subtitle animate-on-scroll">
              专业技能与创新思维的完美结合
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div class="card animate-on-scroll hover-lift">
              <div class="card-header">
                <div style="width: 3rem; height: 3rem; background: linear-gradient(135deg, var(--blue-500), var(--blue-600)); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; color: white; margin-bottom: var(--space-4);">
                  <i class="fas fa-code" style="font-size: 1.25rem;"></i>
                </div>
                <h3 class="card-title">前端开发</h3>
                <p class="card-description">
                  精通现代前端技术栈，创造优秀的用户界面和交互体验。
                </p>
              </div>
              <div class="card-content">
                <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
                  <span style="background: var(--surface-accent); color: var(--text-accent); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);">React</span>
                  <span style="background: var(--surface-accent); color: var(--text-accent); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);">Vue.js</span>
                  <span style="background: var(--surface-accent); color: var(--text-accent); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);">TypeScript</span>
                </div>
              </div>
            </div>

            <div class="card animate-on-scroll hover-lift" style="animation-delay: 0.1s;">
              <div class="card-header">
                <div style="width: 3rem; height: 3rem; background: linear-gradient(135deg, var(--blue-500), var(--blue-600)); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; color: white; margin-bottom: var(--space-4);">
                  <i class="fas fa-server" style="font-size: 1.25rem;"></i>
                </div>
                <h3 class="card-title">后端架构</h3>
                <p class="card-description">
                  构建高性能、可扩展的服务器端应用和微服务架构。
                </p>
              </div>
              <div class="card-content">
                <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
                  <span style="background: var(--surface-accent); color: var(--text-accent); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);">Node.js</span>
                  <span style="background: var(--surface-accent); color: var(--text-accent); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);">Python</span>
                  <span style="background: var(--surface-accent); color: var(--text-accent); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);">Docker</span>
                </div>
              </div>
            </div>

            <div class="card animate-on-scroll hover-lift" style="animation-delay: 0.2s;">
              <div class="card-header">
                <div style="width: 3rem; height: 3rem; background: linear-gradient(135deg, var(--blue-500), var(--blue-600)); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; color: white; margin-bottom: var(--space-4);">
                  <i class="fas fa-palette" style="font-size: 1.25rem;"></i>
                </div>
                <h3 class="card-title">用户体验</h3>
                <p class="card-description">
                  以用户为中心的设计思维，创造直观且令人愉悦的产品体验。
                </p>
              </div>
              <div class="card-content">
                <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
                  <span style="background: var(--surface-accent); color: var(--text-accent); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);">UI/UX</span>
                  <span style="background: var(--surface-accent); color: var(--text-accent); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);">Figma</span>
                  <span style="background: var(--surface-accent); color: var(--text-accent); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);">原型设计</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * 关于页面内容
   */
  getAboutContent() {
    return `
      <section class="hero">
        <div class="hero-container">
          <h1 class="hero-title animate-fade-in-up">关于我</h1>
          <p class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.1s;">
            了解我的技术之旅与创造理念
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="grid grid-cols-1 lg:grid-cols-2" style="gap: var(--space-16);">
            <div class="animate-on-scroll">
              <h2 style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-6); color: var(--text-primary);">
                我的故事
              </h2>
              <div style="space-y: var(--space-6); color: var(--text-secondary); line-height: var(--leading-relaxed);">
                <p style="margin-bottom: var(--space-6);">
                  我是一名充满激情的全栈开发者，拥有多年的软件开发经验。我热爱创造能够解决实际问题的技术解决方案，并且始终追求代码的优雅与效率。
                </p>
                <p style="margin-bottom: var(--space-6);">
                  在我的职业生涯中，我参与过各种规模的项目，从小型创业产品到大型企业级系统。我相信技术应该服务于人，让生活变得更美好。
                </p>
                <p>
                  除了编程，我还热衷于学习新技术、分享知识，并且积极参与开源社区。我认为持续学习是成为优秀开发者的关键。
                </p>
              </div>
            </div>

            <div class="animate-on-scroll" style="animation-delay: 0.1s;">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">技术栈</h3>
                </div>
                <div class="card-content">
                  <div style="space-y: var(--space-4);">
                    <div>
                      <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--text-primary);">
                        前端技术
                      </h4>
                      <p style="color: var(--text-secondary); font-size: var(--text-sm);">
                        React, Vue.js, TypeScript, Next.js, Tailwind CSS, Webpack
                      </p>
                    </div>
                    <div>
                      <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--text-primary);">
                        后端技术
                      </h4>
                      <p style="color: var(--text-secondary); font-size: var(--text-sm);">
                        Node.js, Python, Java, Express, Django, GraphQL
                      </p>
                    </div>
                    <div>
                      <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--text-primary);">
                        数据库 & 工具
                      </h4>
                      <p style="color: var(--text-secondary); font-size: var(--text-sm);">
                        MySQL, PostgreSQL, MongoDB, Redis, Docker, AWS, Git
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * 项目页面内容
   */
  getProjectsContent() {
    return `
      <section class="hero">
        <div class="hero-container">
          <h1 class="hero-title animate-fade-in-up">我的项目</h1>
          <p class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.1s;">
            展示技术实力与创新思维的作品集
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            ${this.getProjectCards()}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * 生成项目卡片
   */
  getProjectCards() {
    const projects = [
      {
        title: '企业级管理系统',
        description: '基于微服务架构的现代化企业管理平台，支持多租户、权限管理和实时数据分析。',
        tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
        icon: 'fas fa-building',
        delay: 0
      },
      {
        title: '电商解决方案',
        description: '全栈电商平台，包含用户管理、商品展示、购物车、支付系统等完整功能模块。',
        tags: ['Vue.js', 'Express', 'MongoDB', 'Redis'],
        icon: 'fas fa-shopping-cart',
        delay: 0.1
      },
      {
        title: '数据可视化平台',
        description: '企业级数据分析和可视化平台，支持多种图表类型、实时数据展示和自定义仪表板。',
        tags: ['React', 'D3.js', 'Python', 'FastAPI'],
        icon: 'fas fa-chart-line',
        delay: 0.2
      },
      {
        title: '移动端应用',
        description: '跨平台移动应用，提供原生应用的体验，支持离线使用、推送通知等功能。',
        tags: ['React Native', 'TypeScript', 'Firebase'],
        icon: 'fas fa-mobile-alt',
        delay: 0.3
      },
      {
        title: '开发者工具',
        description: '提升开发效率的工具集，包含代码生成、自动化部署、性能监控等功能。',
        tags: ['Node.js', 'CLI', 'GitHub Actions'],
        icon: 'fas fa-tools',
        delay: 0.4
      },
      {
        title: '设计系统',
        description: '企业级设计系统，包含完整的组件库、设计指南和开发工具链。',
        tags: ['React', 'Storybook', 'Figma', 'CSS'],
        icon: 'fas fa-palette',
        delay: 0.5
      }
    ];

    return projects.map(project => `
      <div class="card animate-on-scroll hover-lift" style="animation-delay: ${project.delay}s;">
        <div class="card-header">
          <div style="width: 3rem; height: 3rem; background: linear-gradient(135deg, var(--blue-500), var(--blue-600)); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; color: white; margin-bottom: var(--space-4);">
            <i class="${project.icon}" style="font-size: 1.25rem;"></i>
          </div>
          <h3 class="card-title">${project.title}</h3>
          <p class="card-description">${project.description}</p>
        </div>
        <div class="card-footer">
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
            ${project.tags.map(tag => `
              <span style="background: var(--surface-accent); color: var(--text-accent); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);">
                ${tag}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * 联系页面内容
   */
  getContactContent() {
    return `
      <section class="hero">
        <div class="hero-container">
          <h1 class="hero-title animate-fade-in-up">联系我</h1>
          <p class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.1s;">
            让我们一起创造美好的项目
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="grid grid-cols-1 lg:grid-cols-2" style="gap: var(--space-16);">
            <div class="animate-on-scroll">
              <h2 style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-6); color: var(--text-primary);">
                取得联系
              </h2>
              <p style="margin-bottom: var(--space-8); color: var(--text-secondary); line-height: var(--leading-relaxed);">
                如果您有项目合作、技术咨询或任何问题，欢迎随时与我联系。我很乐意与您讨论如何将您的想法变为现实。
              </p>
              
              <div style="space-y: var(--space-6);">
                <div style="display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-6);">
                  <div style="width: 3rem; height: 3rem; background: var(--blue-500); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: white;">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 style="font-weight: var(--font-weight-semibold); color: var(--text-primary);">邮箱</h4>
                    <p style="color: var(--text-secondary); font-size: var(--text-sm);">contact@example.com</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-6);">
                  <div style="width: 3rem; height: 3rem; background: var(--blue-500); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: white;">
                    <i class="fab fa-github"></i>
                  </div>
                  <div>
                    <h4 style="font-weight: var(--font-weight-semibold); color: var(--text-primary);">GitHub</h4>
                    <p style="color: var(--text-secondary); font-size: var(--text-sm);">github.com/birtney666</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: var(--space-4);">
                  <div style="width: 3rem; height: 3rem; background: var(--blue-500); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: white;">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 style="font-weight: var(--font-weight-semibold); color: var(--text-primary);">位置</h4>
                    <p style="color: var(--text-secondary); font-size: var(--text-sm);">中国</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card animate-on-scroll" style="animation-delay: 0.1s;">
              <div class="card-header">
                <h3 class="card-title">发送消息</h3>
                <p class="card-description">填写表单，我会尽快回复您</p>
              </div>
              <div class="card-content">
                <form style="space-y: var(--space-6);">
                  <div style="margin-bottom: var(--space-6);">
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: var(--font-weight-medium); color: var(--text-primary);">
                      姓名 *
                    </label>
                    <input 
                      type="text" 
                      required
                      style="width: 100%; padding: var(--space-3); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); font-size: var(--text-base); transition: border-color var(--duration-fast) var(--ease-standard); background: var(--surface-primary);"
                      placeholder="您的姓名"
                    >
                  </div>
                  <div style="margin-bottom: var(--space-6);">
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: var(--font-weight-medium); color: var(--text-primary);">
                      邮箱 *
                    </label>
                    <input 
                      type="email" 
                      required
                      style="width: 100%; padding: var(--space-3); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); font-size: var(--text-base); transition: border-color var(--duration-fast) var(--ease-standard); background: var(--surface-primary);"
                      placeholder="your@email.com"
                    >
                  </div>
                  <div style="margin-bottom: var(--space-6);">
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: var(--font-weight-medium); color: var(--text-primary);">
                      主题 *
                    </label>
                    <input 
                      type="text" 
                      required
                      style="width: 100%; padding: var(--space-3); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); font-size: var(--text-base); transition: border-color var(--duration-fast) var(--ease-standard); background: var(--surface-primary);"
                      placeholder="消息主题"
                    >
                  </div>
                  <div style="margin-bottom: var(--space-6);">
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: var(--font-weight-medium); color: var(--text-primary);">
                      消息 *
                    </label>
                    <textarea 
                      rows="5" 
                      required
                      style="width: 100%; padding: var(--space-3); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); font-size: var(--text-base); resize: vertical; transition: border-color var(--duration-fast) var(--ease-standard); background: var(--surface-primary);"
                      placeholder="请输入您的消息..."
                    ></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-paper-plane" aria-hidden="true"></i>
                    发送消息
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * 404错误页面
   */
  get404Content() {
    return `
      <section class="hero">
        <div class="hero-container">
          <h1 class="hero-title animate-fade-in-up">404</h1>
          <p class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.1s;">
            页面未找到
          </p>
          <p class="animate-fade-in-up" style="animation-delay: 0.2s; color: var(--text-secondary); margin-bottom: var(--space-8);">
            抱歉，您访问的页面不存在或已被移动。
          </p>
          <div class="hero-actions animate-fade-in-up" style="animation-delay: 0.3s;">
            <a href="#" class="btn btn-primary" data-page="home">
              <i class="fas fa-home" aria-hidden="true"></i>
              返回首页
            </a>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * 错误页面内容
   */
  getErrorContent() {
    return `
      <section class="hero">
        <div class="hero-container">
          <h1 class="hero-title">出错了</h1>
          <p class="hero-subtitle">页面加载失败，请刷新重试</p>
          <div class="hero-actions">
            <button class="btn btn-primary" onclick="location.reload()">
              <i class="fas fa-refresh" aria-hidden="true"></i>
              刷新页面
            </button>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * 设置滚动效果
   */
  setupScrollEffects() {
    let isScrolling = false;
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          
          // 导航栏背景变化
          if (scrollTop > 50) {
            navbar?.classList.add('scrolled');
          } else {
            navbar?.classList.remove('scrolled');
          }
          
          isScrolling = false;
        });
        
        isScrolling = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * 设置滚动动画
   */
  setupAnimations() {
    // 如果浏览器不支持IntersectionObserver，则跳过动画
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported');
      return;
    }
    
    this.setupScrollAnimations();
  }

  /**
   * 设置滚动触发的动画
   */
  setupScrollAnimations() {
    // 清理之前的观察者
    if (this.animationObserver) {
      this.animationObserver.disconnect();
    }
    
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // 一次性动画，观察后即停止
          this.animationObserver.unobserve(entry.target);
        }
      });
    }, options);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      this.animationObserver.observe(element);
    });
  }

  /**
   * 设置移动端菜单
   */
  setupMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', this.handleMobileMenu);
    
    // 点击导航链接后关闭菜单
    nav.addEventListener('click', (event) => {
      if (event.target.matches('.navbar-link')) {
        this.closeMobileMenu();
      }
    });
    
    // ESC键关闭菜单
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }

  /**
   * 处理移动端菜单切换
   */
  handleMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-nav');
    
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    toggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
    
    // 切换汉堡菜单图标
    const icon = toggle.querySelector('svg');
    if (nav.classList.contains('active')) {
      icon.innerHTML = `
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      `;
    } else {
      icon.innerHTML = `
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      `;
    }
  }

  /**
   * 关闭移动端菜单
   */
  closeMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-nav');
    
    if (!toggle || !nav) return;
    
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('active');
    
    // 重置汉堡菜单图标
    const icon = toggle.querySelector('svg');
    icon.innerHTML = `
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    `;
  }

  /**
   * 平滑滚动到指定位置
   */
  smoothScrollTo(position, duration = 500) {
    const start = window.pageYOffset;
    const distance = position - start;
    let startTime = null;
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // 使用缓动函数
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      window.scrollTo(0, start + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }

  /**
   * 更新页面标题
   */
  updatePageTitle(page) {
    const titles = {
      home: 'Birtney666 - 开发者 & 创造者',
      about: '关于我 - Birtney666',
      projects: '我的项目 - Birtney666',
      contact: '联系我 - Birtney666'
    };
    
    document.title = titles[page] || titles.home;
  }

  /**
   * 触发页面加载完成事件
   */
  dispatchPageLoadEvent(page) {
    const event = new CustomEvent('pageLoaded', {
      detail: { page, timestamp: Date.now() }
    });
    document.dispatchEvent(event);
  }

  /**
   * 性能优化设置
   */
  setupPerformanceOptimizations() {
    // 预加载关键资源
    this.preloadCriticalResources();
    
    // 图片懒加载
    this.setupLazyLoading();
    
    // 防抖处理窗口大小变化
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.handleResize();
      }, 250);
    }, { passive: true });
  }

  /**
   * 预加载关键资源
   */
  preloadCriticalResources() {
    // 预加载字体
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
  }

  /**
   * 设置图片懒加载
   */
  setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // 浏览器原生懒加载
      document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
      });
    } else {
      // 降级方案：使用IntersectionObserver
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * 处理窗口大小变化
   */
  handleResize() {
    // 关闭移动端菜单（如果打开的话）
    this.closeMobileMenu();
    
    // 重新计算布局相关的内容
    console.log('Window resized');
  }
}

// 初始化应用
const app = new ModernWebApp();

// 导出到全局作用域（用于调试）
window.app = app;

// 添加一些有用的工具函数
window.utils = {
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

// 全局错误处理
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

console.log('🎨 Modern Web App with Apple/Google design system loaded');