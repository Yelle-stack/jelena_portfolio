const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const header = document.querySelector("header");
const form = document.querySelector(".contact-form");
const year = document.getElementById("year");
const themeToggle = document.querySelector("#theme-toggle");

// DARK / LIGHT MODE

if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i");

    function updateTheme(isDark) {
        document.body.classList.toggle("dark-mode", isDark);

        if (themeIcon) {
            themeIcon.classList.remove("bx-sun", "bx-moon");
            themeIcon.classList.add(isDark ? "bx-sun" : "bx-moon");
        }

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        try {
            localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch (error) {
            // Theme still works if local storage is unavailable.
        }
    }

    // Restore saved theme; default to dark mode.
    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("theme");
    } catch (error) {
        // Use the default theme if local storage is unavailable.
    }

    updateTheme(savedTheme !== "light");

    // Works on desktop and mobile.
    themeToggle.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-mode");
        updateTheme(isDark);
    });
}

// MOBILE MENU

if (menu && navbar) {
    menu.addEventListener("click", () => {
        menu.classList.toggle("bx-x");
        navbar.classList.toggle("active");
    });

    // Close menu after clicking a navigation link.
    document.querySelectorAll(".navbar a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("bx-x");
            navbar.classList.remove("active");
        });
    });
}

// HEADER SHADOW

window.addEventListener("scroll", () => {
    if (menu && navbar) {
        menu.classList.remove("bx-x");
        navbar.classList.remove("active");
    }

    if (header) {
        header.classList.toggle("shadow", window.scrollY > 0);
    }
});

// CURRENT YEAR

if (year) {
    year.textContent = new Date().getFullYear();
}

// SCROLL REVEAL ANIMATIONS

if (typeof ScrollReveal === "function") {
    const sr = ScrollReveal({
        distance: "40px",
        duration: 900,
        delay: 100,
        reset: false,
        mobile: true
    });

    sr.reveal(".home-text", {
        origin: "left"
    });

    sr.reveal(".home-img", {
        origin: "right",
        delay: 200
    });

    sr.reveal(
        ".about-title, .about-text, .heading, .tech-box, .stack-category, .expertise-box, .portfolio-box, .contact-form, .contact-text, .social a",
        {
            origin: "bottom",
            interval: 80
        }
    );
}

// ANTI-BOT PROTECTION

const startTime = Date.now();

if (form) {
    form.addEventListener("submit", (event) => {
        const elapsedTime = Date.now() - startTime;

        if (elapsedTime < 5000) {
            event.preventDefault();
            alert("Please wait a few seconds before submitting the form.");
        }
    });
}