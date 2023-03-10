import { Line } from "react-konva";
import { useImage } from "react-konva-utils";
import { BRUSH, ERASER, PEN } from "../types";

export default function DrawToolsMaker({
  type,
  shapeProps,
}: {
  type: string;
  shapeProps: any;
}) {
  const brushBackground = useImage("/patten");

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
          fillPatternImage={brushBackground}
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
