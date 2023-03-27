import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ZoomButton() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const [delta, setDelta] = useState<number>(1);

  useEffect(() => {
    if (canvas) setDelta(canvas.getZoom());
  }, [canvas]);

  useEffect(() => {
    if (canvas) canvas.setZoom(delta);
  }, [delta]);

  return (
    <>
      <button
        onClick={() => {
          setDelta((x: number) => {
            return Math.round((x + 0.1) * 100) / 100;
          });
        }}
      >
        확대
      </button>
      {delta}
      <button
        onClick={() => {
          setDelta((x: number) => {
            return Math.round((x - 0.1) * 100) / 100;
          });
        }}
      >
        축소
      </button>
      <button
        onClick={() => {
          setDelta(1);
        }}
      >
        원래대로
      </button>
    </>
  );
}
