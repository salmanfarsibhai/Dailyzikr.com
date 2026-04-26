'use strict';

const slider = document.querySelector('.slider');
const navItems = document.querySelectorAll('nav li');
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

/* NAVIGATION */
navItems.forEach((item, i) => {
    item.addEventListener('click', () => {
        slider.style.transform = `translateX(-${i * 100}vw)`;

        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        navMenu.classList.remove('active');
    });
});

/* MENU */
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

/* SMART SEARCH WITH RESET ORDER */
function smartSearch(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    const original = [...list.children];

    input.addEventListener('input', () => {
        const value = input.value.toLowerCase();

        if (value === "") {
            list.innerHTML = "";
            original.forEach(el => list.appendChild(el));
            return;
        }

        const items = [...list.children];

        items.sort((a, b) => {
            const aMatch = a.textContent.toLowerCase().includes(value);
            const bMatch = b.textContent.toLowerCase().includes(value);
            return bMatch - aMatch;
        });

        items.forEach(el => list.appendChild(el));
    });
}

smartSearch('quranSearch', 'quranList');
smartSearch('hadithSearch', 'hadithList');
smartSearch('duaSearch', 'duaList');

/* BLOCK DEVTOOLS */
document.addEventListener('keydown', e => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
    }
});

/* ===== SCROLL ANIMATION ===== */

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll('.item').forEach((el) => {
    observer.observe(el);
});
