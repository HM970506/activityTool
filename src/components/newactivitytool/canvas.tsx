import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../store/common/nodeSlice";
import { deleteProps } from "./setting/deleteButton";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  //오브젝트 기본세팅
  fabric.Object.prototype.cornerColor = "black";
  fabric.Object.prototype.editingBorderColor = "black";
  fabric.Object.prototype.erasable = false;
  fabric.Object.prototype.selectable = false;

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
  });

  fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
    y: -1,
  });
  //오브젝트 기본세팅 끝

  useEffect(() => {
    dispatch(
      nodeActions.setCanvas(
        new fabric.Canvas("canvas", {
          height: window.innerWidth,
          width: window.innerWidth,
          preserveObjectStacking: true,
        })
      )
    );
  }, []);

  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  return (
    <>
      <canvas id="canvas" ref={canvasRef}></canvas>
    </>
  );
}
