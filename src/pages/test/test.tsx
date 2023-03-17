import { Background, StageArea } from "./style";
import { fabric } from "fabric";
import { useEffect } from "react";

export default function Test() {
  var canvas = new fabric.Canvas("c", {
    left: 0,
    top: 0,
    height: window.innerWidth,
    width: window.innerWidth,
    preserveObjectStacking: true,
  });
  console.log(canvas);
  var itext = new fabric.IText("This is a IText object", {
    left: 100,
    top: 150,
    fill: "#D81B60",
    strokeWidth: 2,
    stroke: "#880E4F",
  });

  var textbox = new fabric.Textbox("This is a Textbox object", {
    left: 20,
    top: 50,
    fill: "#880E4F",
    strokeWidth: 2,
    stroke: "#D81B60",
  });
  useEffect(() => {
    canvas.add(itext, textbox);
    canvas.renderAll();
  }, []);
  return <canvas id="c" />;
}
