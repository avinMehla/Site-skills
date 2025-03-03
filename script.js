document.getElementById("signin-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Dummy email and password
    const dummyEmail = "teamElite@gmail.com";
    const dummyPassword = "teamElite007";

    // Get user input values
    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    // Validate user input
    if (email === dummyEmail && password === dummyPassword) {
        alert("Login successful! Redirecting...");
        window.location.href = "home.html"; // Redirect to the home page
    } else {
        alert("Invalid email or password. Please try again.");
    }
});
