const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;
const INTERVAL_TIME = 1000;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

const startBtnHandler = () => {
  startBtn.setAttribute('disabled', true);

  if (intervalId) {
    return;
  }

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_TIME);
};

const stoptBtnHandler = () => {
  clearInterval(intervalId);

  intervalId = null;

  startBtn.removeAttribute('disabled');
};

startBtn.addEventListener('click', startBtnHandler);
stopBtn.addEventListener('click', stoptBtnHandler);
