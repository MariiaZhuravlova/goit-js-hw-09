import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from "notiflix";

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysClock: document.querySelector('span[data-days]'),
  hoursClock: document.querySelector('span[data-hours]'),
  minutesClock: document.querySelector('span[data-minutes]'),
  secondsClock: document.querySelector('span[data-seconds]'),
  inputDate: document.querySelector('#datetime-picker'),
}
 
refs.startBtn.disabled = true;
refs.inputDate.disabled = false;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      refs.startBtn.disabled = true;
      refs.inputDate.disabled = false;
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
    refs.inputDate.disabled = false;
    //selectedDates[0].getTime();
    console.log(selectedDates[0]);
  },
};
const flatPickr = flatpickr("#datetime-picker", options);

class Timer {
  constructor({ onTick }) {
    this.isActive = false;
    this.onTick = onTick;
    this.intervalId = null;
  }
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = flatPickr.selectedDates[0].getTime();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;

      if (deltaTime < 0) {
        clearInterval(this.intervalId);
        refs.startBtn.disabled = false;
        refs.inputDate.disabled = false;
                return;
        }
      const time = convertMs(deltaTime);
      this.onTick(time);
      
    }, 1000);
    refs.startBtn.disabled = true;
    refs.inputDate.disabled = true;
  }
}

const timer = new Timer({
  onTick: updateClockFace,
});

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysClock.textContent = `${days}`;
  refs.hoursClock.textContent = `${hours}`;
  refs.minutesClock.textContent = `${minutes}`;
  refs.secondsClock.textContent = `${seconds}`;
}

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}