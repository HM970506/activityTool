import { fabric } from "fabric";
import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    const canvas2 = new fabric.Canvas("canvas3", {
      width: 1000,
      height: 700,
      backgroundColor: "grey",
    });

    canvas2.add(textbox);

    canvas2.renderAll();
  }, []);

  const textbox = new fabric.Textbox("This is a Textbox object", {
    left: 0,
    top: 0,
    fill: "#880E4F",
    strokeWidth: 2,
    stroke: "#D81B60",
    selectable: true,
  });

  console.log(textbox.__eventListeners);

  return (
    <>
      <canvas id="canvas3"></canvas>
    </>
  );
}
