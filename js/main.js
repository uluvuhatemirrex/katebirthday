(() => {
    const scrollButton = document.querySelector('.hero__scroll');
    const navbarLinks = document.querySelectorAll('.navbar-list__link');
    const root = document.documentElement;
    const unlockDelay = 350;
    const revealDelay = 850;

    let isLocked = true;
    let isUnlocking = false;

    root.classList.add('page-locked');

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
})();
