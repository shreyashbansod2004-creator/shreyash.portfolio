const fadeTexts = document.querySelectorAll(".fade-text");
const pops = document.querySelectorAll(".fade-pop");
const heroWrap = document.querySelector(".hero-img-wrap");
const heroName = document.querySelector(".hero-name");
const nav = document.getElementById("navbar");
const home = document.getElementById("home");
const flipInner = document.querySelector(".flip-inner");
const scrollBtn = document.getElementById("scrollTopBtn");

let lastScroll = 0;

/* LOAD */
window.addEventListener("load",()=>{
 fadeTexts.forEach(el=>el.classList.add("show"));
 pops.forEach(el=>el.classList.add("show"));
 heroName.style.opacity="1";
 heroName.style.transform="translateY(0)";
 nav.classList.remove("nav-close");
});

/* SCROLL */
window.addEventListener("scroll",()=>{
 const current = window.scrollY;
 const homeTop = home.getBoundingClientRect().top;

 fadeTexts.forEach(el=>{
  if(el.getBoundingClientRect().top < window.innerHeight - 120){
   el.classList.add("show");
  }else{
   el.classList.remove("show");
  }
 });

 if(current > lastScroll && current > 150){
  nav.classList.add("nav-close");
 }else{
  if(homeTop > -200){
   nav.classList.remove("nav-close");
  }
 }

 lastScroll = current;

 /* 🔥 SHOW SCROLL BUTTON */
 if(window.scrollY > 300){
  scrollBtn.classList.add("show");
 }else{
  scrollBtn.classList.remove("show");
 }
});

/* Scroll To Top Click */
scrollBtn.addEventListener("click",()=>{
 window.scrollTo({
  top:0,
  behavior:"smooth"
 });
});

/* DOTS */
let scrollTimeout;

window.addEventListener("scroll",()=>{
 clearTimeout(scrollTimeout);

 for(let i=0;i<3;i++) createDot();

 scrollTimeout=setTimeout(()=>{
  document.querySelectorAll(".dot").forEach(d=>d.style.opacity=0);
 },400);
});

function createDot(){
 const dot=document.createElement("div");
 dot.className="dot";
 const s=Math.random()*10+6;
 dot.style.width=s+"px";
 dot.style.height=s+"px";
 dot.style.left=Math.random()*innerWidth+"px";
 dot.style.top=Math.random()*innerHeight+"px";
 document.body.appendChild(dot);
 setTimeout(()=>dot.remove(),1500);
}

/* HERO FLIP EVERY 5 SECONDS */
setInterval(()=>{
 flipInner.classList.toggle("flip");
},5000);

/* MODALS */
function openProject(){
 document.getElementById("projectModal").style.display="flex";
}

function closeProject(){
 document.getElementById("projectModal").style.display="none";
}

function openContact(){
 document.getElementById("contactPopup").style.display="flex";
}

function closeContact(){
 document.getElementById("contactPopup").style.display="none";
}
