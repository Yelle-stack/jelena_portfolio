
const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const header = document.querySelector("header");
const form = document.querySelector("form");
const year = document.getElementById("year");
const themeToggle = document.querySelector("#theme-toggle");


// Dark / Light Mode

if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i");

    function updateTheme(isDark) {
        // Apply theme
        document.body.classList.toggle("dark-mode", isDark);

        // Update icon
        if (themeIcon) {
            themeIcon.classList.remove("bx-sun", "bx-moon");
            themeIcon.classList.add(isDark ? "bx-sun" : "bx-moon");
        }

        // Update accessibility label
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        // Save theme preference
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    // Default theme: Dark mode
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        updateTheme(false);
    } else {
        updateTheme(true);
    }

    // Toggle theme on click
    themeToggle.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-mode");
        updateTheme(isDark);
    });
}


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


// Header Shadow + Close Mobile Menu

window.addEventListener("scroll", () => {
    // Close mobile menu on scroll
    if (menu && navbar) {
        menu.classList.remove("bx-x");
        navbar.classList.remove("active");
    }

    // Add shadow to header when scrolling
    if (header) {
        header.classList.toggle("shadow", window.scrollY > 0);
    }
});


// Current Year

if (year) {
    year.textContent = new Date().getFullYear();
}


// ScrollReveal Animations

if (typeof ScrollReveal === "function") {
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
        ".about-title, .about-text, .heading, .box, .tech-box, .stack-category, .expertise-box, input, textarea, .social a",
        {
            origin: "bottom",
            interval: 100
        }
    );
}


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