const validateForm = (() => {
  const form = document.querySelector('form');
  const email = document.getElementById('mail');
  const zip = document.getElementById('zip');
  const zipError = document.querySelector('.error--zip');
  const emailError = document.querySelector('.error--email');

  const showError = () => {
    switch (true) {
      case email.validity.typeMismatch:
        emailError.textContent = 'Entered value needs to be e-mail address';
        break;
      case email.validity.tooShort:
        emailError.textContent = `Email should be at least ${email.minLength} characters, you entered ${email.value.length}`;
        break;
      case zip.validity.rangeUnderflow:
        zipError.textContent = `Zip code is too short it should have exactly ${zip.minLength} numbers`;
        break;
      case zip.validity.rangeOverflow:
        zipError.textContent = `Zip code is too long it should have exactly ${zip.maxLength} numbers`;
        break;
      case email.validity.valueMissing:
        emailError.textContent = 'You need to enter e-mail address.';
        break;
      case zip.validity.valueMissing:
        zipError.textContent = 'You need to enter a zip code.';
        break;
      default:
        break;
    }
  };

  const validateInput = (input, errorBox) => {
    input.addEventListener('input', () => {
      if (input.validity.valid) {
        const msgBox = errorBox;
        msgBox.textContent = '';
      } else showError();
    });
  };

  const addSubmitHandler = () => {
    form.addEventListener('submit', (e) => {
      if (!email.validity.valid || !zip.validity.valid) {
        showError();
        e.preventDefault();
      }
    });
  };

  const initializeValidation = () => {
    validateInput(email, emailError);
    validateInput(zip, zipError);
    addSubmitHandler();
  };

  return { initializeValidation };
})();

export default validateForm;
