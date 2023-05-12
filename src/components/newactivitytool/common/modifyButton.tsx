import { Transform } from "fabric/fabric-impl";

const modifyIcon = "./diary/modifyButton.svg";
const modifyObject = (e: MouseEvent, transform: Transform) => {
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
  const size = 30;
  ctx.save();
  ctx.translate(left, top);
  const img = document.createElement("img");
  img.src = modifyIcon;
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
};

export const modifyProps = {
  x: 0,
  y: 0,
  cursorStyle: "pointer",
  mouseUpHandler: modifyObject,
  render: renderIcon,
  cornerSize: 30,
};
