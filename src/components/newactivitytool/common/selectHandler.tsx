import { canvasType, panObjectType } from "../types";

export const unselectable = (canvas: canvasType) => {
  //console.log("언셀렉트");
  canvas.selectable = false;
  canvas.forEachObject((object: panObjectType) => {
    if (object.prevSelectable !== undefined) return;
    object.prevEvented = object.evented;
    object.prevSelectable = object.selectable;
    object.evented = false;
    object.selectable = false;
  });
};

export const selectable = (canvas: canvasType) => {
  //console.log("셀렉트");
  canvas.selectable = true;
  canvas.forEachObject((object: panObjectType) => {
    object.evented =
      object.prevEvented !== undefined ? object.prevEvented : object.evented;
    object.selectable =
      object.prevSelectable !== undefined
        ? object.prevSelectable
        : object.selectable;
    object.prevEvented = undefined;
    object.prevSelectable = undefined;
  });
};
