// DOM elements
const sendRequestButton = document.getElementById('send-request');
const sendMessageButton = document.getElementById('send-message');
const requestStatusContainer = document.getElementById('request-status');
const noRequestsMessage = document.getElementById('no-requests-message');
const requestCountElement = document.getElementById('request-count');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Initial state
let requestCount = 5;
let requestStatus = '';

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Tab switching
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// Send request functionality
sendRequestButton.addEventListener('click', function() {
    if (requestCount > 0) {
        requestCount--;
        requestCountElement.textContent = requestCount;
        requestStatus = 'pending';
        
        // Update UI
        updateRequestStatusUI();
        
        // Simulate request acceptance after 3 seconds
        setTimeout(function() {
            requestStatus = 'accepted';
            updateRequestStatusUI();
        }, 3000);
    } else {
        noRequestsMessage.style.display = 'block';
    }
});

// Send message functionality
sendMessageButton.addEventListener('click', function() {
    alert('Message Sent!');
});

// Update request status UI
function updateRequestStatusUI() {
    if (requestStatus === 'pending') {
        requestStatusContainer.innerHTML = `
            <div class="pending-message">
                <p>Request Sent! Awaiting Acceptance...</p>
            </div>
        `;
    } else if (requestStatus === 'accepted') {
        requestStatusContainer.innerHTML = `
            <div class="success-message">
                <p>Request Accepted! Email: alex@example.com</p>
            </div>
        `;
    } else {
        requestStatusContainer.innerHTML = `
            <p class="empty-message">No pending requests</p>
        `;
    }
}
