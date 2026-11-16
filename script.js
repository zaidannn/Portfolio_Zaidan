
// Enable animation styles
document.documentElement.classList.add("js");

// Create scroll progress bar
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.prepend(progressBar);

// Update progress while scrolling
function updateProgress() {
    const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress, {
    passive: true
});

updateProgress();

// Elements to animate
const animatedElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-card, " +
    ".education, " +
    ".experience-item, " +
    ".project-card, " +
    ".additional-project, " +
    ".skill-group, " +
    ".contact-section .container, " +
    ".statistics"
);

// Add animation classes
animatedElements.forEach((element, index) => {
    element.classList.add("scroll-reveal");

    // Stagger cards in groups
    const cardIndex = index % 4;

    if (cardIndex !== 0) {
        element.classList.add(`delay-${cardIndex}`);
    }
});

// Observe elements when they enter viewport
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
        rootMargin: "0px 0px -40px 0px"
    }
);

animatedElements.forEach(element => {
    observer.observe(element);
});
