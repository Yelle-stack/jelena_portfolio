const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const header = document.querySelector("header");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const year = document.getElementById("year");
const themeToggle = document.querySelector("#theme-toggle");


// Dark / Light Mode

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

        try {
            localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch (error) {
            // localStorage unavailable (private mode): ignore
        }
    }

    // Default theme: dark mode, unless the visitor previously chose light
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem("theme");
    } catch (error) {
        savedTheme = null;
    }

    updateTheme(savedTheme !== "light");

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

    // Close the mobile menu when a navigation link is clicked
    document.querySelectorAll(".navbar a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("bx-x");
            navbar.classList.remove("active");
        });
    });
}


// Header shadow on scroll

window.addEventListener("scroll", () => {
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
        duration: 1500,
        delay: 200,
        reset: false,
        cleanup: true // removes inline styles after reveal, so hover effects keep working
    });

    sr.reveal(".home-text", {
        origin: "left"
    });

    sr.reveal(".home-img", {
        delay: 400,
        origin: "right"
    });

    sr.reveal(
        ".about-title, .about-text, .heading, .box, .portfolio-box, .tech-box, .stack-category, .contact-form form, .social a",
        {
            origin: "bottom",
            interval: 100
        }
    );
}


// Contact form (fetch + anti-bot delay)

const pageLoadTime = Date.now();

function showStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = type; // "success" or "error"
}

if (form && formStatus) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Anti-bot: too fast = probably a bot
        if (Date.now() - pageLoadTime < 5000) {
            showStatus("Please wait a few seconds before sending.", "error");
            return;
        }

        const button = form.querySelector(".send-btn");
        button.disabled = true;
        button.textContent = "Sending...";
        showStatus("", "");

        try {
            const response = await fetch(form.action, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: new FormData(form)
            });
            const data = await response.json();

            if (response.ok && data.success) {
                showStatus("Thank you! Your message has been sent.", "success");
                form.reset();
            } else {
                throw new Error(data.message || "Request failed");
            }
        } catch (error) {
            showStatus("Something went wrong. Please try again or email me directly.", "error");
        } finally {
            button.disabled = false;
            button.textContent = "Send";
        }
    });
}