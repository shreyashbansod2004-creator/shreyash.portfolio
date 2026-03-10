/* ===================== CUSTOM CURSOR ===================== */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
mx = e.clientX;
my = e.clientY;

cursor.style.left = (mx - 6) + 'px';
cursor.style.top  = (my - 6) + 'px';
});

function animateRing() {
rx += (mx - rx - 18) * 0.12;
ry += (my - ry - 18) * 0.12;

ring.style.left = rx + 'px';
ring.style.top  = ry + 'px';

requestAnimationFrame(animateRing);
}

animateRing();

/* ===================== PROGRESS BAR ===================== */
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
progressBar.style.width = pct + '%';
});

/* ===================== ELEMENTS ===================== */

const fadeTexts = document.querySelectorAll('.fade-text');
const pops = document.querySelectorAll('.fade-pop');

const heroName = document.getElementById('heroName');
const nav = document.getElementById('navbar');
const home = document.getElementById('home');

const scrollBtn = document.getElementById('scrollTopBtn');

let lastScroll = 0;

/* ===================== PAGE LOAD ===================== */

window.addEventListener('load', () => {

fadeTexts.forEach(el => el.classList.add('show'));
pops.forEach(el => el.classList.add('show'));

if (heroName) {
heroName.style.opacity = '1';
heroName.style.transform = 'translateY(0)';
}

});

/* ===================== SCROLL ===================== */

window.addEventListener('scroll', () => {

const current = window.scrollY;

fadeTexts.forEach(el => {
if (el.getBoundingClientRect().top < window.innerHeight - 120) {
el.classList.add('show');
}
});

/* NAVBAR HIDE SHOW */

if (current > lastScroll + 10 && current > 150) {
nav.classList.add('nav-close');
} else {
nav.classList.remove('nav-close');
}

lastScroll = current;

scrollBtn.classList.toggle('show', window.scrollY > 300);

});

/* ===================== SCROLL TOP BUTTON ===================== */

scrollBtn.addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===================== PROJECT MODALS ===================== */

function openProject1() {
document.getElementById('projectModal1').style.display = 'flex';
}

function closeProject1() {
document.getElementById('projectModal1').style.display = 'none';
}

function openProject2() {
document.getElementById('projectModal2').style.display = 'flex';
}

function closeProject2() {
document.getElementById('projectModal2').style.display = 'none';
}

/* ===================== CONTACT ===================== */

function openContact() {
document.getElementById('contactPopup').style.display = 'flex';
}

function closeContact() {
document.getElementById('contactPopup').style.display = 'none';
}

/* CLOSE MODALS */

window.onclick = function(e) {

if (e.target.id === 'projectModal1') closeProject1();
if (e.target.id === 'projectModal2') closeProject2();
if (e.target.id === 'contactPopup') closeContact();

};
