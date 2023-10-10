import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startButton: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const INTERVAL_TIME = 1000;
const DEFAULT_VALUES = {
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
};

let intervalId = null;
let selectedDate = null;

const enableButton = () => refs.startButton.removeAttribute('disabled');
const disableButton = () => refs.startButton.setAttribute('disabled', true);

disableButton();

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = ({ days, hours, minutes, seconds }) => {
  return {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
};

const setMarkup = ({ days, hours, minutes, seconds }) => {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();

    if (selectedDate < currentDate) {
      disableButton();

      Notiflix.Notify.failure('Please choose a date in the future');

      return;
    }

    enableButton();
  },
};

flatpickr('#datetime-picker', options);

const intervalHandler = () => {
  const test = selectedDate;

  disableButton();

  if (intervalId) {
    return;
  }

  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const differenceInTime = selectedDate - currentDate;
    const timeLeft = convertMs(differenceInTime);
    const formattedTime = addLeadingZero(timeLeft);

    if (differenceInTime <= 0 || test !== selectedDate) {
      clearInterval(intervalId);

      setMarkup(DEFAULT_VALUES);

      enableButton();

      intervalId = null;

      return;
    }

    setMarkup(formattedTime);
  }, INTERVAL_TIME);
};

refs.startButton.addEventListener('click', intervalHandler);
