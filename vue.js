var vm = new Vue({
  el: "#myapp",
  data: {
    time: '00:00.000',
    activeButtons: { start: true, stop: false, reset: false },
    running: false,
    startTime: null,
    timerId: null,
    elapsedTime: 0,
    timeToAdd: 0
  },
  methods: {
    startTimer: function() {
      if (this.running) {return}
      this.running = true;
      this.updateButtonStat(false, true, false);
      this.startTime = Date.now();
      this.countUp();
    },
    stopTimer: function() {
      if (!this.running) {return}
      this.running = false;
      this.updateButtonStat(true, false, true);
      this.timeToAdd += Date.now() - this.startTime;
      clearTimeout(this.timerId);
    },
    resetTimer: function() {
      if (this.running) {return}
      this.updateButtonStat(true, false, false);
      this.elapsedTime = 0;
      this.timeToAdd = 0;
      this.updateTimerText();
    },
    countUp: function() {
      this.timerId = setTimeout(function() {
        this.elapsedTime = Date.now() - this.startTime + this.timeToAdd;
        this.updateTimerText();
        this.countUp();
      }.bind(this), 10);
    },
    updateTimerText: function() {
      var m = Math.floor(this.elapsedTime / 60000);
      var s = Math.floor(this.elapsedTime % 60000 / 1000);
      var ms = this.elapsedTime % 1000;

      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      ms = ('00' + ms).slice(-3);

      this.time = m + ':' + s + '.' + ms;
    },
    updateButtonStat: function(startButtonStatus, stopButtonStatus, resetButtonStatus) {
      this.activeButtons.start = startButtonStatus;
      this.activeButtons.stop = stopButtonStatus;
      this.activeButtons.reset = resetButtonStatus;
    }
  }
})
