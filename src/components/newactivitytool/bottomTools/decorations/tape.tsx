import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ReducersType } from "../../types";

export default function Tape() {
  const { isPanning, isDrawing, canvas } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );
  const tape = useSelector(
    (state: ReducersType) => state.categoryReducer.subcategory.tape
  );

  useEffect(() => {
    if (canvas) {
      if (!isPanning && !isDrawing) canvas.taping = 1;
      else canvas.taping = 0;
    }
  }, [isDrawing, isPanning]);

  return (
    <>
      투명도
      <input
        type="range"
        min="0"
        max="100"
        defaultValue={(tape.opacity * 100).toString()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          canvas.tapeState = {
            ...canvas.tapeState,
            opacity:
              e.target.value === "0" ? 0 : parseInt(e.target.value) / 100,
          };
        }}
      />
      크기
      <button
        onClick={() =>
          (canvas.tapeState = {
            ...canvas.tapeState,
            size: 30,
          })
        }
      >
        30
      </button>
      <button
        onClick={() =>
          (canvas.tapeState = {
            ...canvas.tapeState,
            size: 20,
          })
        }
      >
        20
      </button>
      <button
        onClick={() =>
          (canvas.tapeState = {
            ...canvas.tapeState,
            size: 10,
          })
        }
      >
        10
      </button>
    </>
  );
}
