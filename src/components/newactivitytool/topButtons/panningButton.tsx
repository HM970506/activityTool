import { Label, Slider, Toggle } from "../styles/zoomButtonStyle";
import { useEffect } from "react";
import { canvasType } from "../types";

export default function PanningToggle({
  canvas,
  isPanning,
  setPan,
  setDraw,
}: {
  canvas: canvasType;
  isPanning: boolean;
  setPan: Function;
  setDraw: Function;
}) {
  useEffect(() => {
    if (canvas) {
      if (isPanning) panOn();
      else panOff();
    }
  }, [isPanning]);

  const panHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPan(e.target.checked);
  };

  const panOn = () => {
    canvas.defaultCursor = "move";

    canvas.forEachObject((object: any) => {
      console.log(typeof object);
      object.prevEvented = object.evented;
      object.prevSelectable = object.selectable;
      object.evented = false;
      object.selectable = false;
    });

    canvas.selectable = false;

    setDraw(false);
    canvas.panning = 1;
    canvas.discardActiveObject().renderAll();
  };
  const panOff = () => {
    canvas.defaultCursor = "default";

    canvas.forEachObject((object: any) => {
      console.log("objecttype", object);
      object.evented =
        object.prevEvented !== undefined ? object.prevEvented : object.evented;
      object.selectable =
        object.prevSelectable !== undefined
          ? object.prevSelectable
          : object.selectable;
    });

    canvas.selectable = true;
    canvas.panning = 0;
    if (isPanning) setPan(false);
  };

  return (
    <span>
      <span>화면이동</span>
      <Label>
        <Toggle type="checkbox" checked={isPanning} onChange={panHandler} />
        <Slider />
      </Label>
    </span>
  );
}
