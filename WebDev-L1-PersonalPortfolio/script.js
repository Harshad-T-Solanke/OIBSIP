const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

});

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


const sections = document.querySelectorAll("section[id]");


function updateActiveNav() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navItems.forEach((item) => {
                item.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

}


window.addEventListener("scroll", updateActiveNav);

const backToTop = document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");


function showError(input, message) {

    const formGroup = input.closest(".form-group");

    const errorMessage =
        formGroup.querySelector(".error-message");

    errorMessage.textContent = message;

    input.style.borderColor = "#dc2626";

}


function clearError(input) {

    const formGroup = input.closest(".form-group");

    const errorMessage =
        formGroup.querySelector(".error-message");

    errorMessage.textContent = "";

    input.style.borderColor = "";

}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    let isValid = true;

    if (name.value.trim() === "") {

        showError(name, "Please enter your name.");

        isValid = false;

    } else {

        clearError(name);

    }

    if (email.value.trim() === "") {

        showError(email, "Please enter your email.");

        isValid = false;

    } else if (!validateEmail(email.value.trim())) {

        showError(email, "Please enter a valid email.");

        isValid = false;

    } else {

        clearError(email);

    }
    if (subject.value.trim() === "") {

        showError(subject, "Please enter a subject.");

        isValid = false;

    } else {

        clearError(subject);

    }

    if (message.value.trim() === "") {

        showError(message, "Please enter your message.");

        isValid = false;

    } else if (message.value.trim().length < 10) {

        showError(
            message,
            "Message should contain at least 10 characters."
        );

        isValid = false;

    } else {

        clearError(message);

    }

    if (isValid) {

        formStatus.textContent =
            "Message validated successfully. This demo form does not send emails yet.";

        formStatus.style.color = "#15803d";

        contactForm.reset();

    } else {

        formStatus.textContent =
            "Please correct the highlighted fields.";

        formStatus.style.color = "#dc2626";

    }

});