// ✅ Preloader
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

// ✅ Scroll Progress
window.onscroll = () => {
  const winScroll = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("scroll-progress").style.width = scrolled + "%";
};

// ✅ Course Filter
function filterCourses(category) {
  const cards = document.querySelectorAll(".course-card");
  cards.forEach(card => {
    if (category === "all" || card.classList.contains(category)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// ✅ Review Slider
const reviews = [
  "এই কোর্সটি আমার ক্যারিয়ারে অনেক সাহায্য করেছে!",
  "ইন্সট্রাক্টর খুবই ভালোভাবে বোঝান!",
  "লাইভ ক্লাস আর সাপোর্ট অসাধারণ ছিল।",
  "আমি এখন নিজেই ওয়েবসাইট বানাতে পারি!"
];
let reviewIndex = 0;
setInterval(() => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  document.getElementById("review-text").textContent = reviews[reviewIndex];
}, 3000);

// ✅ Counter
const counters = document.querySelectorAll(".counter");
let started = false;

window.addEventListener("scroll", () => {
  const sectionTop = document.querySelector(".counters").offsetTop - 400;
  if (!started && window.scrollY > sectionTop) {
    counters.forEach(counter => {
      let target = +counter.getAttribute("data-target");
      let count = 0;
      const increment = Math.ceil(target / 50);
      const update = () => {
        count += increment;
        counter.textContent = count + "+";
        if (count < target) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + "+";
        }
      };
      update();
    });
    started = true;
  }
});

// ✅ Modal Popup
const enrollBtn = document.getElementById("enrollBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

enrollBtn.onclick = () => modal.style.display = "flex";
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// ✅ Contact Form → Google Sheet Integration
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"; // ✅ Change this
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(contactForm)
  })
    .then(() => {
      alert("✅ ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে।");
      contactForm.reset();
    })
    .catch(error => {
      alert("❌ কিছু সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
      console.error(error);
    });
});

// ✅ Countdown Timer
const endDate = new Date("2025-08-10 23:59:59").getTime();
const timer = setInterval(() => {
  const now = new Date().getTime();
  const gap = endDate - now;

  const d = Math.floor(gap / (1000 * 60 * 60 * 24));
  const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((gap % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = d;
  document.getElementById("hours").textContent = h;
  document.getElementById("minutes").textContent = m;
  document.getElementById("seconds").textContent = s;

  if (gap < 0) {
    clearInterval(timer);
    document.getElementById("timer").textContent = "সময় শেষ!";
  }
}, 1000);

// ✅ Lazy Load Images
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img.lazy");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));
});

// ✅ Lightbox
const lightboxImages = document.querySelectorAll(".lightbox");
lightboxImages.forEach(img => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;
    `;
    const bigImg = document.createElement("img");
    bigImg.src = img.src;
    bigImg.style.maxWidth = "90%";
    bigImg.style.maxHeight = "90%";
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
    overlay.onclick = () => overlay.remove();
  });
});