
        document.addEventListener('DOMContentLoaded', function() {
            // Header Scroll Effect
            const headerScroll = {
                init: function() {
                    this.header = document.getElementById('main-header');
                    window.addEventListener('scroll', this.handleScroll.bind(this));
                },
                handleScroll: function() {
                    if (window.scrollY > 100) {
                        this.header.classList.add('header-scrolled');
                    } else {
                        this.header.classList.remove('header-scrolled');
                    }
                }
            };
            headerScroll.init();

            // Back to Top Button
            const backToTop = {
                init: function() {
                    this.button = document.getElementById('back-to-top');
                    window.addEventListener('scroll', this.toggleVisibility.bind(this));
                    this.button.addEventListener('click', this.scrollToTop.bind(this));
                },
                toggleVisibility: function() {
                    if (window.scrollY > 300) {
                        this.button.style.display = 'flex';
                    } else {
                        this.button.style.display = 'none';
                    }
                },
                scrollToTop: function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            };
            backToTop.init();
                       
            
            const burger = document.getElementById('burger');
            const panel = document.getElementById('main-menu');
            const backdrop = document.getElementById('backdrop');
            const links = document.querySelectorAll('.menu-item');

            function openMenu(){
            burger.classList.add('open');
            panel.classList.add('open');
            backdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
            }
            function closeMenu(){
            burger.classList.remove('open');
            panel.classList.remove('open');
            backdrop.classList.remove('show');
            document.body.style.overflow = '';
            }

            burger.addEventListener('click', ()=>{
            burger.classList.contains('open') ? closeMenu() : openMenu();
            });
            backdrop.addEventListener('click', closeMenu);
            window.addEventListener('keydown', e=>{if(e.key==="Escape") closeMenu();});

            // ✅ إغلاق القائمة عند الضغط على أي رابط
            links.forEach(link=>{
            link.addEventListener('click', ()=>{
                closeMenu();
            });
            });
            // Scroll Animations
            const scrollAnimations = {
                init: function() {
                    this.animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
                    this.sectionHeadings = document.querySelectorAll('.section-heading-underline');
                    this.setupObservers();
                },
                setupObservers: function() {
                    const observerOptions = {
                        root: null,
                        rootMargin: '0px',
                        threshold: 0.1
                    };

                    const scrollObserver = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('is-visible');
                                observer.unobserve(entry.target);
                            }
                        });
                    }, observerOptions);

                    this.animateOnScrollElements.forEach(el => {
                        scrollObserver.observe(el);
                    });

                    const headingObserver = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('is-visible');
                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.5 });

                    this.sectionHeadings.forEach(heading => {
                        headingObserver.observe(heading);
                    });
                }
            };
            scrollAnimations.init();

            // Animated Counters
            const animatedCounters = {
                init: function() {
                    this.counterObserver = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const counterElements = entry.target.querySelectorAll('.counter-value');
                                counterElements.forEach(counterElement => {
                                    this.animateCounter(counterElement);
                                });
                                observer.unobserve(entry.target);
                            }
                        });
                    }, {
                        threshold: 0.6
                    });

                    document.querySelectorAll('.bg-gradient-to-r .container').forEach(section => { 
                        this.counterObserver.observe(section);
                    });
                },
                animateCounter: function(counterElement) {
                    const target = parseInt(counterElement.dataset.target);
                    let current = 0;
                    const duration = 2500;
                    const start = performance.now();

                    const updateCounter = (timestamp) => {
                        const progress = (timestamp - start) / duration;
                        if (progress < 1) {
                            current = target * progress;
                            counterElement.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counterElement.textContent = target;
                        }
                    };
                    requestAnimationFrame(updateCounter);
                }
            };
            animatedCounters.init();

            // Set current year in footer
            document.getElementById('current-year').textContent = new Date().getFullYear();

            // Lazy loading images fallback
            if ('IntersectionObserver' in window) {
                const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const lazyImage = entry.target;
                            if (lazyImage.dataset.src) {
                                lazyImage.src = lazyImage.dataset.src;
                            }
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });

                document.querySelectorAll('img[loading="lazy"]').forEach(lazyImage => {
                    lazyImageObserver.observe(lazyImage);
                });
            }
        });
        // Header Shrink on Scroll
        const mainHeader = document.getElementById('main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                mainHeader.classList.add('header-scrolled');
            } else {
                mainHeader.classList.remove('header-scrolled');
            }
        });

        // Back to Top Button Logic
        const backToTopButton = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth Scroll for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll Animations (Intersection Observer for fade-in/slide-up)
        const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
        const sectionHeadings = document.querySelectorAll('.section-heading-underline');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateOnScrollElements.forEach(el => {
            scrollObserver.observe(el);
        });

        const headingObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of heading is visible

        sectionHeadings.forEach(heading => {
            headingObserver.observe(heading);
        });


        // Animated Counters
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counterElements = entry.target.querySelectorAll('.counter-value');
                    counterElements.forEach(counterElement => {
                        const target = parseInt(counterElement.dataset.target);
                        let current = 0;
                        const duration = 2500;
                        const start = performance.now();

                        const updateCounter = (timestamp) => {
                            const progress = (timestamp - start) / duration;
                            if (progress < 1) {
                                current = target * progress;
                                counterElement.textContent = Math.ceil(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counterElement.textContent = target;
                            }
                        };
                        requestAnimationFrame(updateCounter);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.6
        });

        document.querySelectorAll('.bg-gradient-to-r .container').forEach(section => { 
            counterObserver.observe(section);
        });

        // Image lazy loading (using loading="lazy" in HTML, this is a fallback/additional check)
        document.addEventListener("DOMContentLoaded", function() {
            var lazyloadImages = document.querySelectorAll("img[loading='lazy']");
            if ("IntersectionObserver" in window) {
                var imageObserver = new IntersectionObserver(function(entries, observer) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            var image = entry.target;
                            // For images with loading="lazy", they are handled by the browser.
                            // This part is more relevant if you were using data-src.
                            imageObserver.unobserve(image);
                        }
                    });
                });

                lazyloadImages.forEach(function(image) {
                    imageObserver.observe(image);
                });
            }
        });
        const swiperProduct = new Swiper(".productSwiper", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      loop: false,
      centeredSlides: false,
      navigation: {
        prevEl: ".swiper-button-next-product",
        nextEl: ".swiper-button-prev-product",
      },
      breakpoints: {
        640: { slidesPerView: 1.5, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 25 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      },
    });
  var swiper = new Swiper(".gallerySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });



    const switchBtns = document.querySelectorAll(".switch-btn");
  const sliders = document.querySelectorAll(".slider-wrapper");

  switchBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // تبديل الأزرار
      switchBtns.forEach(b => b.classList.remove("active", "bg-blue-600", "text-white"));
      switchBtns.forEach(b => b.classList.add("bg-white", "text-blue-600", "border", "border-blue-600"));

      btn.classList.add("active", "bg-blue-600", "text-white");
      btn.classList.remove("bg-white", "text-blue-600", "border");

      // إظهار/إخفاء السلايدرز
      sliders.forEach(slider => {
        if (slider.id === btn.dataset.target) {
          slider.classList.remove("hidden", "opacity-0", "scale-95");
          slider.classList.add("opacity-100", "scale-100");
        } else {
          slider.classList.add("opacity-0", "scale-95");
          setTimeout(() => slider.classList.add("hidden"), 300);
        }
      });
    });
  });