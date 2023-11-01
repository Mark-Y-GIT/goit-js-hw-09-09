import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
let delay = null;
let step = null;
let amount = null;
let promiseNumber = 1;

function convertToNumber(data) {
  const { delay: delayString, step: stepString, amount: amountString } = data;

  delay = Number(delayString);
  step = Number(stepString);
  amount = Number(amountString);
}

function getFormData(e) {
  let data = {};

  new FormData(e.currentTarget).forEach(
    (value, name) => (data = { ...data, [name]: value })
  );

  return data;
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  promiseNumber += 1;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function runPromises() {
  for (let i = 0; i < amount; i += 1) {
    if (promiseNumber !== 1) {
      delay = delay + step;
    }

    createPromise(promiseNumber, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const data = getFormData(e);

  convertToNumber(data);

  runPromises();

  promiseNumber = 1;
});
