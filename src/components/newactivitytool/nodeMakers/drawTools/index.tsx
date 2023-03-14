import { Line, Rect } from "react-konva";
import { useImage } from "react-konva-utils";
import { useSelector } from "react-redux";
import { BRUSH, ERASER, PEN } from "../../types";
import Brush from "./brush";
import Eraser from "./eraser";
import Pen from "./pen";

export default function DrawToolsMaker({
  type,
  shapeProps,
}: {
  type: string;
  shapeProps: any;
}) {
  //누른 곳에 이미지가 도장처럼 찍힌다.
  //꾹 누르고 있으면 0.5초 후 도장이 다시 찍힌다. (쓰로틀링)

  switch (type) {
    case PEN:
      return <Pen shapeProps={shapeProps} />;
    case BRUSH:
      return <Brush shapeProps={shapeProps} />;
    case "STAMP":
      return <Rect width={10} height={10} fill={"red"} />;
    case ERASER:
      return <Eraser shapeProps={shapeProps} />;
  }
  return <></>;
}
