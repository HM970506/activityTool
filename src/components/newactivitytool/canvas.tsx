import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../store/common/nodeSlice";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const init = () => {
    new fabric.Canvas("canvas", {
      height: window.innerWidth,
      width: window.innerWidth,
      backgroundColor: "rgba(0,0,0,0)",
    });
  };
  useEffect(() => {
    console.log(init());
    dispatch(nodeActions.setCanvas(init()));
  }, []);

  return <canvas id="canvas" ref={canvasRef} />;
}
