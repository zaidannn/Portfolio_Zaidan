
/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Mobile menu toggle
if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        navLinks.classList.toggle("mobile-nav", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-nav", "open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", event => {
        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navLinks.classList.remove("mobile-nav", "open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });

    // Close menu when returning to desktop width
    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) {
            navLinks.classList.remove("mobile-nav", "open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}


/* =========================
   FOOTER YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   SCROLL PROGRESS
========================= */

const progressBar = document.querySelector(".scroll-progress");

function updateProgress() {
    if (!progressBar) return;

    const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = totalHeight > 0
        ? (window.scrollY / totalHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress, {
    passive: true
});

updateProgress();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });
} else {
    // Fallback for older browsers
    revealElements.forEach(element => {
        element.classList.add("show");
    });
}


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const header = document.querySelector(".header");

function updateNavbar() {
    if (!header) return;

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("main section[id]");

const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navigationLinks.forEach(link => {
                        const isActive =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}
