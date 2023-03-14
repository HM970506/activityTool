import { Line } from "react-konva";
import { useImage } from "react-konva-utils";

export default function Brush({ shapeProps }: { shapeProps: any }) {
  const [image] = useImage(
    "https://i.pinimg.com/564x/1a/a4/62/1aa46267d00383e62cb2b710db2093a1.jpg"
  );

  console.log(JSON.stringify(shapeProps));
  return (
    <Line
      tension={0.1}
      lineCap="round"
      globalCompositeOperation="source-over"
      strokeWidth={shapeProps.strokeWidth}
      points={shapeProps.points}
      stroke={shapeProps.stroke}
      shadowForStrokeEnabled={false}
      fillAfterStrokeEnabled={true}
      fillPatternImage={image}
      fillPatternOffset={{ x: 0, y: 0 }}
      opacity={1}
    />
  );
}
