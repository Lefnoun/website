"use strict";

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("primary-navigation");

function updateHeader() {
  if (!header) {
    return;
  }

  header.classList.toggle("scrolled", window.scrollY > 20);
}

function closeNavigation() {
  if (!menuToggle || !navigation) {
    return;
  }

  menuToggle.classList.remove("active");
  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function toggleNavigation() {
  if (!menuToggle || !navigation) {
    return;
  }

  const isOpen = navigation.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
}

updateHeader();

window.addEventListener("scroll", updateHeader, {
  passive: true
});

if (menuToggle) {
  menuToggle.addEventListener("click", toggleNavigation);
}

if (navigation) {
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    closeNavigation();
  }
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}