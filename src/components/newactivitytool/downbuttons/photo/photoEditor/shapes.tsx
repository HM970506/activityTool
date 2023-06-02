import { OptionComponent, PhotoOption1 } from "./style";
import { fabric } from "fabric-with-erasing";
import { ImageType, ReducersType, canvasType } from "../../../types";
import { useSelector } from "react-redux";

const test = ["heart", "star", "lightning", "bubble"];

export function Shapes() {
  const photoCanvas = useSelector(
    (state: ReducersType) => state.photoEditorReducer.photoCanvas
  );

  const shapeChange = (shape: string) => {
    if (photoCanvas === null) return;

    const objects = photoCanvas.getObjects();

    fabric.Image.fromURL(`/diary/frame/${shape}.png`, (frameImg: ImageType) => {
      frameImg.objectType = "frame";
      frameImg.crossOrigin = "Anonymous";
      frameImg.selectable = true;
      frameImg.globalCompositeOperation = "destination-atop";

      photoCanvas.add(frameImg);
      photoCanvas.remove(objects[1]);
      photoCanvas.renderAll();
    });
  };

  return (
    <PhotoOption1>
      {test.map((value: string, key: number) => {
        return (
          <OptionComponent
            key={`cutter_${key}`}
            onClick={() => {
              shapeChange(value);
            }}
          >
            {value}
          </OptionComponent>
        );
      })}
    </PhotoOption1>
  );
}
