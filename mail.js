const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent default form submission behavior

  // get form data
  const formData = new FormData(contactForm);

  // send form data to server via AJAX
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.example.com/send-email');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // handle success
        alert('Thank you for your message!');
      } else {
        // handle error
        alert('Oops! Something went wrong.');
      }
    }
  };
  xhr.send(formData);
});
