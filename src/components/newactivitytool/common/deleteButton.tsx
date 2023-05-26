import { Transform } from "fabric/fabric-impl";
import deleteIcon from "./deleteButton.png";

const deleteObject = (e: MouseEvent, transform: Transform) => {
  const target = transform.target;
  const canvas = target.canvas;
  if (canvas !== undefined) {
    canvas.remove(target);
    canvas.renderAll();
  }
};

const renderIcon = (
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number
) => {
  const size = 48;
  ctx.save();
  ctx.translate(left, top);
  const img = new Image();
  img.src = deleteIcon;
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  //console.log(ctx);
  ctx.restore();
};

export const deleteProps = {
  x: -0.5,
  y: -0.5,
  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 30,
};
