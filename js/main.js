/*
 * Empório Parrilla — comportamento da página (JS puro, sem dependências).
 * - Alterna modo claro/escuro (persistido em localStorage, com fallback a
 *   prefers-color-scheme) através de um botão role="switch".
 * - Aprimora a seção de cardápio: no desktop, converte as categorias
 *   (elementos <details> nativos) em um tablist acessível; no mobile,
 *   mantém o comportamento nativo de accordion. Sem JavaScript, todas as
 *   categorias continuam disponíveis como accordion nativo.
 * - Implementa busca simples (client-side) em todos os itens do cardápio,
 *   incluindo a seção Bar & Bebidas.
 * - Revela a seção de cardápio sob demanda ao clicar em "Cardápio"/"Ver
 *   cardápio" (ver setupMenuReveal). Sem JavaScript, a seção permanece
 *   sempre visível e os links continuam funcionando como âncoras normais.
 */
(function () {
  'use strict';

  function setupTheme() {
    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    var STORAGE_KEY = 'emporio-parrilla-theme';
    var label = toggle.querySelector('.theme-toggle-label');
    var themeColorMetas = document.querySelectorAll('meta[name="theme-color"]');

    function applyTheme(theme) {
      var isDark = theme === 'dark';
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
      toggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
      if (label) {
        label.textContent = isDark ? 'Modo claro' : 'Modo escuro';
      }
      themeColorMetas.forEach(function (meta) {
        meta.setAttribute('content', isDark ? '#141210' : '#F5F2EC');
      });
    }

    var stored = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      stored = null;
    }

    var prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    applyTheme(stored === 'dark' || stored === 'light' ? stored : prefersDark ? 'dark' : 'light');

    toggle.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* localStorage indisponível: preferência não será persistida entre visitas */
      }
    });
  }

  function setupMobileNav() {
    var header = document.querySelector('.site-header');
    var toggle = document.getElementById('mobileNavToggle');
    var nav = document.getElementById('primaryNavigation');
    if (!header || !toggle || !nav) return;

    var label = toggle.querySelector('.mobile-nav-toggle-label');
    var mq = window.matchMedia ? window.matchMedia('(min-width: 768px)') : null;

    function setOpen(open) {
      header.classList.toggle('is-nav-open', open);
      nav.setAttribute('data-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (label) {
        label.textContent = open ? 'Fechar menu' : 'Abrir menu';
      }
    }

    function closeOnDesktop(event) {
      if (event.matches) setOpen(false);
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
      if (!isOpen) {
        var firstNavLink = nav.querySelector('a');
        if (firstNavLink) firstNavLink.focus();
      }
    });

    nav.addEventListener('click', function (event) {
      var target = event.target;
      if (target && target.closest && target.closest('a')) {
        setOpen(false);
      }
    });

    if (mq) {
      if (mq.addEventListener) mq.addEventListener('change', closeOnDesktop);
      else if (mq.addListener) mq.addListener(closeOnDesktop);
    }

    header.classList.add('is-nav-ready');
    setOpen(false);
  }

  function setupHeroVideo() {
    var video = document.getElementById('heroVideo');
    if (!video) return;

    // Vídeo do hero temporariamente desativado (ver comentário no
    // index.html): a tag <source> foi comentada, então video.currentSrc
    // fica vazio e não há nada para tocar. Encerra cedo para não chamar
    // play() à toa; o poster (assets/img/hero.jpeg) já é exibido pelo
    // próprio elemento <video> como imagem estática. Quando a <source>
    // for reativada, esta checagem simplesmente deixa de bloquear e o
    // fluxo normal de autoplay volta a funcionar sem outra alteração.
    if (!video.currentSrc) return;

    var reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      // Respeita a preferência do usuário: não autoplay, mantém o poster
      // (assets/img/hero.jpeg) como imagem estática em vez do vídeo em loop.
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }

    // Alguns navegadores podem bloquear o autoplay mesmo com muted; nesse
    // caso o elemento simplesmente permanece exibindo o poster, sem erro
    // visível para o usuário.
    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {
        /* autoplay bloqueado pelo navegador: poster permanece visível */
      });
    }
  }

  // Animação de entrada do Hero (logo, overlay, nome da marca, subtítulo,
  // CTAs), via GSAP carregado por CDN. Dispara uma única vez ao carregar a
  // página, sem vínculo com scroll. Progressive enhancement: o CSS já
  // renderiza o estado final (visível, sem transform) por padrão; esta
  // função apenas "rebobina" para o estado inicial via gsap.set() antes de
  // animar de volta ao estado final. Se GSAP não estiver disponível (CDN
  // fora do ar) ou o usuário preferir movimento reduzido, a função retorna
  // sem tocar no DOM e o CSS padrão permanece visível. Não interfere com
  // setupHeroVideo(), que cuida do <video> de fundo separadamente.
  function setupHeroEntrance() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    if (typeof gsap === 'undefined') return;

    var logo = hero.querySelector('.hero-logo');
    var overlay = hero.querySelector('.hero-overlay');
    var brand = hero.querySelector('.hero-brand');
    var subtitle = hero.querySelector('.hero-subtitle');
    var actions = hero.querySelector('.hero-actions');

    if (!logo || !overlay || !brand || !subtitle || !actions) return;

    // Estado inicial: logo maior/deslocada e transparente, overlay mais
    // escuro que o padrão, texto e CTAs deslocados para baixo e invisíveis.
    gsap.set(logo, { scale: 1.35, y: 28, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(overlay, { opacity: 1 });
    gsap.set([brand, subtitle, actions], { opacity: 0, y: 16 });

    // Altura da seção: o CSS base já define `.hero { min-height: 70vh }`
    // como estado final estático (progressive enhancement — o que aparece
    // sem JS e com prefers-reduced-motion). Aqui o JS "expande" para tela
    // cheia (100vh) antes da timeline começar, mantém 100vh durante todo o
    // zoom da logo/clareamento do overlay/cascata do texto, e só encolhe de
    // volta para o valor final (70vh) depois que a timeline de entrada
    // termina — replicando o efeito de referência (hero em tela cheia que
    // recolhe após o impacto inicial).
    gsap.set(hero, { minHeight: '100vh' });

    var tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Logo volta ao tamanho normal enquanto o overlay clareia até o valor
    // padrão (opacity: 0.85, definido em css/styles.css .hero-overlay).
    tl.to(logo, { scale: 1, y: 0, opacity: 1, duration: 1.3 }, 0)
      .to(overlay, { opacity: 0.85, duration: 1.3 }, 0)
      // Cascata: nome da marca, depois subtítulo, depois CTAs, com ~0.2s
      // de diferença entre o início de cada um.
      .to(brand, { opacity: 1, y: 0, duration: 0.55 }, 1.05)
      .to(subtitle, { opacity: 1, y: 0, duration: 0.55 }, 1.25)
      .to(actions, { opacity: 1, y: 0, duration: 0.6 }, 1.45)
      // Só depois que todo o texto já está no estado final, a seção
      // encolhe suavemente de 100vh para a altura final (70vh), revelando
      // o início da próxima seção.
      .to(hero, { minHeight: '70vh', duration: 0.7, ease: 'power2.inOut' }, '>');
  }

  // Revela a seção de cardápio sob demanda ao clicar em "Cardápio"
  // (header) ou "Ver cardápio" (hero) — qualquer link que aponte para
  // #cardapio. Sem JavaScript, a seção permanece visível o tempo todo (não
  // há atributo `hidden` no HTML), e os links continuam funcionando como
  // âncoras normais de navegação.
  function setupMenuReveal() {
    var section = document.getElementById('cardapio');
    var heading = document.getElementById('cardapioTitle');
    var triggers = Array.prototype.slice.call(
      document.querySelectorAll('a[href="#cardapio"]')
    );

    if (!section || !heading || !triggers.length) return;

    function syncTriggers() {
      var expanded = !section.hidden;
      triggers.forEach(function (trigger) {
        trigger.setAttribute('aria-expanded', String(expanded));
      });
    }

    function reveal(moveFocus) {
      var wasHidden = section.hidden;
      section.hidden = false;
      syncTriggers();
      if (moveFocus && wasHidden) {
        // Aguarda o próximo quadro para garantir que a seção já esteja
        // visível/no layout antes de mover o foco para o título.
        window.requestAnimationFrame(function () {
          heading.focus();
        });
      }
    }

    triggers.forEach(function (trigger) {
      trigger.setAttribute('aria-controls', 'cardapio');
      trigger.addEventListener('click', function () {
        // Não impede o comportamento padrão do link-âncora: apenas garante
        // que a seção esteja visível antes de o navegador saltar até ela.
        reveal(true);
      });
    });

    // Se a página já carregar com #cardapio na URL (ex.: link direto
    // compartilhado), mantém a seção visível em vez de escondê-la sob o
    // usuário.
    if (window.location.hash === '#cardapio') {
      section.hidden = false;
    } else {
      section.hidden = true;
    }
    syncTriggers();
  }

  function normalize(value) {
    return (value || '')
      .toString()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .trim();
  }

  function setupMenu() {
    var foodContainer = document.getElementById('menuCategories');
    var barContainer = document.getElementById('barCategories');
    var tabsBar = document.getElementById('menuTabs');
    var searchInput = document.getElementById('menuSearch');
    var clearButton = document.getElementById('menuSearchClear');
    var noResults = document.getElementById('menuNoResults');

    if (!foodContainer) return;

    var foodDetails = Array.prototype.slice.call(
      foodContainer.querySelectorAll(':scope > details.menu-category')
    );
    var barDetails = barContainer
      ? Array.prototype.slice.call(barContainer.querySelectorAll(':scope > details.menu-category'))
      : [];
    var allDetails = foodDetails.concat(barDetails);

    if (!foodDetails.length) return;

    var mq = window.matchMedia ? window.matchMedia('(min-width: 768px)') : null;
    var tabButtons = [];
    var activeIndex = 0;
    var tabsBuilt = false;

    function buildTabs() {
      if (tabsBuilt || !tabsBar) return;
      tabsBuilt = true;

      foodDetails.forEach(function (det, index) {
        var summary = det.querySelector('summary');
        var body = det.querySelector('.menu-category-body');
        if (body) {
          body.id = body.id || det.id + '-panel';
        }

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'menu-tab';
        btn.id = det.id + '-tab';
        btn.setAttribute('role', 'tab');
        if (body) btn.setAttribute('aria-controls', body.id);
        btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        btn.tabIndex = index === 0 ? 0 : -1;
        btn.textContent = summary ? summary.textContent.trim() : det.id;

        btn.addEventListener('click', function () {
          activateTab(index, false);
        });
        btn.addEventListener('keydown', function (event) {
          onTabKeydown(event, index);
        });

        tabsBar.appendChild(btn);
        tabButtons.push(btn);
      });
    }

    function onTabKeydown(event, index) {
      var lastIndex = tabButtons.length - 1;
      var newIndex = null;

      if (event.key === 'ArrowRight') newIndex = index === lastIndex ? 0 : index + 1;
      else if (event.key === 'ArrowLeft') newIndex = index === 0 ? lastIndex : index - 1;
      else if (event.key === 'Home') newIndex = 0;
      else if (event.key === 'End') newIndex = lastIndex;

      if (newIndex !== null) {
        event.preventDefault();
        activateTab(newIndex, true);
      }
    }

    function activateTab(index, focusButton) {
      activeIndex = index;
      foodDetails.forEach(function (det, i) {
        det.open = i === index;
      });
      syncTabButtons(focusButton);
    }

    function syncTabButtons(focusButton) {
      tabButtons.forEach(function (btn, i) {
        var isActive = i === activeIndex;
        btn.setAttribute('aria-selected', String(isActive));
        btn.tabIndex = isActive ? 0 : -1;
        if (isActive && focusButton) btn.focus();
      });
    }

    function setTabpanelAttributes(enabled) {
      foodDetails.forEach(function (det) {
        var body = det.querySelector('.menu-category-body');
        if (!body) return;
        if (enabled) {
          body.setAttribute('role', 'tabpanel');
          body.setAttribute('aria-labelledby', det.id + '-tab');
          body.setAttribute('tabindex', '0');
        } else {
          body.removeAttribute('role');
          body.removeAttribute('aria-labelledby');
          body.removeAttribute('tabindex');
        }
      });
    }

    function resetItemsVisibility() {
      allDetails.forEach(function (det) {
        var items = det.querySelectorAll('.menu-item');
        items.forEach(function (item) {
          item.hidden = false;
        });
      });
    }

    function isSearching() {
      return Boolean(searchInput && normalize(searchInput.value).length > 0);
    }

    function showTabsMode() {
      buildTabs();
      resetItemsVisibility();
      if (tabsBar) {
        tabsBar.hidden = false;
        tabsBar.setAttribute('role', 'tablist');
        tabsBar.setAttribute('aria-label', 'Categorias do cardápio');
      }
      foodContainer.classList.add('is-tabs-mode');
      setTabpanelAttributes(true);
      allDetails.forEach(function (det) {
        det.hidden = false;
      });
      activateTab(activeIndex, false);
    }

    function showAccordionMode() {
      resetItemsVisibility();
      if (tabsBar) tabsBar.hidden = true;
      foodContainer.classList.remove('is-tabs-mode');
      setTabpanelAttributes(false);
      allDetails.forEach(function (det) {
        det.hidden = false;
      });
    }

    function showSearchResults() {
      var query = normalize(searchInput.value);
      if (tabsBar) tabsBar.hidden = true;
      foodContainer.classList.remove('is-tabs-mode');
      setTabpanelAttributes(false);

      var totalVisible = 0;
      allDetails.forEach(function (det) {
        var items = det.querySelectorAll('.menu-item');
        var categoryHasMatch = items.length === 0; // blocos informativos (ex.: Churrasco na Parrilla) seguem visíveis

        items.forEach(function (item) {
          var match = normalize(item.textContent).indexOf(query) !== -1;
          item.hidden = !match;
          if (match) {
            categoryHasMatch = true;
            totalVisible += 1;
          }
        });

        det.hidden = !categoryHasMatch;
        if (categoryHasMatch) det.open = true;
      });

      if (noResults) noResults.hidden = totalVisible !== 0;
      if (clearButton) clearButton.hidden = false;
    }

    function refreshView() {
      if (isSearching()) {
        showSearchResults();
        return;
      }
      if (noResults) noResults.hidden = true;
      if (clearButton) clearButton.hidden = true;
      if (mq && mq.matches) showTabsMode();
      else showAccordionMode();
    }

    if (mq) {
      if (mq.addEventListener) mq.addEventListener('change', refreshView);
      else if (mq.addListener) mq.addListener(refreshView);
    }

    if (searchInput) {
      searchInput.addEventListener('input', refreshView);
    }
    if (clearButton) {
      clearButton.addEventListener('click', function () {
        searchInput.value = '';
        refreshView();
        searchInput.focus();
      });
    }

    refreshView();
  }

  // Vídeo decorativo da seção Sobre (fundo já explicado pelo texto ao
  // lado). Ao contrário do hero, esta seção não é a primeira coisa vista
  // ao carregar a página, então o vídeo só é carregado (e reproduzido)
  // quando a seção #sobre entra em viewport, via IntersectionObserver —
  // mesma técnica usada em setupGalleryCarousel() para o carrossel da
  // galeria. Sem IntersectionObserver, o vídeo permanece com preload="none"
  // e apenas o poster (assets/img/ambiente-salao-cheio.jpg) é exibido, sem
  // requisição adicional. Com prefers-reduced-motion: reduce, o vídeo nunca
  // é carregado nem reproduzido: o poster permanece como imagem estática.
  function setupSobreVideo() {
    var section = document.getElementById('sobre');
    var video = document.getElementById('sobreVideo');
    if (!section || !video) return;

    var reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    if (typeof window.IntersectionObserver === 'undefined') {
      // Sem suporte a IntersectionObserver: mantém preload="none" e o
      // poster estático, em vez de carregar o vídeo sem controle de quando.
      return;
    }

    var started = false;

    function start() {
      if (started) return;
      started = true;
      video.preload = 'auto';
      video.load();
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          /* autoplay bloqueado pelo navegador: poster permanece visível */
        });
      }
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(section);
  }

  function setupGalleryCarousel() {
    var section = document.getElementById('galeria');
    var carousel = document.getElementById('galleryCarousel');
    if (!section || !carousel) return;

    var trackA = carousel.querySelector('.gallery-track-a');
    var trackB = carousel.querySelector('.gallery-track-b');
    if (!trackA || !trackB) return;

    var reduceMotionQuery = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

    var ticking = false;
    var inView = false;
    var observer = null;

    function resetScroll() {
      trackA.scrollLeft = 0;
      trackB.scrollLeft = 0;
    }

    function update() {
      ticking = false;
      if (!inView) return;

      var rect = section.getBoundingClientRect();
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      var total = rect.height + viewportHeight;
      var raw = total > 0 ? (viewportHeight - rect.top) / total : 0;
      var progress = Math.min(1, Math.max(0, raw));

      // scrollLeft (não transform) é usado de propósito: a trilha continua
      // nativamente rolável (overflow-x: auto) em qualquer cenário — se o
      // cálculo de progresso falhar por qualquer motivo, o usuário ainda
      // consegue arrastar/rolar a trilha manualmente e alcançar todas as
      // fotos, inclusive a última de cada lado.
      var maxOffsetA = trackA.scrollWidth - trackA.clientWidth;
      var maxOffsetB = trackB.scrollWidth - trackB.clientWidth;

      if (maxOffsetA > 0) {
        trackA.scrollLeft = progress * maxOffsetA;
      }
      if (maxOffsetB > 0) {
        // Trilha B se move em sentido oposto: começa no fim e volta ao início.
        trackB.scrollLeft = maxOffsetB - progress * maxOffsetB;
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    function enable() {
      carousel.classList.add('gallery-carousel--enhanced');
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);

      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          inView = entry.isIntersecting;
          if (inView) onScroll();
        });
      }, { threshold: 0 });
      observer.observe(section);

      onScroll();
    }

    function disable() {
      carousel.classList.remove('gallery-carousel--enhanced');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      resetScroll();
    }

    if (
      !reduceMotionQuery ||
      typeof window.IntersectionObserver === 'undefined' ||
      typeof window.requestAnimationFrame === 'undefined'
    ) {
      // Sem suporte a matchMedia/IntersectionObserver/rAF: mantém o
      // carrossel estático e navegável por scroll horizontal manual.
      return;
    }

    if (!reduceMotionQuery.matches) enable();

    if (reduceMotionQuery.addEventListener) {
      reduceMotionQuery.addEventListener('change', function (e) {
        if (e.matches) disable();
        else enable();
      });
    } else if (reduceMotionQuery.addListener) {
      reduceMotionQuery.addListener(function (e) {
        if (e.matches) disable();
        else enable();
      });
    }
  }

  // Cada setup roda isolado: um erro em uma função não deve impedir a
  // inicialização das demais (ex.: um problema em setupMenu não pode
  // deixar a Galeria sem o efeito de scroll).
  function safeSetup(fn) {
    try {
      fn();
    } catch (error) {
      if (window.console && window.console.error) {
        window.console.error('[main.js] Falha ao iniciar ' + fn.name + ':', error);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    safeSetup(setupTheme);
    safeSetup(setupMobileNav);
    safeSetup(setupHeroVideo);
    safeSetup(setupHeroEntrance);
    safeSetup(setupMenuReveal);
    safeSetup(setupMenu);
    safeSetup(setupSobreVideo);
    safeSetup(setupGalleryCarousel);
  });
})();
