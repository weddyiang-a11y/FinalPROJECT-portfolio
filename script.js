const menu = document.getElementById("menuBtn");
const mobile = document.getElementById("mobileMenu");
const slides = Array.from(document.querySelectorAll(".slide"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const dotsWrapper = document.getElementById("slideDots");

let currentIndex = 0;

/* Build one dot per slide */
slides.forEach((slide, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsWrapper.appendChild(dot);
});

const dots = Array.from(dotsWrapper.children);

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;

  slides[currentIndex].classList.remove("active");
  dots[currentIndex].classList.remove("active");
  navLinks.forEach(link => {
    if (link.dataset.slide === slides[currentIndex].dataset.slide) {
      link.classList.remove("active");
    }
  });

  currentIndex = index;

  slides[currentIndex].classList.add("active");
  dots[currentIndex].classList.add("active");
  navLinks.forEach(link => {
    if (link.dataset.slide === slides[currentIndex].dataset.slide) {
      link.classList.add("active");
    }
  });

  if (slides[currentIndex].id === "skills") {
    animateBars();
  }

  mobile.classList.remove("active");
}

function goToSlideById(id) {
  const index = slides.findIndex(s => s.dataset.slide === id);
  if (index !== -1) goToSlide(index);
}

/* Nav link clicks (desktop + mobile + hero buttons) */
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    goToSlideById(link.dataset.slide);
  });
});

/* Mobile hamburger menu */
menu.onclick = () => mobile.classList.toggle("active");

/* Keyboard arrow navigation */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowDown" || e.key === "ArrowRight") goToSlide(currentIndex + 1);
  if (e.key === "ArrowUp" || e.key === "ArrowLeft") goToSlide(currentIndex - 1);
});

/* Animate skill bars */
function animateBars() {
  document.querySelectorAll(".bar span").forEach(bar => {
    bar.style.width = bar.dataset.width;
  });
}

/* ===== EmailJS setup =====
   1. Sign up free at https://www.emailjs.com
   2. Add an Email Service (e.g. connect your Gmail) -> copy its Service ID
   3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
      -> copy its Template ID
   4. Go to Account > General -> copy your Public Key
   5. Paste all three values below
*/
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(EMAILJS_PUBLIC_KEY);

/* Contact form */
function sendMessage() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const sendBtn = document.querySelector(".contact button");

  const n = nameInput.value.trim();
  const e = emailInput.value.trim();
  const m = messageInput.value.trim();

  if (!n || !e || !m) return alert("Fill all fields");

  const originalText = sendBtn.textContent;
  sendBtn.textContent = "Sending...";
  sendBtn.disabled = true;

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: n,
    from_email: e,
    message: m,
    to_email: "weddyiang@gmail.com"
  }).then(() => {
    alert(`Thank you ${n}! Your message has been sent.`);
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  }).catch((err) => {
    console.error("EmailJS error:", err);
    alert("Something went wrong sending your message. Please try again.");
  }).finally(() => {
    sendBtn.textContent = originalText;
    sendBtn.disabled = false;
  });
}