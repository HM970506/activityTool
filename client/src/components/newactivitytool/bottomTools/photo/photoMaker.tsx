import { fabric } from "fabric-with-erasing";
import { DEFAULT_X, ImageType, canvasType } from "../../types";

export const imageMake = (
  photo: string,
  canvas: canvasType,
  setPhoto: React.Dispatch<React.SetStateAction<string>>
) => {
  new fabric.Image.fromURL(photo, (img: ImageType) => {
    img.hoverCursor = "auto";
    img.erasable = false;
    img.selectable = true;

    if (img.width !== undefined) {
      const scale = DEFAULT_X / img.width;
      img.scaleX = scale;
      img.scaleY = scale;
    }

    canvas.add(img);
    canvas.setActiveObject(img);
  });
  setPhoto("");
};
