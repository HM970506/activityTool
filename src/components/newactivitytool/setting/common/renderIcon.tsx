import { fabric } from "fabric-with-erasing";

export default function renderIcon(
  ctx: any,
  left: number,
  top: number,
  fabricObject: any
) {
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.restore();
}
