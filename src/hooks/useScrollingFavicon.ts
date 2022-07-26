import { useState, useEffect, ImgHTMLAttributes } from "react";

export function useScrollingFavicon(
  word: string,
  speed: number,
  color: string,
  backgroundColor: string,
  fontFamily: string
) {
  const favicon = document.getElementById("favicon") as HTMLAnchorElement;
  favicon.href = "newicon.ico";

  const banner: HTMLCanvasElement | null = document.createElement("canvas");
  banner.id = "banner";
  banner.width = word.length * 16;
  banner.height = 16;
  const canvas3 = banner.getContext("2d");
  try {
    if (!canvas3) {
      throw new Error();
    }
    const fontColor = "white";
    const textVariable = "word-test-today-to-see";
    canvas3.font = "16px arial";
    canvas3.fillStyle = fontColor;
    canvas3.textAlign = "left";
    canvas3.fillText(textVariable, 0, canvas3.canvas.height - 1);
    canvas3.canvas.width = canvas3!.measureText(textVariable).width;
    canvas3.canvas.style.width = canvas3.canvas.width + "px";
    canvas3.font = "16px arial";
    canvas3.fillStyle = fontColor;
    canvas3.textAlign = "left";
    canvas3.fillText(textVariable, 0, canvas3.canvas.height - 1);
    const img = canvas3.canvas.toDataURL("image/jpeg", 1.0);
    favicon.href = img;
  } catch (e) {
    console.log("Error", e);
  }
}
