// DOM Elements
const header = document.getElementById("header");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const backToTopBtn = document.getElementById("back-to-top");
const contactBtn = document.getElementById("contact-btn");
const emailCta = document.getElementById("email-cta");
const copyEmailBtn = document.getElementById("copy-email");
const emailText = document.getElementById("email-text");
const contactForm = document.getElementById("contact-form");
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const navLinks = document.querySelectorAll(".nav-link");
const skillBars = document.querySelectorAll(".skill-bar");

// Email address
const email = "ayushsahu.code64@gmail.com";

// Mobile menu toggle
mobileMenuBtn?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("show");
  mobileMenuBtn.innerHTML = isOpen
    ? `<i class="fa-solid fa-xmark"></i>`
    : `<i class="fa-solid fa-bars"></i>`;
});

// Reset icon to bars when any menu item is clicked
document
  .querySelectorAll("#mobile-menu a, #mobile-menu button")
  .forEach((item) => {
    item.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      mobileMenuBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    });
  });

// Close mobile menu when clicking nav links
document.querySelectorAll(".mobile-menu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 100;
  header.classList.toggle("scrolled", scrolled);
  backToTopBtn.classList.toggle("show", scrolled);
});

// Active navigation highlighting
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "top";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Back to top
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Email functionality
const openEmailClient = () => {
  window.location.href = `mailto:${email}`;
};

contactBtn?.addEventListener("click", function () {
  window.open(
    "https://docs.google.com/viewer?url=https://raw.githubusercontent.com/iayushsahu/my-resume/main/Ayush_sahu_Cv.pdf",
    "_blank"
  );
});
emailCta?.addEventListener("click", openEmailClient);
emailText?.addEventListener("click", openEmailClient);

// Copy email
copyEmailBtn?.addEventListener("click", async (e) => {
  e.stopPropagation();
  try {
    await navigator.clipboard.writeText(email);
    copyEmailBtn.innerHTML = `<i class="fa-solid fa-clipboard-check"></i>`;
    setTimeout(() => {
      copyEmailBtn.innerHTML = `<i class="fa-solid fa-copy"></i>`;
    }, 2000);
  } catch (err) {
    const textArea = document.createElement("textarea");
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    copyEmailBtn.innerHTML = `<i class="fa-solid fa-clipboard-check"></i>`;
    setTimeout(() => {
      copyEmailBtn.innerHTML = `<i class="fa-solid fa-copy"></i>`;
    }, 2000);
  }
});

// Contact form
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const emailValue = formData.get("email");
  const message = formData.get("message");

  const email = "ayushsahu.code64@gmail.com";

  const subject = `Portfolio Inquiry from ${name}`;
  const body = `Hello Ayush,\n\nI came across your portfolio and I'm impressed!\n\nFrom: ${name}\nEmail: ${emailValue}\n\nMessage:\n${message}\n\nLooking forward to connecting!\n\nBest regards,\n${name}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Open Gmail compose in a new tab
  window.open(gmailUrl, "_blank");
});

// Project filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const isVisible =
        category === "all" || card.dataset.category.includes(category);

      if (isVisible) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0) scale(1)";
        }, 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px) scale(0.95)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Skill bars animation
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width + "%";
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 500);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initialize visible elements
window.addEventListener("load", () => {
  document.querySelectorAll(".fade-in").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
    }
  });
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    mobileMenu?.classList.remove("show");
  }
});

// Performance optimization - Passive event listeners
window.addEventListener(
  "scroll",
  () => {
    requestAnimationFrame(() => {
      // Scroll-dependent operations
    });
  },
  { passive: true }
);

// Add some interactive particles on hero section
function createParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: var(--primary-gold);
                    border-radius: 50%;
                    opacity: 0.6;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${
                      3 + Math.random() * 4
                    }s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                    pointer-events: none;
                `;
    hero.appendChild(particle);
  }
}

// Initialize particles after load
window.addEventListener("load", createParticles);
