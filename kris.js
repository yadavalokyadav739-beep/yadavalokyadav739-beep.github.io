"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("secureForm");
    const status = document.getElementById("status");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.name?.value || document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name.length < 2 || message.length < 10) {
            status.textContent = "Invalid input detected.";
            status.style.color = "red";
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            status.textContent = "Email format invalid.";
            status.style.color = "red";
            return;
        }

        // Simulated secure submit
        status.textContent = "Message transmitted securely ✔";
        status.style.color = "lightgreen";

        form.reset();
    });
});