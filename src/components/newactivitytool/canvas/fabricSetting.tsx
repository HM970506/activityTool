import { fabric } from "fabric-with-erasing";
import { deleteProps } from "../common/deleteButton";

export default function fabricSetting() {
  fabric.Object.prototype.set({
    cornerColor: "black",
    selectionBorderColor: "black",
    erasable: true,
    hoverCursor: "default",
    selectable: false,
    hasBorders: false,
    isTouchSupported: true,
  });

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
  });

  fabric.Textbox.prototype.set({
    cornerColor: "#4895FF",
    selectionBorderColor: "#4895FF",
  });
  fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
  });

  fabric.util.getRandom = function (max: number, min: number) {
    min = min ? min : 0;
    return Math.random() * ((max ? max : 1) - min) + min;
  };

  fabric.util.clamp = function (n: number, max: number, min: number) {
    if (typeof min !== "number") min = 0;
    return n > max ? max : n < min ? min : n;
  };

  fabric.util.getPosition = function (vptCoords: any, p: any) {
    return {
      x: p.x - vptCoords.tl.x,
      y: p.y - vptCoords.tl.y,
    };
  };

  fabric.Point.prototype.angleBetween = function (that: any) {
    return Math.atan2(this.x - that.x, this.y - that.y);
  };

  fabric.Point.prototype.normalize = function (thickness: any) {
    if (null === thickness || undefined === thickness) {
      thickness = 1;
    }

    var length = this.distanceFrom({ x: 0, y: 0 });

    if (length > 0) {
      this.x = (this.x / length) * thickness;
      this.y = (this.y / length) * thickness;
    }

    return this;
  };
}
