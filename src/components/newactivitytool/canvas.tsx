import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../store/common/nodeSlice";
import { deleteProps } from "./setting/deleteButton";
import { useEffect, useRef, useState } from "react";
import { Background, CanvasBackground, Textarea } from "./style";
import { historyActions } from "../../store/common/historySlice";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resize = (e: any) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  //오브젝트 기본세팅

  fabric.Object.prototype.cornerColor = "black";
  fabric.Object.prototype.editingBorderColor = "black";
  fabric.Object.prototype.erasable = false;
  fabric.Object.prototype.selectable = false;
  fabric.Object.prototype.hasBorders = false;

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
  });

  fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
    y: -1,
  });

  //오브젝트 기본세팅 끝

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: "white",
      preserveObjectStacking: true,
      freeDrawingCursor: `none`,
      hoverCursor: "default",
    });
    dispatch(nodeActions.setCanvas(canvas));
    dispatch(nodeActions.setTextarea(textAreaRef));
  }, []);

  //받은 코드 시작--------------------------------------------------------
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   let script = document.querySelector(`script[src="./fabric.min.js"]`);

  //   if (!script) {
  //     const test = document.createElement("script");
  //     test.src = "/fabric.min.js";
  //     test.async = true;
  //     document.body.appendChild(test);
  //     const handleLoad = () => setLoading(false);
  //     test.addEventListener("load", handleLoad);
  //     return () => {
  //       test.removeEventListener("load", handleLoad);
  //     };
  //   } else {
  //     const handleLoad = () => setLoading(false);
  //     script.addEventListener("load", handleLoad);
  //     return () => {
  //       script?.removeEventListener("load", handleLoad);
  //     };
  //   }
  // }, []);

  // useEffect(() => {
  //   if (loading) return;
  //   dispatch(
  //     nodeActions.setCanvas(
  //       new fabric.Canvas(canvasRef.current, {
  //         height: window.innerWidth,
  //         width: window.innerWidth,
  //         preserveObjectStacking: true,
  //       })
  //     )
  //   );
  // }, [loading]);
  //받은 코드 끝-----------------------------------------------------

  return (
    <CanvasBackground>
      <canvas ref={canvasRef}></canvas>
      <Textarea
        ref={textAreaRef}
        defaultValue={"텍스트를 입력하세요"}
        onChange={resize}
      />
    </CanvasBackground>
  );
}
