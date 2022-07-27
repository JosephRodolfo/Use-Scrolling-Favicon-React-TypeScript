import { useState } from "react";
import {
  timer,
  clipCanvas,
  createBannerFavicon,
  fillFont,
  padBannerImage,
} from "./useScrollingFaviconHelpers";

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
  //gets favicon, clears favicon if already existing
  const favicon = document.getElementById("favicon") as HTMLAnchorElement;
  favicon.href = "";

  //creates starting canvas in correct size then canvascontext object;
  const banner = createBannerFavicon(word);
  try {
    const ctx = banner.getContext("2d");

    if (!ctx) {
      throw new Error();
    }

    //places text on canvascontext
    fillFont(ctx, fontFamily, color);
    ctx.fillText(word, 0, ctx.canvas.height - 1);

    //sets canvascontext width to text width; if no letters, sets a square shaped canvas
    ctx.canvas.width = word.length > 1 ? ctx.measureText(word).width : 16;

    //colors background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //with new width known and set, prints text on canvas so it is of right length
    fillFont(ctx, fontFamily, color);
    ctx.fillText(word, 0, ctx.canvas.height - 1);

    //adds blank space in front of canvas to simulate text appearing from void
    const paddedContext = padBannerImage(ctx);

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
