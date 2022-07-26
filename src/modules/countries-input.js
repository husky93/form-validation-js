import countries from '../assets/countries.json';

const addSelectOptions = () => {
  const select = document.querySelector('.input--country');
  countries.forEach((country) => {
    const option = document.createElement('option');
    option.value = country.code;
    option.innerHTML = country.name;
    select.appendChild(option);
  });
};

export default addSelectOptions;
