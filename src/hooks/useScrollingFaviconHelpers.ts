
//puts text on canvas obj
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
  