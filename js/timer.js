const refs = {
  timerFace: document.querySelector('#timer-1'),
  days: document.querySelector('.value[data-value="days"]'),
  hours: document.querySelector('.value[data-value="hours"]'),
  mins: document.querySelector('.value[data-value="mins"]'),
  secs: document.querySelector('.value[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
  }

  timer() {
    const nowDate = Date.now();
    const time = this.targetDate - nowDate;
    const currentTime = this.getTimeComponents(time);
    this.updateTimerface(currentTime);
    this.timerFinish(time);
  }

  startNewTimer() {
    this.timer();

    this.intervalID = setInterval(() => {
      this.timer();
    }, 1000);
  }

  updateTimerface({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}:`;
    refs.hours.textContent = `${hours}:`;
    refs.mins.textContent = `${mins}:`;
    refs.secs.textContent = `${secs}`;
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  timerFinish(time) {
    if (time < 0) {
      clearInterval(this.intervalId);
      refs.timerFace.textContent = 'Ура лето!!!';
    }
  }
}
const newTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('June 01, 2021'),
});

newTimer.startNewTimer();
