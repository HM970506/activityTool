import { fabric } from "fabric-with-erasing";
import { deleteProps } from "../common/deleteButton/deleteButton";
import { canvasType } from "../types";

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

  fabric.util.getPosition = function (viewportTransform: any, p: any) {
    return {
      x: p.x * viewportTransform[0] + viewportTransform[4],
      y: p.y * viewportTransform[0] + viewportTransform[5],
    };
  };

  fabric.Point.prototype.angleBetween = function (that: any) {
    return Math.atan2(this.x - that.x, this.y - that.y);
  };

  fabric.Point.prototype.normalize = function (thickness: any) {
    if (null === thickness || undefined === thickness) {
      thickness = 1;
    }

    const length = this.distanceFrom({ x: 0, y: 0 });

    if (length > 0) {
      this.x = (this.x / length) * thickness;
      this.y = (this.y / length) * thickness;
    }

    return this;
  };

  fabric.BaseBrush.prototype.convertToImg = function () {
    const pixelRatio = this.canvas.getRetinaScaling(),
      c = fabric.util.copyCanvasElement(this.canvas.upperCanvasEl),
      xy = fabric.util.trimCanvas(c),
      img = new fabric.Image(c);

    img
      .set({
        left:
          (xy.x / pixelRatio - this.canvas.viewportTransform[4]) /
          this.canvas.viewportTransform[0],
        top:
          (xy.y / pixelRatio - this.canvas.viewportTransform[5]) /
          this.canvas.viewportTransform[0],
        scaleX: 1 / pixelRatio / this.canvas.viewportTransform[0],
        scaleY: 1 / pixelRatio / this.canvas.viewportTransform[0],
      })
      .setCoords();
    this.canvas.add(img).clearContext(this.canvas.contextTop);
    this.canvas.clearContext(this.canvas.contextTop);
  };

  fabric.util.trimCanvas = function (canvas: canvasType) {
    const X: number[] = [];
    const Y: number[] = [];
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let w = canvas.width;
    let h = canvas.height;
    const pix = { x: X, y: Y };
    let n;
    const imageData = ctx.getImageData(0, 0, w, h),
      fn = function (a: number, b: number) {
        return a - b;
      };

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (imageData.data[(y * w + x) * 4 + 3] > 0) {
          pix.x.push(x);
          pix.y.push(y);
        }
      }
    }
    pix.x.sort(fn);
    pix.y.sort(fn);
    n = pix.x.length - 1;

    w = pix.x[n] - pix.x[0];
    h = pix.y[n] - pix.y[0];
    const cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);

    canvas.width = w;
    canvas.height = h;
    ctx.putImageData(cut, 0, 0);

    return { x: pix.x[0], y: pix.y[0] };
  };
}
