import { fabric } from "fabric-with-erasing";

export default function renderIcon(
  ctx: any,
  left: number,
  top: number,
  fabricObject: any
) {
  const size = 30;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  //   const img = document.createElement("img");
  //   img.src = Icon;
  //   ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
}
