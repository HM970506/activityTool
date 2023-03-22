import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../store/common/nodeSlice";
import { deleteProps } from "./setting/deleteButton";
import { useEffect, useRef, useState } from "react";

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
    //id대신 canvasRef.current가 들어가도 되는군요
    const test = new fabric.Canvas("canvas", {
      height: window.innerWidth,
      width: window.innerWidth,
      preserveObjectStacking: true,
    });

    dispatch(nodeActions.setCanvas(test));

    const btn = document.createElement("div");
    btn.innerText = "test";
    btn.style.width = 100 + "px";
    btn.style.height = 100 + "px";

    const positionBtn = (left: number, top: number) => {
      btn.style.left = left + "px";
      btn.style.top = top + "px";
    };

    fabric.Image.fromURL("./pencil.png", (img: any) => {
      img.on("moving", (e: any) => {
        positionBtn(e.target.left, e.target.top);
      });
      img.on("scaling", (e: any) => {
        positionBtn(e.target.left, e.target.top);
      });
      console.log(img);
      test.add(img.set({ left: 250, top: 250, angle: 30 }).scale(0.25));
      test.renderAll();
    });
  }, []);

  //받은 코드 시작
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let script = document.querySelector(`script[src="./fabric.min.js"]`);

    if (!script) {
      const test = document.createElement("script");
      test.src = "/fabric.min.js";
      test.async = true;
      document.body.appendChild(test);
      const handleLoad = () => setLoading(false);
      test.addEventListener("load", handleLoad);
      return () => {
        test.removeEventListener("load", handleLoad);
      };
    } else {
      const handleLoad = () => setLoading(false);
      script.addEventListener("load", handleLoad);
      return () => {
        script?.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  useEffect(() => {
    if (loading) return;
    dispatch(
      nodeActions.setCanvas(
        new fabric.Canvas(canvasRef.current, {
          height: window.innerWidth,
          width: window.innerWidth,
          preserveObjectStacking: true,
        })
      )
    );
  }, [loading]);
  //받은 코드 끝

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}