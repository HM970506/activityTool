import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "fabric-history";
import { DefaultButton } from "../../style";

export default function CanvasHistory() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  return (
    <>
      <DefaultButton
        onClick={() => {
          canvas.undo();
        }}
      >
        undo
      </DefaultButton>
      <DefaultButton
        onClick={() => {
          canvas.redo();
        }}
      >
        redo
      </DefaultButton>
    </>
  );
}
