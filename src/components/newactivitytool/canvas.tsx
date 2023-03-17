import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../store/common/nodeSlice";

const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  const deleteObject = (eventData: any, transform: any) => {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  };
  var img = document.createElement("img");
  img.src = deleteIcon;

  const renderIcon = (
    ctx: any,
    left: any,
    top: any,
    styleOverride: any,
    fabricObject: any
  ) => {
    const size = 30;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
  const deleteProps = {
    x: 0.55,
    y: -0.55,

    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 30,
  };
  useEffect(() => {
    dispatch(
      nodeActions.setCanvas(
        new fabric.Canvas("canvas", {
          height: window.innerWidth,
          width: window.innerWidth,
          backgroundColor: "rgba(0,0,0,0)",
          preserveObjectStacking: true,
        })
      )
    );
  }, []);
  fabric.Object.prototype.cornerColor = "black";
  fabric.Object.prototype.cornerStrokeColor = "black";

  //삭제용 컨트롤 버튼을 추가할 수 있음.
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
  });
  //텍스트에도 추가
  fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
    y: -1,
  });

  return <canvas id="canvas" ref={canvasRef} />;
}
