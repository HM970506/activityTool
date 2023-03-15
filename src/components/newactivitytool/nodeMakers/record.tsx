export default function RecordMaker({ shapeProps }: { shapeProps: any }) {
  let x = shapeProps.x - 5;
  let y = shapeProps.y - 10;
  return <audio src={shapeProps.audioSrc} controls={true} />;
}
