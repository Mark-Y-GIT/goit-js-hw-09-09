const form = document.querySelector('.form');
let formData = null;

function convertToNumber({ delay, step, amount }) {
  formData = {
    delay: Number(delay),
    step: Number(step),
    amount: Number(amount),
  };
}

function getFormData(e) {
  let data = {};

  new FormData(e.currentTarget).forEach(
    (value, name) => (data = { ...data, [name]: value })
  );

  return data;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const data = getFormData(e);

  convertToNumber(data);
  console.log(formData);
});
