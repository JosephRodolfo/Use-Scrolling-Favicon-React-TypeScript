import { useMemo, useState } from "react";
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
  const favicon = document.getElementById("favicon") as HTMLAnchorElement;
  favicon.href = "";

  let memoizedArray = useMemo(() => {
    //gets favicon, clears favicon if already existing

    //creates starting canvas in correct size then canvascontext object;
    const banner = createBannerFavicon(word);
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

    const createSlideArray = () => {
      const slideArr = [];
      let slideCounter = paddedContext.canvas.width;

      while (paddedContext.canvas.width > 0 && slideCounter) {
        const newImage = clipCanvas(
          slideCounter,
          paddedContext,
          backgroundColor
        );
        slideArr.push(newImage);
        slideCounter--;
      }
      return slideArr.reverse();
    };

    const slideShow = createSlideArray();
    return slideShow;
  }, [backgroundColor, color, fontFamily, word]);

  const playSlideShow = () => {
    const current = memoizedArray[counter];
    favicon.href = current;
    setCounter(counter + 1);
    if (counter === memoizedArray.length) {
      setCounter(0);
    }
  };

  timer.start(playSlideShow, speed);
}
