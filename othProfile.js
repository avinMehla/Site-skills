// Variables
const sendInvitationBtn = document.getElementById('send-invitation-btn');
const goBackBtn = document.getElementById('go-back-btn');
const homeBtn = document.getElementById('home-btn');
const sendMessageBtn = document.getElementById('send-message-btn');
const invitationStatus = document.getElementById('invitation-status');
const invitationCountElem = document.getElementById('profile-invites').querySelector('.invitation-count');
let invitationCount = parseInt(invitationCountElem.innerText);

// Send Invitation Function
sendInvitationBtn.addEventListener('click', function () {
  if (invitationCount > 0) {
    invitationCount--;
    invitationCountElem.innerText = invitationCount;
    invitationStatus.innerText = 'Invitation Sent! Awaiting Acceptance...';
    invitationStatus.style.color = '#7fa1ff';

    // Simulate email acceptance after 3 seconds
    setTimeout(() => {
      invitationStatus.innerText = 'Invitation Accepted! Email: johndoe@example.com';
      invitationStatus.style.color = '#7fff7f';
    }, 3000);
  } else {
    invitationStatus.innerText = 'No invitations remaining. Please wait for the next opportunity.';
    invitationStatus.style.color = '#ff7f7f';
  }
});

// Go Back Function
goBackBtn.addEventListener('click', function () {
  window.history.back();  // Navigate to the previous page
});

// Home Button Function
homeBtn.addEventListener('click', function () {
  window.location.href = 'index.html';  // Navigate to the home page
});

// Send Message Button Function
sendMessageBtn.addEventListener('click', function () {
  alert('Message Sent!');  // Simulate sending a message
});
