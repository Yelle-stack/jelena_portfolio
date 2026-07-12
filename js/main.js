// DOM Elements

const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const header = document.querySelector("header");
const form = document.querySelector("form");
const year = document.getElementById("year");

// Mobile Menu

if (menu && navbar) {
    menu.addEventListener("click", () => {
        menu.classList.toggle("bx-x");
        navbar.classList.toggle("active");
    });

    // Close mobile menu when a navigation link is clicked
    document.querySelectorAll(".navbar a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("bx-x");
            navbar.classList.remove("active");
        });
    });
}

// Header Shadow + Close Menu

window.addEventListener("scroll", () => {

    if (menu && navbar) {
        menu.classList.remove("bx-x");
        navbar.classList.remove("active");
    }

    if (header) {
        header.classList.toggle("shadow", window.scrollY > 0);
    }

});

// Current Year

if (year) {
    year.textContent = new Date().getFullYear();
}

// ScrollReveal Animations

const sr = ScrollReveal({
    distance: "60px",
    duration: 2500,
    delay: 300,
    reset: false
});

sr.reveal(".home-text", {
    origin: "left"
});

sr.reveal(".home-img", {
    delay: 400,
    origin: "right"
});

sr.reveal(
    ".about-title, .about-text, .heading, .box, .tech-box, input, textarea, .social a",
    {
        origin: "bottom",
        interval: 100
    }
);

// Anti-bot Protection

const startTime = Date.now();

if (form) {

    form.addEventListener("submit", (e) => {

        const elapsedTime = Date.now() - startTime;

        if (elapsedTime < 5000) {
            e.preventDefault();
            alert("Please wait a few seconds before submitting the form.");
        }

    });

}