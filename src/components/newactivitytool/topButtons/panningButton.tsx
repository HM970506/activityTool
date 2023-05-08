import { Label, Slider, Toggle } from "../styles/zoomButtonStyle";
import { useEffect } from "react";
import { canvasType, panObjectType } from "../types";
import { selectable, unselectable } from "../common/selectHandler";

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

    unselectable(canvas);

    setDraw(false);
    canvas.panning = 1;
    canvas.discardActiveObject().renderAll();
  };
  const panOff = () => {
    canvas.defaultCursor = "default";

    selectable(canvas);

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
