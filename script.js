const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navMenu.classList.toggle("hidden", !isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navMenu.classList.add("hidden");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

const form = document.getElementById("contact-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const subject = data.get("subject").trim();
  const message = data.get("message").trim();
  const recipient = "daavismm@gmail.com"; // Replace with your real email.
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const status = document.getElementById("form-status");

  if (recipient === "daavismm@gmail.com") {
    status.textContent = "Your email app should open with the message prepared. Please press Send in your email app.";
    status.classList.add("text-amber-300");
    return;
  }

  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = "Your email app should open with the message prepared. Please press Send in your email app.";
});
