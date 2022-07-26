import { useState } from "react";
import { timer } from "../components/timer";
import { clipCanvas, fillFont, padBannerImage } from "./useScrollingFaviconHelpers";

type useScrollingFaviconParamObject = {
  word: string;
  speed: number;
  color: string;
  backgroundColor: string;
  fontFamily: string;
};
export function useScrollingFavicon({
  word = "",
  speed = 50,
  color = "white",
  backgroundColor = "black",
  fontFamily = "arial",
}: useScrollingFaviconParamObject) {
  const [counter, setCounter] = useState(0);
  //gets favicon
  const favicon = document.getElementById("favicon") as HTMLAnchorElement;
  favicon.href = "";
  //creates main canvas context object with given word on it.
  const banner: HTMLCanvasElement | null = document.createElement("canvas");
  banner.id = "banner";
  banner.width = word.length * 16;
  banner.height = 16;

  try {
    const canvas3 = banner.getContext("2d");
    if (!canvas3) {
      throw new Error();
    }

    fillFont(canvas3, fontFamily, color);
    canvas3.fillText(word, 0, canvas3.canvas.height - 1);
    canvas3.canvas.width =
      word.length > 1 ? canvas3.measureText(word).width : 16;
    canvas3.fillStyle = backgroundColor;
    canvas3.fillRect(0, 0, canvas3.canvas.width, canvas3.canvas.height);
    // canvas3.canvas.style.width = canvas3.canvas.width + "px";
    fillFont(canvas3, fontFamily, color);
    canvas3.fillText(word, 0, canvas3.canvas.height - 1);
    const paddedContext = padBannerImage(canvas3);
    //main function used as callback for timer, offset advances clip by 1 pixel to simulate scrolling movement.
    const replaceFaviconCb = () => {
      const newImage = clipCanvas(counter, paddedContext, backgroundColor);
      favicon.href = newImage;
      setCounter(counter + 1);
      if (paddedContext.canvas.width < counter && counter > 10) {
        setCounter(0);
      }
    };

    timer.start(replaceFaviconCb, speed);
  } catch (e) {
    console.error(e);
  }
}
