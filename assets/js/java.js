
  document.addEventListener('DOMContentLoaded', () => {
    /* تهيئة التبويبات */
    function initTabs(tabsContainerId, btnClass, panelClass, indicatorId) {
      const tabsContainer = document.getElementById(tabsContainerId);
      const buttons = Array.from(tabsContainer.querySelectorAll('.' + btnClass));
      const panels = Array.from(document.querySelectorAll('.' + panelClass));
      const indicator = document.getElementById(indicatorId);
      let currentIndex = 0;

      function activate(idx, focus=false) {
        if (idx < 0) idx = 0;
        if (idx >= buttons.length) idx = buttons.length - 1;
        const btn = buttons[idx];
        buttons.forEach(b => {
          b.classList.remove('text-blue-900');
          b.classList.add('text-gray-500');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.remove('text-gray-500');
        btn.classList.add('text-blue-900');
        btn.setAttribute('aria-selected', 'true');

        const target = btn.getAttribute('data-tab');
        panels.forEach(p => {
          if (p.getAttribute('data-tab') === target) {
            p.classList.remove('hidden');
          } else {
            p.classList.add('hidden');
          }
        });

        positionIndicator(btn, tabsContainer, indicator);
        currentIndex = idx;
        if (focus) btn.focus();
      }

      function positionIndicator(btn, container, indicatorEl) {
        const btnWidth = btn.offsetWidth;
        const indicatorWidth = Math.max(28, Math.min(Math.round(btnWidth * 0.5), 120));
        const left = btn.offsetLeft + (btnWidth - indicatorWidth) / 2;
        indicatorEl.style.width = indicatorWidth + 'px';
        indicatorEl.style.left = left + 'px';
      }

      buttons.forEach((b, i) => {
        b.addEventListener('click', () => activate(i));
      });

      activate(0);
      window.addEventListener('resize', () => {
        const activeBtn = buttons.find(b => b.getAttribute('aria-selected') === 'true') || buttons[0];
        positionIndicator(activeBtn, tabsContainer, indicator);
      });
    }

    initTabs('tabs1', 'tab1-btn', 'tab1-panel', 'indicator1');
    initTabs('tabs2', 'tab2-btn', 'tab2-panel', 'indicator2');

    /* تهيئة الشرائح */
    function initSlides(container) {
      const slides = Array.from(container.querySelectorAll('.slide'));
      const prevBtn = container.parentElement.querySelector('.prev');
      const nextBtn = container.parentElement.querySelector('.next');
      const current = container.parentElement.querySelector('.current');
      const total = container.parentElement.querySelector('.total');

      if (!slides.length) return;

      let index = 0;
      total.textContent = slides.length;

      function showSlide(n) {
        if (n < 0) n = 0;
        if (n > slides.length - 1) n = slides.length - 1;
        slides.forEach((el, i) => {
          el.classList.toggle('hidden', i !== n);
        });
        index = n;
        current.textContent = index + 1;
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index === slides.length - 1);
      }

      prevBtn.addEventListener('click', () => showSlide(index - 1));
      nextBtn.addEventListener('click', () => showSlide(index + 1));

      showSlide(0);
    }

    document.querySelectorAll('[data-slides]').forEach(initSlides);
  });