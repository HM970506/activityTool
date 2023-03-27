import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "fabric-history";

export default function CanvasHistory() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  return (
    <>
      <button
        onClick={() => {
          canvas.undo();
        }}
      >
        undo
      </button>
      <button
        onClick={() => {
          canvas.redo();
        }}
      >
        redo
      </button>
    </>
  );
}
