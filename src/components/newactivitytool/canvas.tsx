import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../store/common/nodeSlice";
import { deleteProps } from "./setting/deleteButton";
import { useEffect, useRef, useState } from "react";
import style from "styled-components";

const Textarea = style.textarea`
 position:absolute;
 display:none;
 top:0;
 left:0;
 padding:5px;
`;

const Background = style.div`
  position:relative;
  height: window.innerHeight,
  width: window.innerWidth,
  backgroundColor: black,
`;

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
        new fabric.Canvas(canvasRef.current, {
          height: window.innerHeight,
          width: window.innerWidth,
          backgroundColor: "white",
          preserveObjectStacking: true,
        })
      )
    );

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
    <Background>
      <canvas ref={canvasRef}></canvas>
      <Textarea ref={textAreaRef} />
    </Background>
  );
}
