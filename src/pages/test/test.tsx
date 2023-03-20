import { Background, StageArea } from "./style";
import { fabric } from "fabric";
import { useEffect } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

export default function Test() {
  const { editor, onReady } = useFabricJSEditor();

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

  const onAddCircle = () => {
    editor?.addText("inset text");
  };

  useEffect(() => {}, []);

  return (
    <Background>
      <button onClick={onAddCircle}>Add circle</button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </Background>
  );
}
