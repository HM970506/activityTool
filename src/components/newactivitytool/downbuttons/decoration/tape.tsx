import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ReducersType } from "../../types";
import { selectable, unselectable } from "../../common/selectHandler";
import { DecoOptionContainer } from "./style";

export default function Tape() {
  const { isPanning, isDrawing, canvas } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );
  const tape = useSelector(
    (state: ReducersType) => state.categoryReducer.subcategory.tape
  );

  useEffect(() => {
    if (canvas) {
      if (!isPanning && !isDrawing && tape.state) {
        unselectable(canvas);
        canvas.tape.state = 1;
      }
    } else {
      selectable(canvas);
      canvas.tape.state = 0;
    }
  }, [isDrawing, isPanning, tape.state]);

  return (
    <DecoOptionContainer>
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
    </DecoOptionContainer>
  );
}
