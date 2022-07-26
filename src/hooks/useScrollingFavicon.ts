import { useState } from "react";
import { timer } from "../components/timer";

export function useScrollingFavicon(
  word: string = "",
  speed: number = 100,
  color: string = "white",
  backgroundColor: string = "black",
  fontFamily: string = "arial"
) {
  const [counter, setCounter] = useState(0);
  //gets favicon
  const favicon = document.getElementById("favicon") as HTMLAnchorElement;
  favicon.href = "";
  //creates main canvas context object with given word on it.
  const banner: HTMLCanvasElement | null = document.createElement("canvas");
  banner.id = "banner";
  banner.width = word.length * 16;
  banner.height = 16;
  const canvas3 = banner.getContext("2d");
  if (!canvas3) {
    throw new Error();
  }

  canvas3.font = `16px ${fontFamily}`;
  canvas3.fillStyle = color;
  canvas3.textAlign = "left";
  canvas3.fillText(word, 0, canvas3.canvas.height - 1);
  canvas3.canvas.width = canvas3.measureText(word).width;
  canvas3.fillStyle = backgroundColor;

  canvas3.fillRect(0, 0, canvas3.canvas.width, canvas3.canvas.height);
  // canvas3.canvas.style.width = canvas3.canvas.width + "px";
  canvas3.font = `16px ${fontFamily}`;
  canvas3.fillStyle = color;
  canvas3.textAlign = "left";
  canvas3.fillText(word, 0, canvas3.canvas.height - 1);
  //adds 16px of blank space padding to beginning of main canvas object with text so it appears
  //scrolling text comes out of the void and restarts
  const withPadding: HTMLCanvasElement | null =
    document.createElement("canvas");
  withPadding.width = canvas3.canvas.width + 16;
  withPadding.height = 16;
  const paddedContext = withPadding.getContext("2d");
  if (!paddedContext) {
    return;
  }
  paddedContext.drawImage(canvas3.canvas, 16, 0);

  //returns a 16x16 clipped image from main text image.
  const clipCanvas = (
    xOffset: number,
    canvasToClip: CanvasRenderingContext2D
  ) => {
    const newCanvas = document.createElement("canvas");
    const h = 16;
    const w = 16;
    newCanvas.width = w;
    newCanvas.height = h;
    const newContext = newCanvas.getContext("2d");
    newContext!.fillStyle = backgroundColor;
    newContext!.fillRect(
      0,
      0,
      newContext!.canvas.width,
      newContext!.canvas.height
    );
    newContext!.drawImage(canvasToClip.canvas, xOffset, 0, w, h, 0, 0, w, h);

    const newImage = newContext!.canvas.toDataURL("image/jpeg", 1.0);
    return newImage;
  };
  //main function used as callback for timer, offset advances clip by 1 pixel to simulate scrolling movement.
  const replaceFaviconCb = () => {
    console.log(canvas3.canvas.width, counter);

    const newImage = clipCanvas(counter, paddedContext);
    favicon.href = newImage;
    const added = counter + 1;
    setCounter(added);

    if (paddedContext.canvas.width < counter && counter > 10) {
      setCounter(0);
    }
  };

  timer.start(replaceFaviconCb, speed);
}
