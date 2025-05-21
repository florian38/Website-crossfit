//Variable
const navToggle = document.querySelector('.nav-toggle');
const nav         = document.querySelector('.main-nav');
const hamburger = navToggle.querySelector('.hamburger');
const toggleTheme = document.getElementById('theme-toggle-checkbox');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme');

//Init
if (savedTheme) {
    html.dataset.theme = savedTheme;
    toggleTheme.checked = savedTheme === 'dark';
}

//Function
function switchTheme() {
    html.dataset.theme = toggleTheme.checked ? 'dark' : 'light';
    localStorage.setItem('theme', html.dataset.theme);
}

function openAllDetails() {
    document.querySelectorAll('details').forEach(detail => detail.setAttribute('open', ''));
}

function closeAllDetails() {
    document.querySelectorAll('details').forEach(detail => detail.removeAttribute('open'));
}

function closeAllDetails() {
    document.querySelectorAll('details').forEach(detail => detail.removeAttribute('open'));
}

function onNavScroll() {
    const isScrolled = window.scrollY > 50;
    nav.classList.toggle('scrolled', isScrolled);
}

function onNavToggleClick() {
    nav.classList.toggle('open');
    hamburger.classList.toggle('is-active');
}

function initRevealObserver() {
    const selector = '.animate-in, .animate-in-delay';

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('visible');
            if (entry.target.matches('.animate-in-delay'))
            {
                entry.target.querySelectorAll(':scope > *').forEach((el, i) => {
                    el.style.setProperty('--delay', `${i * 150}ms`);
                });
            }

            obs.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

function initFAQToggleAnimations() {
    document.querySelectorAll('.faq-question details').forEach(details => {
        const ps = details.querySelectorAll('p');

        details.addEventListener('toggle', () => {
            if (details.open) {
                ps.forEach(p => {
                    p.style.visibility = 'visible';
                    p.style.animation = 'fadeSlide 0.4s ease forwards';
                    p.addEventListener('animationend', () => {
                        p.style.animation = '';
                    }, { once: true });
                });
            } else {
                ps.forEach(p => {
                    p.style.animation = '';
                    p.style.visibility = 'hidden';
                });
            }
        });
    });
}

function initAllObservers() {
    initRevealObserver();
    initFAQToggleAnimations();
}


//Listener
window.addEventListener('beforeprint', openAllDetails);
window.addEventListener('afterprint', closeAllDetails);
window.addEventListener('scroll', onNavScroll);

toggleTheme.addEventListener('change', switchTheme);
navToggle.addEventListener('click', onNavToggleClick);
document.addEventListener('DOMContentLoaded', initAllObservers);
