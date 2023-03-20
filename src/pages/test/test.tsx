import { fabric } from "fabric";
import { useEffect } from "react";

export default function Test() {
  let canvas2: { add: (arg0: any) => void; renderAll: () => void } | null =
    null;

  useEffect(() => {
    canvas2 = new fabric.Canvas("canvas3", {
      width: 1000,
      height: 700,
      backgroundColor: "grey",
    });
  }, []);

  const textbox = new fabric.Textbox("This is a Textbox object", {
    left: 0,
    top: 0,
    fill: "#880E4F",
    strokeWidth: 2,
    stroke: "#D81B60",
  });

  return (
    <>
      <button
        onClick={() => {
          canvas2?.add(textbox);
          canvas2?.renderAll();
          console.log("추가");
        }}
      >
        테스트
      </button>
      <canvas id="canvas3"></canvas>
    </>
  );
}
