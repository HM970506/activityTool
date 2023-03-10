import { Line } from "react-konva";

export default function Eraser({ shapeProps }: { shapeProps: any }) {
  return (
    <Line
      tension={0.5}
      lineCap="round"
      globalCompositeOperation="destination-out"
      {...shapeProps}
    />
  );
}
