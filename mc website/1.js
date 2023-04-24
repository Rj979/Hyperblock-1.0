// Wait for the page to fully load before executing any JavaScript code
window.addEventListener('load', function() {

  // Add an event listener to the "Contact Us" button
  var contactButton = document.getElementById('contact-button');
  contactButton.addEventListener('click', function(event) {
    event.preventDefault();
    alert('Thank you for contacting us! We will respond as soon as possible.');
  });

  // Add an event listener to the "Subscribe" button
  var subscribeButton = document.getElementById('subscribe-button');
  subscribeButton.addEventListener('click', function(event) {
    event.preventDefault();
    var emailInput = document.getElementById('email-input').value;
    alert('Thank you for subscribing with the email address: ' + emailInput);
  });

});
