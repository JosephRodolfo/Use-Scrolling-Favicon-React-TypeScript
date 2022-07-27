//creates canvas element and sets it to correct length and height, takes word to determine lenght
//and returns new canvas object
export const createBannerFavicon = (word: string) => {
  const banner: HTMLCanvasElement | null = document.createElement("canvas");
  banner.id = "banner";
  banner.width = word.length * 16;
  banner.height = 16;
  return banner;
};
//puts text on canvasrenderingcontext object
export const fillFont = (
  canvasObj: CanvasRenderingContext2D,
  font: string,
  color: string
) => {
  canvasObj.font = `16px ${font}`;
  canvasObj.fillStyle = color;
  canvasObj.textAlign = "left";
};
//returns a 16x16 clipped image from main text image.

export const clipCanvas = (
  xOffset: number,
  canvasToClip: CanvasRenderingContext2D,
  backgroundColor: string
) => {
  const newCanvas: HTMLCanvasElement | null = document.createElement("canvas");
  const h = 16;
  const w = 16;
  newCanvas.width = w;
  newCanvas.height = h;
  const newContext = newCanvas.getContext("2d");
  if (!newContext) {
    throw new Error();
  }
  newContext.fillStyle = backgroundColor;
  newContext.fillRect(0, 0, newContext.canvas.width, newContext.canvas.height);
  newContext.drawImage(canvasToClip.canvas, xOffset, 0, w, h, 0, 0, w, h);

  const newImage = newContext.canvas.toDataURL("image/jpeg", 1.0);
  return newImage;
};
//adds 16 pixels to front of canvas image, to simulate text scrolling in from the void.
// takes original canvasrenderingcontext and returns new padded one.
export const padBannerImage = (mainCanvas: CanvasRenderingContext2D) => {
  const withPadding: HTMLCanvasElement | null =
    document.createElement("canvas");
  withPadding.width = mainCanvas.canvas.width + 16;
  withPadding.height = 16;
  const paddedContext = withPadding.getContext("2d");
  if (!paddedContext) {
    throw new Error();
  }
  paddedContext.drawImage(mainCanvas.canvas, 16, 0);
  return paddedContext;
};

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
