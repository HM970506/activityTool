import { Line } from "react-konva";
import { BRUSH, ERASER, PEN } from "./types";

export default function ToolsMaker({
  type,
  shapeProps,
}: {
  type: string;
  shapeProps: any;
}) {
  switch (type) {
    case PEN:
      return (
        <Line
          tension={0.1}
          {...shapeProps}
          fill={"none"}
          lineCap="round"
          globalCompositeOperation="source-over"
        />
      );
    case BRUSH:
      return (
        <Line
          tension={0.1}
          lineCap="round"
          globalCompositeOperation="source-over"
          {...shapeProps}
        />
      );
    case ERASER:
      return (
        <Line
          tension={0.5}
          lineCap="round"
          globalCompositeOperation="destination-out"
          {...shapeProps}
        />
      );
  }
  return <></>;
}
