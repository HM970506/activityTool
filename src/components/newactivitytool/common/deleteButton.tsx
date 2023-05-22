import { Transform } from "fabric/fabric-impl";

const deleteIcon = "./diary/object/deleteButton.png";
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
  const img = document.createElement("img");
  img.src = deleteIcon;
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
};

export const deleteProps = {
  x: -0.4,
  y: -0.4,
  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 30,
};
