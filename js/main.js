(() => {
    const scrollButton = document.querySelector('.hero__scroll');
    const navbarLinks = document.querySelectorAll('.navbar-list__link');
    const root = document.documentElement;
    const unlockDelay = 350;
    const revealDelay = 850;
    const scrollKeys = [
        ' ',
        'Spacebar',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
    ];

    let isLocked = true;
    let isUnlocking = false;

    const preventScroll = (event) => {
        event.preventDefault();
    };

    const preventKeyScroll = (event) => {
        if (scrollKeys.includes(event.key)) {
            event.preventDefault();
        }
    };

    const resetScroll = () => {
        if (!isLocked) {
            return;
        }

        root.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        root.style.scrollBehavior = '';
    };

    const lockScroll = () => {
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        window.addEventListener('keydown', preventKeyScroll);
        window.addEventListener('scroll', resetScroll);
        resetScroll();
    };

    const unlockScroll = () => {
        window.removeEventListener('wheel', preventScroll, { passive: false });
        window.removeEventListener('touchmove', preventScroll, { passive: false });
        window.removeEventListener('keydown', preventKeyScroll);
        window.removeEventListener('scroll', resetScroll);
    };

    root.classList.add('page-locked');
    lockScroll();

    scrollButton.addEventListener('click', (event) => {
        if (!isLocked) {
            return;
        }

        event.preventDefault();

        if (isUnlocking) {
            return;
        }

        isUnlocking = true;
        scrollButton.classList.add('hero__scroll--unlocking');

        window.setTimeout(() => {
            scrollButton.classList.remove('hero__scroll--unlocking');
            scrollButton.classList.add('hero__scroll--open');

            window.setTimeout(() => {
                isLocked = false;
                isUnlocking = false;
                root.classList.remove('page-locked');
                unlockScroll();

                const target = document.querySelector(scrollButton.getAttribute('href'));

                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, revealDelay);
        }, unlockDelay);
    });

    navbarLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            if (!isLocked) {
                return;
            }

            event.preventDefault();

            scrollButton.classList.remove('hero__scroll--shake');
            void scrollButton.offsetWidth;
            scrollButton.classList.add('hero__scroll--shake');
        });
    });

    scrollButton.addEventListener('animationend', (event) => {
        if (event.animationName === 'hero-lock-shake') {
            scrollButton.classList.remove('hero__scroll--shake');
        }
    });

    const gallerySlider = document.querySelector('.gallery__slider');

    if (gallerySlider && typeof Swiper !== 'undefined') {
        new Swiper(gallerySlider, {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 24,
            loop: true,
            speed: 600,
            grabCursor: true,
            keyboard: {
                enabled: true,
            },
            a11y: {
                prevSlideMessage: 'Предыдущее фото',
                nextSlideMessage: 'Следующее фото',
            },
            navigation: {
                prevEl: '.gallery__button--prev',
                nextEl: '.gallery__button--next',
            },
        });
    }
})();
