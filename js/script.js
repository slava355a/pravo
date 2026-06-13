(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        // ===================== BURGER MENU =====================
        const burger = document.getElementById('burgerToggle');
        const menu = document.getElementById('navMenu');

        if (burger && menu) {

            function closeMenu() {
                menu.classList.remove('nav_active');
                burger.classList.remove('burger_active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }

            burger.addEventListener('click', (e) => {
                e.stopPropagation();

                const isExpanded = burger.getAttribute('aria-expanded') === 'true';
                burger.setAttribute('aria-expanded', String(!isExpanded));

                menu.classList.toggle('nav_active');
                burger.classList.toggle('burger_active');
                document.body.classList.toggle('menu-open');
            });

            document.addEventListener('click', (e) => {
                if (!menu.contains(e.target) && !burger.contains(e.target)) {
                    closeMenu();
                }
            });

            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', closeMenu);
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeMenu();
                }
            });

        }

        // ===================== HERO ANIMATION =====================
        const title = document.querySelector(".hero-section__title");
        const subtitle = document.querySelector(".hero-section__subtitle");
        const button = document.querySelector(".hero-section__button");
        const stats = document.querySelector(".hero-section__stats");

        if (title) setTimeout(() => title.classList.add("active"), 200);
        if (subtitle) setTimeout(() => subtitle.classList.add("active"), 400);
        if (button) setTimeout(() => button.classList.add("active"), 600);
        if (stats) setTimeout(() => stats.classList.add("active"), 800);

        // ===================== REVEAL ON SCROLL =====================
        const revealElements = document.querySelectorAll(".reveal");

        function revealOnScroll() {

            const windowHeight = window.innerHeight;

            revealElements.forEach((element, index) => {

                if (!element || element.classList.contains("active")) return;

                const elementTop = element.getBoundingClientRect().top;
                const revealPoint = 120;

                if (elementTop < windowHeight - revealPoint) {

                    setTimeout(() => {
                        element.classList.add("active");
                    }, index * 120);

                }

            });
        }

        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll();

        // ===================== BENEFITS SECTION =====================
        const gridItems = document.querySelectorAll('.benefits-grid__item');
        const bgDecor = document.querySelector('.benefits__decor');

        if (gridItems.length) {

            gridItems.forEach((item) => {
                const delay = item.dataset.delay || 0;
                item.style.animation = `fadeInUp 0.8s ease ${delay / 1000}s forwards`;
            });

            const observer = new IntersectionObserver((entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.animation = 'none';
                        entry.target.offsetHeight;

                        const delay = entry.target.dataset.delay || 0;

                        entry.target.style.animation =
                            `fadeInUp 0.8s ease ${delay / 1000}s forwards`;
                    }
                });

            }, { threshold: 0.2 });

            gridItems.forEach(item => observer.observe(item));
        }

        // ===================== PARALLAX =====================
        if (bgDecor) {

            let ticking = false;

            window.addEventListener('scroll', () => {

                if (ticking) return;

                ticking = true;

                requestAnimationFrame(() => {

                    const scrolled = window.pageYOffset;
                    bgDecor.style.transform = `translateX(${scrolled * 0.1}px)`;

                    ticking = false;
                });
            });
        }

        // ===================== TOUCH HOVER =====================
        if ('ontouchstart' in window && gridItems.length) {

            gridItems.forEach(item => {

                item.addEventListener('touchstart', () => {
                    item.classList.add('hover-effect');
                });

                item.addEventListener('touchend', () => {
                    setTimeout(() => {
                        item.classList.remove('hover-effect');
                    }, 300);
                });

            });
        }

        // ===================== NUMBER ANIMATION =====================
        const numberObserver = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    animateNumbers();
                    obs.disconnect();
                }

            });

        }, { threshold: 0.5 });

        if (gridItems.length) {
            numberObserver.observe(gridItems[0]);
        }

        function animateNumbers() {

            document.querySelectorAll('.benefits-grid__number').forEach(el => {

                const text = el.textContent;
                const number = parseInt(text.replace(/\D/g, ''));

                if (isNaN(number)) return;

                let current = 0;
                const target = number;
                const increment = Math.max(1, Math.ceil(number / 50));
                const originalText = text;

                const timer = setInterval(() => {

                    current += increment;

                    if (current >= target) {
                        el.textContent = originalText.replace(number, target);
                        clearInterval(timer);
                    } else {
                        el.textContent = originalText.replace(number, current);
                    }

                }, 20);

            });
        }

        // ===================== NOTIFICATION =====================
        window.showNotification = function (message) {

            const old = document.querySelector('.notification');
            if (old) old.remove();

            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            notification.setAttribute('role', 'alert');

            document.body.appendChild(notification);

            setTimeout(() => {

                notification.style.opacity = '0';

                setTimeout(() => {
                    notification.remove();
                }, 300);

            }, 3000);
        };

    });

    // ===================== FAQ ACCORDION =====================
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length) {

        faqItems.forEach(item => {

            const button = item.querySelector('.faq-item__question');

            if (!button) return;

            button.addEventListener('click', () => {

                const isActive = item.classList.contains('active');

                faqItems.forEach(el => {

                    el.classList.remove('active');

                    const answer = el.querySelector('.faq-item__answer');

                    if (answer) answer.style.maxHeight = null;

                });

                if (!isActive) {

                    item.classList.add('active');

                    const answer = item.querySelector('.faq-item__answer');

                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                }
            });

        });

        window.addEventListener('load', () => {

            const activeItem = document.querySelector('.faq-item.active');

            if (activeItem) {
                const answer = activeItem.querySelector('.faq-item__answer');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }

        });
    }

})();












