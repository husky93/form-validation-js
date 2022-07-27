const validateForm = (() => {
  const form = document.querySelector('form');
  const email = document.getElementById('mail');
  const emailError = document.querySelector('.error--email');

  const showError = () => {
    switch (true) {
      case email.validity.valueMissing:
        emailError.textContent = 'You need to enter e-mail address.';
        break;
      case email.validity.typeMismatch:
        emailError.textContent = 'Entered value needs to be e-mail address';
        break;
      case email.validity.tooShort:
        emailError.textContent = `Email should be at least ${email.minLength} characters, you entered ${email.value.length}`;
        break;
      default:
        break;
    }
  };

  (() => {
    form.addEventListener('submit', (e) => {
      if (!email.validity.valid) {
        showError();
        e.preventDefault();
      }
    });
  })();

  const validateEmail = () => {
    email.addEventListener('input', () => {
      if (email.validity.valid) {
        emailError.textContent = '';
        emailError.className.toggle('error');
      } else {
        showError();
      }
    });
  };
  return { validateEmail };
})();

export default validateForm;
