const menu=document.getElementById("menuBtn");
const mobile=document.getElementById("mobileMenu");

menu.onclick=()=>mobile.classList.toggle("active");

document.querySelectorAll(".mobile-menu a").forEach(a=>{
a.onclick=()=>mobile.classList.remove("active");
});

function animate(){

document.querySelectorAll(".reveal").forEach(el=>{
if(el.getBoundingClientRect().top<window.innerHeight-100)
el.classList.add("show");
});

document.querySelectorAll(".bar span").forEach(bar=>{
bar.style.width=bar.dataset.width;
});

}

window.addEventListener("scroll",animate);
animate();

function sendMessage(){
const n=name.value,e=email.value,m=message.value;

if(!n||!e||!m) return alert("Fill all fields");

alert(`Thank you ${n}!`);
name.value=email.value=message.value="";
}