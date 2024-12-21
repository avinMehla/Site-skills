

JavaScript (script.js)

// Attach an event listener to the form submission
document.getElementById('signupForm').addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the password and confirm password fields
  const password = document.getElementById('password').value;

    // Display a success message if the passwords match
    alert('Sign-up successful!');
    
    // Additional logic can be added here, e.g., sending data to a server via AJAX
    console.log('Form submitted successfully');
  }
);
function goToHome(){

   window.location.href = "home.html"; 
}
