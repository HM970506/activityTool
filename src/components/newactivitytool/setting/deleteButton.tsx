import { fabric } from "fabric-with-erasing";

const deleteIcon = "./deleteButton.svg";
const deleteObject = (e: MouseEvent, transform: any) => {
  console.log(e);
  const target = transform.target;
  const canvas = target.canvas;
  canvas.remove(target);
  canvas.renderAll();
};

const renderIcon = (ctx: any, left: number, top: number, fabricObject: any) => {
  const size = 30;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  const img = document.createElement("img");
  img.src = deleteIcon;
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
};

export const deleteProps = {
  x: 0.55,
  y: -0.55,

  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 30,
};
