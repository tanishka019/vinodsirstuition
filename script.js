const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});


// Counter Animation
const counters = document.querySelectorAll('.about-stats strong');
let started = false; // to ensure animation runs only once

function runCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
      const current = +counter.innerText;
      const increment = target / 100; // speed

      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + (counter.dataset.target.endsWith('%') ? "%" : "+");
      }
    };
    updateCount();
  });
}

// Detect when About section is in view
window.addEventListener('scroll', () => {
  const aboutSection = document.querySelector('.about');
  const sectionTop = aboutSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight && !started) {
    runCounters();
    started = true;
  }
});



// Scroll reveal for course cards
const courseCards = document.querySelectorAll('.course-card');

function revealCourses() {
  const triggerBottom = window.innerHeight * 0.85;

  courseCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if(cardTop < triggerBottom) {
      card.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealCourses);
window.addEventListener('load', revealCourses);



const track = document.querySelector(".carousel-track");
const cards = Array.from(track.children);
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots-container");

let currentIndex = 0;
const total = cards.length;

// Create dots
for(let i=0; i<total; i++){
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if(i===0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
}
const dots = Array.from(dotsContainer.children);

function updateCarousel() {
  const cardWidth = cards[0].getBoundingClientRect().width + 20; // card width + margin
  track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
  
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

// Next / Prev Buttons
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % total;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + total) % total;
  updateCarousel();
});

// Dots Click
dots.forEach((dot,index) => {
  dot.addEventListener("click", ()=> {
    currentIndex = index;
    updateCarousel();
  });
});

// Autoplay every 4 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % total;
  updateCarousel();
}, 4000);

// Optional: Swipe support on mobile
let startX = 0;
track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
track.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if(startX - endX > 50) { nextBtn.click(); } // swipe left
  else if(endX - startX > 50) { prevBtn.click(); } 
  const cards = document.querySelectorAll(".testimonial-card");

function showCards() {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50) {
      card.classList.add("visible");
    }
  });
}// swipe right
});



window.addEventListener("scroll", showCards);
window.addEventListener("load", showCards);


document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const cards = Array.from(track.children);
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots-container");

  let currentIndex = 0;
  const total = cards.length;

  // Make cards visible with fade-in
  cards.forEach(card => card.classList.add("visible"));

  // Create dots
  for(let i=0;i<total;i++){
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if(i===0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  }
  const dots = Array.from(dotsContainer.children);

  function updateCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width + 40; // card + margin
    track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  // Next / Prev Buttons
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
  });
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCarousel();
  });

  // Dots Click
  dots.forEach((dot,index) => {
    dot.addEventListener("click", ()=>{
      currentIndex=index;
      updateCarousel();
    });
  });

  // Autoplay
  setInterval(()=> {
    currentIndex = (currentIndex +1) % total;
    updateCarousel();
  },4000);

  // Swipe support
  let startX=0;
  track.addEventListener("touchstart", e => startX=e.touches[0].clientX);
  track.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if(startX - endX > 50) nextBtn.click();
    else if(endX - startX > 50) prevBtn.click();
  });
});



    document.getElementById("login-btn").addEventListener("click", function() {
      alert("Login successful! Redirecting to practice papers...");
      window.location.href = "practice_papers.html";
    });



// Using EmailJS to send messages
// Include EmailJS script in HTML head:
// <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
// <script>emailjs.init("YOUR_USER_ID");</script>


(function() {
    emailjs.init("dk8BR0xU-vURI1XF9"); // Replace with your EmailJS Public Key
  })();

  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const message = document.getElementById("form-message");

    emailjs.sendForm("service_z7wxwtw", "template_02ef9rf", this)
      .then(() => {
        message.textContent = "✅ Message sent successfully!";
        message.style.color = "#00ff99";
        this.reset();
      })
      .catch((error) => {
        message.textContent = "❌ Failed to send. Try again.";
        message.style.color = "#ff4d4d";
        console.error("EmailJS Error:", error);
      });
  });
