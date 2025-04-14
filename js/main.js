function openAllDetails() {
    document.querySelectorAll('details').forEach(detail => detail.setAttribute('open', ''));
}

function closeAllDetails() {
    document.querySelectorAll('details').forEach(detail => detail.removeAttribute('open'));
}

window.addEventListener('beforeprint', openAllDetails);
window.addEventListener('afterprint', closeAllDetails);
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});