/* ================= ELEMENTS ================= */

const fadeTexts = document.querySelectorAll(".fade-text");
const pops = document.querySelectorAll(".fade-pop");
const heroName = document.querySelector(".hero-name");
const nav = document.getElementById("navbar");
const home = document.getElementById("home");
const flipInner = document.querySelector(".flip-inner");
const scrollBtn = document.getElementById("scrollTopBtn");

let lastScroll = 0;

/* ================= PAGE LOAD ================= */

window.addEventListener("load",()=>{

 fadeTexts.forEach(el=>el.classList.add("show"));
 pops.forEach(el=>el.classList.add("show"));

 if(heroName){
  heroName.style.opacity="1";
  heroName.style.transform="translateY(0)";
 }

});

/* ================= SCROLL ================= */

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

 if(window.scrollY > 300){
  scrollBtn.classList.add("show");
 }else{
  scrollBtn.classList.remove("show");
 }

});

/* ================= SCROLL TOP ================= */

scrollBtn.addEventListener("click",()=>{

 window.scrollTo({
  top:0,
  behavior:"smooth"
 });

});

/* ================= IMAGE FLIP ================= */

setInterval(()=>{

 if(flipInner){
  flipInner.classList.toggle("flip");
 }

},5000);


/* ================= PROJECT MODALS ================= */

function openProject1(){
 document.getElementById("projectModal1").style.display="flex";
}

function closeProject1(){
 document.getElementById("projectModal1").style.display="none";
}

function openProject2(){
 document.getElementById("projectModal2").style.display="flex";
}

function closeProject2(){
 document.getElementById("projectModal2").style.display="none";
}

/* ================= CONTACT POPUP ================= */

function openContact(){
 document.getElementById("contactPopup").style.display="flex";
}

function closeContact(){
 document.getElementById("contactPopup").style.display="none";
}

/* ================= OUTSIDE CLICK CLOSE ================= */

window.onclick = function(event){

 if(event.target.id === "projectModal1"){
  closeProject1();
 }

 if(event.target.id === "projectModal2"){
  closeProject2();
 }

 if(event.target.id === "contactPopup"){
  closeContact();
 }

};


/* ================= TYPING TEXT LOOP ================= */

const typingEl = document.getElementById("typing");

if(typingEl){

const texts = [
 "Data Science Engineer",
 "AI / ML Engineer",
 "Data Science Enthusiast"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop(){

 const currentText = texts[textIndex];

 if(!isDeleting){
  typingEl.textContent = currentText.substring(0,charIndex+1);
  charIndex++;

  if(charIndex === currentText.length){
   isDeleting = true;
   setTimeout(typeLoop,1200);
   return;
  }

 }else{

  typingEl.textContent = currentText.substring(0,charIndex-1);
  charIndex--;

  if(charIndex === 0){
   isDeleting = false;
   textIndex = (textIndex + 1) % texts.length;
  }

 }

 setTimeout(typeLoop, isDeleting ? 40 : 80);
}

typeLoop();

}


/* ================= NEURAL BACKGROUND ================= */

const canvas = document.getElementById("neural-bg");

if(canvas){

 const ctx = canvas.getContext("2d");

 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;

 let particles = [];

 for(let i=0;i<70;i++){

  particles.push({
   x:Math.random()*canvas.width,
   y:Math.random()*canvas.height,
   vx:(Math.random()-.5)*1,
   vy:(Math.random()-.5)*1
  });

 }

 let mouse = {x:null,y:null};

 window.addEventListener("mousemove",e=>{
  mouse.x=e.x;
  mouse.y=e.y;
 });

 function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{

   p.x+=p.vx;
   p.y+=p.vy;

   if(p.x<0||p.x>canvas.width) p.vx*=-1;
   if(p.y<0||p.y>canvas.height) p.vy*=-1;

   ctx.beginPath();
   ctx.arc(p.x,p.y,2,0,Math.PI*2);
   ctx.fillStyle="#9CFF00";
   ctx.fill();

   particles.forEach(p2=>{

    let dist=Math.hypot(p.x-p2.x,p.y-p2.y);

    if(dist<120){

     ctx.beginPath();
     ctx.moveTo(p.x,p.y);
     ctx.lineTo(p2.x,p2.y);
     ctx.strokeStyle="rgba(156,255,0,0.15)";
     ctx.stroke();

    }

   });

   if(mouse.x){

    let dist=Math.hypot(p.x-mouse.x,p.y-mouse.y);

    if(dist<150){

     ctx.beginPath();
     ctx.moveTo(p.x,p.y);
     ctx.lineTo(mouse.x,mouse.y);
     ctx.strokeStyle="rgba(156,255,0,0.25)";
     ctx.stroke();

    }

   }

  });

  requestAnimationFrame(animate);

 }

 animate();

}


/* ================= APPLE SMOOTH SCROLL ================= */

document.querySelectorAll("a[href^='#']").forEach(anchor=>{

 anchor.addEventListener("click",function(e){

  e.preventDefault();

  document.querySelector(this.getAttribute("href"))
  .scrollIntoView({
   behavior:"smooth",
   block:"start"
  });

 });

});