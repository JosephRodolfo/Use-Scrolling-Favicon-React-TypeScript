interface Timer {
    running: boolean;
    iv: number;
    timeout: any;
    cb: any;
    start: (cb?: Function | boolean, iv?: number | null) => void;
    execute: (e: Timer) => void;
    stop: Function;
    set_interval: (iv: number) => void;
  }

export const timer: Timer = {
    running: false,
    iv: 500,
    timeout: false,
    cb: function () {},
    start: function (cb, iv) {
      let elm = this;
      clearInterval(this.timeout);
      this.running = true;
      if (cb) this.cb = cb;
      if (iv) this.iv = iv;
      this.timeout = setTimeout(function () {
        elm.execute(elm);
      }, this.iv);
    },
    execute: function (e) {
      if (!e.running) return false;
      e.cb();
      e.start();
    },
    stop: function () {
      this.running = false;
    },
    set_interval: function (iv) {
      clearInterval(this.timeout);
      this.start(false, iv);
    },
  };