// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Parallax Effect
window.addEventListener("scroll", function () {
    let scrolled = window.scrollY;
    document.querySelector(".hero").style.backgroundPositionY = -(scrolled * 0.5) + "px";
});

// Dark/Light Mode Toggle
const toggleThemeBtn = document.getElementById("toggle-theme");
toggleThemeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
});

// Redirect to Sign Up Page (Dummy Function)
function goToSignUp() {
    window.location.href = "signup.html"; // Replace with actual URL
}
