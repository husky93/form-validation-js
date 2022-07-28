const validateForm = (() => {
  const form = document.querySelector('form');
  const email = document.getElementById('mail');
  const zip = document.getElementById('zip');
  const pass = document.getElementById('pass');
  const confPass = document.getElementById('confpass');
  const zipError = document.querySelector('.error--zip');
  const emailError = document.querySelector('.error--email');
  const passError = document.querySelector('.error--pass');
  const confPassError = document.querySelector('.error--confpass');
  let passwordsMatching = false;

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
      case pass.validity.patternMismatch:
        passError.textContent =
          'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
        break;
      case !passwordsMatching:
        confPassError.textContent = 'Passwords are not matching';
        break;
      case email.validity.valueMissing:
        emailError.textContent = 'You need to enter e-mail address.';
        break;
      case zip.validity.valueMissing:
        zipError.textContent = 'You need to enter a zip code.';
        break;
      case pass.validity.valueMissing:
        passError.textContent = 'You need to enter a password.';
        break;
      case confPass.validity.valueMissing:
        confPassError.textContent = 'You need to confirm the password.';
        break;
      default:
        break;
    }
  };

  const isValueMatching = (input, inputTwo) => {
    if (input.value === inputTwo.value) return true;
    return false;
  };

  const checkPasswordMatch = () => {
    const inputs = [pass, confPass];
    inputs.forEach((input) =>
      input.addEventListener('input', () => {
        passwordsMatching = isValueMatching(pass, confPass);
        if (!passwordsMatching) {
          confPass.setCustomValidity('Passwords are not matching');
        } else {
          confPass.setCustomValidity('');
          confPassError.textContent = '';
        }
      })
    );
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
      if (
        !email.validity.valid ||
        !zip.validity.valid ||
        !pass.validity.valid ||
        !confPass.validity.valid ||
        !passwordsMatching
      ) {
        showError();
        e.preventDefault();
      }
    });
  };

  const initializeValidation = () => {
    validateInput(email, emailError);
    validateInput(zip, zipError);
    validateInput(pass, passError);
    validateInput(confPass, confPassError);
    checkPasswordMatch();
    addSubmitHandler();
  };

  return { initializeValidation };
})();

export default validateForm;
