import { fabric } from "fabric-with-erasing";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";

const modifyIcon = "./modifyButton.svg";

const renderIcon = (ctx: any, left: number, top: number, fabricObject: any) => {
  const size = 30;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  const img = document.createElement("img");
  img.src = modifyIcon;
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
};

export const modifyProps = {
  x: 0.6,
  y: -0.55,

  cursorStyle: "pointer",

  render: renderIcon,
  cornerSize: 30,
};
